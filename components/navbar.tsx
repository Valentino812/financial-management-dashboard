'use client'

import Link from 'next/link'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import { LogOut, LayoutDashboard, TableProperties, LineChart } from 'lucide-react'

export default function Navbar() {
  const router = useRouter()
  const supabase = createClient()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.replace('/login?message=Logout Successfull')
    router.refresh()
  }

  return (
    <nav className="w-full bg-indigo-900 text-white border-b border-indigo-800 sticky top-0 z-50 shadow-md">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-3">
            <div className="bg-white/10 backdrop-blur-sm p-2 rounded-lg border border-white/10">
               <LayoutDashboard className="w-5 h-5 text-indigo-300" />
            </div>
            <span className="text-xl font-bold tracking-tight">
              Financial Dashboard
            </span>
          </div>

          {/* Main Menu */}
          <div className="hidden md:flex space-x-8">
            {/* <Link 
              href="/statistics" 
              className="text-indigo-200 hover:text-white hover:bg-white/10 px-3 py-2 rounded-md font-medium transition-all duration-200 flex items-center gap-2"
            >
              <LineChart className="w-4 h-4" />
              Statistics
            </Link> */}
            
            <Link 
              href="/table" 
              className="text-indigo-200 hover:text-white hover:bg-white/10 px-3 py-2 rounded-md font-medium transition-all duration-200 flex items-center gap-2"
            >
              <TableProperties className="w-4 h-4" />
              Table
            </Link>
          </div>

          {/* Tombol Logout */}
          <div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white px-5 py-2 rounded-full font-medium transition-all shadow-lg shadow-red-900/20 hover:shadow-red-600/40 active:scale-95 text-sm"
            >
              <LogOut className="w-4 h-4" />
              <span>Log Out</span>
            </button>
          </div>

        </div>
      </div>
    </nav>
  )
}