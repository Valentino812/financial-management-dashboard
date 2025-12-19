'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'

export async function forgotPassword(formData: FormData) {
  const supabase = await createClient()
  
  // Origin URL
  const origin = (await headers()).get('origin')
  
  const email = formData.get('email') as string

  // Email Validation
  if (!email) {
    return redirect('/forgot-password?error=Email must be filled')
  }

  // Sending reset password email via Superbase
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?next=/reset-password`,
  })

  if (error) {
    console.error(error)
    return redirect(`/forgot-password?error=${encodeURIComponent(error.message)}`)
  }

  return redirect('/login?message=Reset password link has been sent. Please check your email.')
}