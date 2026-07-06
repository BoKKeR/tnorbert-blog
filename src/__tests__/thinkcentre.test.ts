import { describe, it, expect } from 'vitest'
import {
  PCIE_NETWORKING,
  PCIE_STORAGE,
  PCIE_GPUS,
  BUILDS,
  PRINTS,
} from '../app/(frontend)/thinkcentre/data'

describe('PCIE_NETWORKING', () => {
  it('has at least 4 entries', () => {
    expect(PCIE_NETWORKING.length).toBeGreaterThanOrEqual(4)
  })

  it('every entry has non-empty name, tag, note', () => {
    for (const c of PCIE_NETWORKING) {
      expect(c.name.length).toBeGreaterThan(0)
      expect(c.tag.length).toBeGreaterThan(0)
      expect(c.note.length).toBeGreaterThan(0)
    }
  })
})

describe('PCIE_STORAGE', () => {
  it('every entry has non-empty name, tag, note', () => {
    for (const c of PCIE_STORAGE) {
      expect(c.name.length).toBeGreaterThan(0)
      expect(c.tag.length).toBeGreaterThan(0)
      expect(c.note.length).toBeGreaterThan(0)
    }
  })
})

describe('PCIE_GPUS', () => {
  it('every entry has non-empty name, tag, note', () => {
    for (const c of PCIE_GPUS) {
      expect(c.name.length).toBeGreaterThan(0)
      expect(c.tag.length).toBeGreaterThan(0)
      expect(c.note.length).toBeGreaterThan(0)
    }
  })
})

describe('BUILDS', () => {
  it('has at least 4 entries', () => {
    expect(BUILDS.length).toBeGreaterThanOrEqual(4)
  })

  it('every entry has non-empty title, tag, description, href', () => {
    for (const b of BUILDS) {
      expect(b.title.length).toBeGreaterThan(0)
      expect(b.tag.length).toBeGreaterThan(0)
      expect(b.description.length).toBeGreaterThan(0)
      expect(b.href.length).toBeGreaterThan(0)
    }
  })

  it('every href is a valid https URL', () => {
    for (const b of BUILDS) {
      expect(() => new URL(b.href)).not.toThrow()
      expect(new URL(b.href).protocol).toBe('https:')
    }
  })
})

describe('PRINTS', () => {
  it('every entry has non-empty name, description, href', () => {
    for (const p of PRINTS) {
      expect(p.name.length).toBeGreaterThan(0)
      expect(p.description.length).toBeGreaterThan(0)
      expect(p.href.length).toBeGreaterThan(0)
    }
  })

  it('every href is a valid https URL', () => {
    for (const p of PRINTS) {
      expect(() => new URL(p.href)).not.toThrow()
      expect(new URL(p.href).protocol).toBe('https:')
    }
  })
})
