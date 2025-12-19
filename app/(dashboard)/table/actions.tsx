'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

// Adding transaction (CREATE)
export async function addTransaction(formData: FormData) {
  const supabase = await createClient()

  const product_name = formData.get('product_name') as string
  const price = Number(formData.get('price'))
  const quantity = Number(formData.get('quantity'))

  const { error } = await supabase
    .from('transactions')
    .insert({ product_name, price, quantity })

  if (error) console.error(error)

  revalidatePath('/table') 
}

// Deleting Transaction (DELETE)
export async function deleteTransaction(id: string) {
  const supabase = await createClient()

  const { error } = await supabase
    .from('transactions')
    .delete()
    .eq('id', id)

  if (error) console.error(error)

  revalidatePath('/table') 
}

// Editing Transaction (UPDATE)
export async function updateTransaction(formData: FormData) {
  const supabase = await createClient()

  const id = formData.get('id') as string
  const product_name = formData.get('product_name') as string
  const price = Number(formData.get('price'))
  const quantity = Number(formData.get('quantity'))

  const { error } = await supabase
    .from('transactions')
    .update({ product_name, price, quantity }) 
    .eq('id', id) 

  if (error) console.error('Error updating:', error)

  revalidatePath('/table')
}