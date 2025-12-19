'use client'

import { Toaster } from 'react-hot-toast'

export default function Toast() {
  return (
    <Toaster 
      position="top-right" 
      reverseOrder={false}
      toastOptions={{
        style: {
          background: '#333',
          color: '#fff',
          borderRadius: '10px',
        },
      }}
    />
  )
}