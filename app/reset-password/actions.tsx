'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export async function resetPassword(formData: FormData) {
  const supabase = await createClient()

  const password = formData.get('password') as string
  const confirmPassword = formData.get('confirmPassword') as string

  // 1. Validasi Backend (Double Check)
  if (password !== confirmPassword) {
    return redirect('/reset-password?error=Passwords do not match')
  }

  // 2. Update Password 
  // (Hanya berhasil jika user punya Sesi Login yang valid dari Route Callback tadi)
  const { error } = await supabase.auth.updateUser({
    password: password
  })

  if (error) {
    return redirect(`/reset-password?error=${encodeURIComponent(error.message)}`)
  }

  // 3. Sukses -> Redirect ke Dashboard
  return redirect('/table?message=Password updated successfully!')
}