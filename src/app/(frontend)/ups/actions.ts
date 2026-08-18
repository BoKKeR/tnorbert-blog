'use server'

import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function signUpForUpsUpdates(
  _prevState: { error?: string; success?: boolean },
  formData: FormData,
): Promise<{ error?: string; success?: boolean }> {
  const email = formData.get('email')

  if (!email || typeof email !== 'string' || !email.includes('@')) {
    return { error: 'Please enter a valid email address.' }
  }

  try {
    const payload = await getPayload({ config: configPromise })
    await payload.create({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      collection: 'ups-signups' as any,
      data: { email: email.toLowerCase().trim() },
    })
    return { success: true }
  } catch (err: unknown) {
    if (err instanceof Error && err.message.includes('duplicate')) {
      return { error: 'This email is already signed up.' }
    }
    const msg = err instanceof Error ? err.message : ''
    if (msg.toLowerCase().includes('duplicate') || msg.toLowerCase().includes('unique')) {
      return { error: 'This email is already signed up.' }
    }
    return { error: 'Something went wrong. Please try again.' }
  }
}
