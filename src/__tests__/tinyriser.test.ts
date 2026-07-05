import { describe, it, expect } from 'vitest'
import { USE_CASES, ASSEMBLY_STEPS, UPGRADES } from '../app/(frontend)/tinyriser/data'

describe('USE_CASES', () => {
  it('has at least 4 entries', () => {
    expect(USE_CASES.length).toBeGreaterThanOrEqual(4)
  })

  it('every entry has non-empty title, tag, and description', () => {
    for (const uc of USE_CASES) {
      expect(uc.title.length).toBeGreaterThan(0)
      expect(uc.tag.length).toBeGreaterThan(0)
      expect(uc.description.length).toBeGreaterThan(0)
    }
  })
})

describe('ASSEMBLY_STEPS', () => {
  it('steps are numbered sequentially from "1"', () => {
    ASSEMBLY_STEPS.forEach((s, i) => {
      expect(s.step).toBe(String(i + 1))
    })
  })

  it('every entry has non-empty label and detail', () => {
    for (const s of ASSEMBLY_STEPS) {
      expect(s.label.length).toBeGreaterThan(0)
      expect(s.detail.length).toBeGreaterThan(0)
    }
  })
})

describe('UPGRADES', () => {
  it('every entry has non-empty label, slot, and note', () => {
    for (const u of UPGRADES) {
      expect(u.label.length).toBeGreaterThan(0)
      expect(u.slot.length).toBeGreaterThan(0)
      expect(u.note.length).toBeGreaterThan(0)
    }
  })
})
