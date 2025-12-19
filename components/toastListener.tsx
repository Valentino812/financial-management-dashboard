'use client' 

import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { useEffect } from 'react'
import toast from 'react-hot-toast'

export default function TableToastListener() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const error = searchParams.get('error')
    const message = searchParams.get('message')

    if (error) {
      toast.error(error, {
        id: 'error-notif', 
        duration: 5000,
        style: {
          background: '#ef4444',
          color: '#fff',
        }
      })
      // Cleaning URL
      router.replace(pathname) 
    } 
    else if (message) {
      toast.success(message, {
        id: 'success-notif',
        duration: 4000,
        style: {
          background: '#10b981',
          color: '#fff',
          fontWeight: 'bold',
        },
      })
      // Cleaning URL
      router.replace(pathname)
    }
  }, [searchParams, router, pathname])

  return null
}