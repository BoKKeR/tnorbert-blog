import { describe, it, expect } from 'vitest'
import { TINYRISER_URL } from '../app/(frontend)/tinyriser/card/constants'

describe('TINYRISER_URL', () => {
  it('points to the tinyriser page', () => {
    expect(TINYRISER_URL).toBe('https://deployonfri.day/tinyriser')
  })

  it('is a valid https URL', () => {
    expect(() => new URL(TINYRISER_URL)).not.toThrow()
    expect(new URL(TINYRISER_URL).protocol).toBe('https:')
  })
})
