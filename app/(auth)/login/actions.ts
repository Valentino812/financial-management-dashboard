'use server' 

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
  const supabase = await createClient()

  // Email and password
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  // Authentication with superbase
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  // Error
  if (error) {
    return redirect(`/login?error=${encodeURIComponent(error.message)}`)
  }

  // Redirect to dashboard
  revalidatePath('/table', 'layout')
  redirect('/table?message=Login Successfull')
}