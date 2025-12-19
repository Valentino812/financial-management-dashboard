'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'

export async function signup(formData: FormData) {
  const supabase = await createClient()

  // Origin URL
  const origin = (await headers()).get('origin')

  // Email and password
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  // Password Validation

  if (password.length < 6) {
    return redirect('/register?error=Password must be at least 6 characters.')
  }

  if (!/[A-Z]/.test(password)) {
    return redirect('/register?error=Password must have at least one uppercase letter.')
  }

  if (!/[a-z]/.test(password)) {
    return redirect('/register?error=Password must have at least one lowercase letter')
  }

  if (!/[\W_]/.test(password)) {
    return redirect('/register?error=Password must have at least one symbol (Example: ! @ # $).')
  }

  // Sign Up With Superbase
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  })

  if (error) {
    return redirect(`/register?error=${encodeURIComponent(error.message)}`)
  }

  return redirect('/login?message=Account has been created successfully')
}