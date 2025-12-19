'use client'

import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { useEffect, useState } from 'react' 

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {

  // Setup State for entrance animation
  const [isVisible, setIsVisible] = useState(false)

  // Triggering entrance animation (For main content (Children))
  useEffect(() => {
      const timer = setTimeout(() => {
      setIsVisible(true)
      }, 100)

      return () => clearTimeout(timer)
  }, [])

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      
      {/* Navbar Component */}
      <Navbar />
      
      {/* Main Content */}
<main className="flex-grow w-full bg-white">
        <div 
          className={`
            max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8
            transition-all duration-300 ease-out transform
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
          `}
        >
          {children}
        </div>
      </main>

      {/* Footer Component */}
      <Footer />
      
    </div>
  )
}