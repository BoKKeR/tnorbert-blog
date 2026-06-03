'use client'

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { extractCaption, nextIndex, prevIndex } from './helpers'
import type { LightboxEntry, LightboxImage } from './helpers'

// ─── Context ─────────────────────────────────────────────────────────────────

type LightboxContextValue = {
  register: (image: LightboxImage) => { id: string; unregister: () => void }
  open: (id: string) => void
}

// Stable no-ops so useLightbox() is safe outside a provider (MediaBlock used
// on non-post pages gets click-to-open silently disabled).
const noopRegister = (): { id: string; unregister: () => void } => ({
  id: '',
  unregister: () => {},
})
const noopOpen = () => {}

const LightboxContext = createContext<LightboxContextValue>({
  register: noopRegister,
  open: noopOpen,
})

export function useLightbox(): LightboxContextValue {
  return useContext(LightboxContext)
}

// ─── Dialog ──────────────────────────────────────────────────────────────────

function LightboxDialog({
  entries,
  activeId,
  onClose,
  onPrev,
  onNext,
}: {
  entries: LightboxEntry[]
  activeId: string | null
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const currentIdx = entries.findIndex((e) => e.id === activeId)
  const current = currentIdx >= 0 ? entries[currentIdx] : null
  const total = entries.length

  // Sync dialog open/closed state with activeId
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (activeId !== null && !dialog.open) dialog.showModal()
    else if (activeId === null && dialog.open) dialog.close()
  }, [activeId])

  // Arrow key navigation
  useEffect(() => {
    if (activeId === null) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [activeId, onPrev, onNext])

  const caption = current ? extractCaption(current.image.caption) : ''

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      className="lightbox-dialog m-0 border-0 p-0 w-screen h-screen max-w-none max-h-none"
    >
      <div
        className="relative flex flex-col items-center justify-center w-full h-full bg-black/[.93]"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose()
        }}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close lightbox"
          className="absolute top-5 right-5 z-10 w-9 h-9 rounded-full bg-white/[.08] border border-white/[.12] flex items-center justify-center text-white/70 hover:bg-white/[.16] transition-colors"
        >
          ✕
        </button>

        {current && (
          <>
            {/* Image + side arrows */}
            <div className="relative flex items-center justify-center max-w-[90vw]">
              {total > 1 && (
                <button
                  type="button"
                  onClick={onPrev}
                  aria-label="Previous image"
                  className="absolute -left-14 w-11 h-11 rounded-full bg-white/[.08] border border-white/[.12] flex items-center justify-center text-white/70 hover:bg-white/[.16] transition-colors text-2xl"
                >
                  ‹
                </button>
              )}

              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={current.image.src}
                alt={current.image.alt}
                className="w-[90vw] h-[70vh] object-contain rounded-sm"
              />

              {total > 1 && (
                <button
                  type="button"
                  onClick={onNext}
                  aria-label="Next image"
                  className="absolute -right-14 w-11 h-11 rounded-full bg-white/[.08] border border-white/[.12] flex items-center justify-center text-white/70 hover:bg-white/[.16] transition-colors text-2xl"
                >
                  ›
                </button>
              )}
            </div>

            {/* Caption + counter */}
            <div className="mt-4 text-center max-w-[90vw]">
              {caption && (
                <p className="text-sm text-white/60 leading-relaxed mb-2">{caption}</p>
              )}
              {total > 1 && (
                <p className="text-xs text-white/30 tracking-wide">
                  {currentIdx + 1} / {total}
                </p>
              )}
            </div>

            {/* Keyboard hint */}
            {total > 1 && (
              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-4 text-xs text-white/25">
                <span>
                  <kbd className="bg-white/[.06] border border-white/10 px-1.5 py-0.5 rounded">
                    ←
                  </kbd>{' '}
                  <kbd className="bg-white/[.06] border border-white/10 px-1.5 py-0.5 rounded">
                    →
                  </kbd>{' '}
                  navigate
                </span>
                <span>
                  <kbd className="bg-white/[.06] border border-white/10 px-1.5 py-0.5 rounded">
                    Esc
                  </kbd>{' '}
                  close
                </span>
              </div>
            )}
          </>
        )}
      </div>
    </dialog>
  )
}

// ─── Provider ────────────────────────────────────────────────────────────────

export function LightboxProvider({ children }: { children: React.ReactNode }) {
  const [entries, setEntries] = useState<LightboxEntry[]>([])
  const entriesRef = useRef<LightboxEntry[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)

  // Keep ref in sync so stable prev/next callbacks can read latest entries
  useEffect(() => {
    entriesRef.current = entries
  }, [entries])

  const register = useCallback((image: LightboxImage) => {
    const id = crypto.randomUUID()
    setEntries((prev) => [...prev, { id, image }])
    return {
      id,
      unregister: () => {
        setEntries((prev) => prev.filter((e) => e.id !== id))
        setActiveId((prev) => (prev === id ? null : prev))
      },
    }
  }, [])

  const open = useCallback((id: string) => setActiveId(id), [])
  const close = useCallback(() => setActiveId(null), [])

  // Stable callbacks that read latest entries via ref, use functional setActiveId
  // to avoid stale closure on activeId.
  const prev = useCallback(() => {
    const current = entriesRef.current
    setActiveId((id) => {
      if (current.length === 0) return id
      const idx = current.findIndex((e) => e.id === id)
      return current[prevIndex(idx, current.length)].id
    })
  }, [])

  const next = useCallback(() => {
    const current = entriesRef.current
    setActiveId((id) => {
      if (current.length === 0) return id
      const idx = current.findIndex((e) => e.id === id)
      return current[nextIndex(idx, current.length)].id
    })
  }, [])

  return (
    <LightboxContext.Provider value={{ register, open }}>
      {children}
      <LightboxDialog
        entries={entries}
        activeId={activeId}
        onClose={close}
        onPrev={prev}
        onNext={next}
      />
    </LightboxContext.Provider>
  )
}
