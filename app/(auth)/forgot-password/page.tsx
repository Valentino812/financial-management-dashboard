'use client' 

import { forgotPassword } from './actions'
import { useEffect, useState, Suspense } from 'react' 
import ToastListener from '@/components/toastListener'
import Link from 'next/link'

export default function ForgotPasswordPage() {
    // Setup State for entrance animation
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        // Triggering fade-in entrance animation
        const timer = setTimeout(() => setIsVisible(true), 100)
        return () => clearTimeout(timer)
    }, [])

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 p-4 overflow-hidden relative">
            
            {/* Listener untuk Toast Notifikasi */}
            <Suspense fallback={null}>
                <ToastListener />
            </Suspense>

            {/* Background */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
                <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-[-20%] left-[20%] w-96 h-96 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
            </div>

            {/* Main Container */}
            <div 
                className={`
                    relative z-10 w-full max-w-md bg-gray-900/60 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/10 
                    transition-all duration-500 ease-out transform 
                    ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
                `}
            >
                
                {/* Header */}
                <div className="text-center mb-10">
                    <p className="text-xs font-bold tracking-[0.2em] text-indigo-300 uppercase mb-2">Account Recovery</p>
                    <h1 className="text-3xl font-extrabold text-white tracking-tight">RESET PASSWORD</h1>
                    <p className="text-gray-400 text-xs mt-3 px-4 leading-relaxed">
                        Enter the email address associated with your account and we will send you a link to reset your password.
                    </p>
                </div>

                {/* Form */}
                <form className="space-y-6">
                    <div>
                        <label className="sr-only">Email Address</label>
                        <input 
                            name="email" 
                            type="email" 
                            required 
                            placeholder="Enter your email address"
                            className="w-full px-6 py-3.5 rounded-full bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/50 transition-all shadow-inner" 
                        />
                    </div>

                    <button 
                        formAction={forgotPassword} 
                        className="w-full bg-indigo-600 text-white font-bold py-3.5 rounded-full hover:bg-indigo-500 transition-all duration-200 transform hover:scale-[1.02] shadow-lg shadow-indigo-500/50 uppercase tracking-wider text-sm"
                    >
                        Send Reset Link
                    </button>
                </form>

                {/* Footer */}
                <div className="mt-8 text-center text-xs text-gray-400">
                    <p className="mb-2">Remember your password?</p>
                    <Link 
                        href="/login" 
                        className="text-indigo-300 font-bold hover:text-white transition-colors border-b border-indigo-300/30 hover:border-white pb-0.5"
                    >
                        Back to Login
                    </Link>
                </div>

                {/* Copyright */}
                <div className="mt-8 text-center text-xs text-gray-600">
                    <p>© 2025 Mika Valentino</p>
                </div>
            </div>
        </div>
    )
}