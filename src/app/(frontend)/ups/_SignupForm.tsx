'use client'

import React, { useActionState } from 'react'
import { signUpForUpsUpdates } from './actions'

export function SignupForm() {
  const [state, action, pending] = useActionState(signUpForUpsUpdates, {})

  if (state.success) {
    return (
      <div className="border border-primary/40 bg-primary/[0.03] rounded-sm px-5 py-4">
        <p className="font-mono text-sm text-primary font-semibold">You're in.</p>
        <p className="font-mono text-xs text-muted-foreground mt-1">
          We'll reach out when there's something worth sharing.
        </p>
      </div>
    )
  }

  return (
    <form action={action} className="flex flex-col gap-3">
      <div className="flex gap-2">
        <input
          type="email"
          name="email"
          required
          placeholder="you@example.com"
          className="flex-1 font-mono text-sm px-3 py-2 rounded-sm border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
        />
        <button
          type="submit"
          disabled={pending}
          className="font-mono text-sm px-4 py-2 rounded-sm bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 shrink-0"
        >
          {pending ? '...' : 'Sign up →'}
        </button>
      </div>
      {state.error && (
        <p className="font-mono text-xs text-destructive">{state.error}</p>
      )}
      <p className="font-mono text-xs text-muted-foreground">
        Build updates only. No spam.
      </p>
    </form>
  )
}
