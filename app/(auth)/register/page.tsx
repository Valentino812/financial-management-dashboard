'use client' 

import { signup } from './actions'
import { useEffect, useState, Suspense } from 'react' 
import ToastListener from '@/components/toastListener'
import Link from 'next/link'

function RegisterForm() {
    // Animation state
    const [isVisible, setIsVisible] = useState(false)
    
    // Form state
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        // Trigger entrance animation
        const timer = setTimeout(() => setIsVisible(true), 100)
        return () => clearTimeout(timer)
    }, [])

    // Validate password requirements
    const checkPassword = (pass: string) => {
        const hasMinLength = pass.length >= 6
        const hasUpper = /[A-Z]/.test(pass)
        const hasLower = /[a-z]/.test(pass)
        const hasSymbol = /[\W_]/.test(pass)

        return hasMinLength && hasUpper && hasLower && hasSymbol
    }

    const isValid = checkPassword(password)

    // Dynamic text color helper
    const getTextColor = () => {
        if (password.length === 0) return 'text-gray-400' 
        if (isValid) return 'text-emerald-400'           
        return 'text-red-400'                            
    }

    return (
        <>
            {/* Toast listener for notifications */}
            <ToastListener/>

            {/* main card container */}
            <div className={`relative z-10 w-full max-w-md bg-gray-900/60 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/10 transition-all duration-500 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                
                {/* header section */}
                <div className="text-center mb-10">
                    <p className="text-xs font-bold tracking-[0.2em] text-indigo-300 uppercase mb-2">Join Us</p>
                    <h1 className="text-3xl font-extrabold text-white tracking-tight">REGISTER</h1>
                </div>

                {/* form section */}
                <form className="space-y-6">
                    <div>
                        <label className="sr-only">Email Address</label>
                        <input 
                            name="email" 
                            type="email" 
                            required 
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email Address"
                            className="w-full px-6 py-3.5 rounded-full bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/50 transition-all shadow-inner" 
                        />
                    </div>
                    
                    <div>
                        <label className="sr-only">Password</label>
                        <input 
                            name="password" 
                            type="password" 
                            required 
                            onChange={(e) => setPassword(e.target.value)}
                            pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{6,}"
                            placeholder="Create Password"
                            className={`
                                w-full px-6 py-3.5 rounded-full bg-white text-gray-900 placeholder-gray-500 
                                focus:outline-none focus:ring-4 transition-all shadow-inner
                                ${password.length > 0 && !isValid ? 'focus:ring-red-500/50' : 'focus:ring-indigo-500/50'}
                                ${isValid ? 'focus:ring-emerald-500/50' : ''}
                            `}
                        />
                        
                        {/* validation feedback text */}
                        <p className={`text-[10px] mt-2 px-4 leading-tight transition-colors duration-300 font-medium ${getTextColor()}`}>
                            {isValid ? '✅ Password looks good!' : '*Password must contain at least 6 characters, including uppercase, lowercase, and a symbol.'}
                        </p>
                    </div>

                    <button 
                        formAction={signup} 
                        className={`
                            w-full text-white font-bold py-3.5 rounded-full transition-all duration-200 transform hover:scale-[1.02] shadow-lg uppercase tracking-wider text-sm
                            ${isValid ? 'bg-indigo-600 hover:bg-indigo-500 shadow-indigo-500/50' : 'bg-gray-600 hover:bg-gray-500 shadow-gray-500/50 cursor-not-allowed opacity-80'}
                        `}
                    >
                        Create Account
                    </button>
                </form>

                {/* footer links */}
                <div className="mt-8 text-center text-xs text-gray-400">
                    <p className="mb-2">Already have an account?</p>
                    <Link href="/login" className="text-indigo-300 font-bold hover:text-white transition-colors border-b border-indigo-300/30 hover:border-white pb-0.5">
                        Sign In Here
                    </Link>
                </div>
            </div>
        </>
    )
}

// Exported function
export default function RegisterPage() {
    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 p-4 overflow-hidden relative">
            
            {/* background elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
                <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-[-20%] left-[20%] w-96 h-96 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
            </div>

            {/* suspense wrapper */}
            <Suspense fallback={null}>
                <RegisterForm />
            </Suspense>
        </div>
    )
}