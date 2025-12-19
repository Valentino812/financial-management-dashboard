'use client'

import { resetPassword } from './actions'
import { useEffect, useState, Suspense } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import ToastListener from '@/components/toastListener'

function ResetPasswordForm() {
    const router = useRouter()

    // State for Security & Loading
    const [isChecking, setIsChecking] = useState(true)
    const [isVisible, setIsVisible] = useState(false)

    // State Form
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    // Session Check
    useEffect(() => {
        const checkSession = async () => {
            const supabase = createClient()
            const { data: { session } } = await supabase.auth.getSession()

            if (!session) {
                router.replace('/login?error=Access denied. Please use the link from your email.')
            } else {
                setIsChecking(false)
            }
        }
        checkSession()
    }, [router])

    // Animation Entrance (Only runs after security check is done)
    useEffect(() => {
        if (!isChecking) {
            const timer = setTimeout(() => setIsVisible(true), 100)
            return () => clearTimeout(timer)
        }
    }, [isChecking])

    // Validation Logic
    const checkPassword = (pass: string) => {
        const hasMinLength = pass.length >= 6
        const hasUpper = /[A-Z]/.test(pass)
        const hasLower = /[a-z]/.test(pass)
        const hasSymbol = /[\W_]/.test(pass)
        return hasMinLength && hasUpper && hasLower && hasSymbol
    }
    const isPasswordValid = checkPassword(password)
    const isMatch = password === confirmPassword && password.length > 0

    // Loading display before check is complete
    if (isChecking) {
        return (
            <div className="min-h-screen w-full bg-indigo-900 flex items-center justify-center">
                <div className="animate-pulse flex flex-col items-center gap-4">
                    <div className="h-8 w-8 bg-indigo-400 rounded-full animate-bounce"></div>
                    <p className="text-white font-medium text-sm tracking-widest uppercase">Verifying Security...</p>
                </div>
            </div>
        )
    }

    return (
        <>
            <ToastListener />

            {/* Main Card */}
            <div className={`relative z-10 w-full max-w-md bg-gray-900/60 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/10 transition-all duration-500 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>

                <div className="text-center mb-10">
                    <p className="text-xs font-bold tracking-[0.2em] text-indigo-300 uppercase mb-2">Account Recovery</p>
                    <h1 className="text-2xl font-extrabold text-white tracking-tight">NEW PASSWORD</h1>
                </div>

                <form className="space-y-6">

                    {/* Input New Password */}
                    <div>
                        <label className="sr-only">New Password</label>
                        <input
                            name="password"
                            type="password"
                            required
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="New Password"
                            className={`
                                w-full px-6 py-3.5 rounded-full bg-white text-gray-900 placeholder-gray-500
                                focus:outline-none focus:ring-4 transition-all shadow-inner
                                ${password.length > 0 && !isPasswordValid ? 'focus:ring-red-500/50' : 'focus:ring-indigo-500/50'}
                                ${isPasswordValid ? 'focus:ring-emerald-500/50' : ''}
                            `}
                        />
                         <p className={`text-[10px] mt-2 px-4 leading-tight transition-colors duration-300 font-medium ${isPasswordValid ? 'text-emerald-400' : 'text-gray-400'}`}>
                            {isPasswordValid ? '✅ Password Looks good!' : '*Minimum of 6 characters, uppercase, lowercase, and symbol.'}
                        </p>
                    </div>

                    {/* Input Confirm Password */}
                    <div>
                        <label className="sr-only">Confirm Password</label>
                        <input
                            name="confirmPassword"
                            type="password"
                            required
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm New Password"
                            className={`
                                w-full px-6 py-3.5 rounded-full bg-white text-gray-900 placeholder-gray-500
                                focus:outline-none focus:ring-4 transition-all shadow-inner
                                ${confirmPassword.length > 0 && !isMatch ? 'focus:ring-red-500/50' : 'focus:ring-indigo-500/50'}
                                ${isMatch ? 'focus:ring-emerald-500/50' : ''}
                            `}
                        />
                        {confirmPassword.length > 0 && !isMatch && (
                             <p className="text-[10px] mt-2 px-4 leading-tight text-red-400 font-medium">
                                *Passwords do not match
                            </p>
                        )}
                    </div>

                    <button
                        formAction={resetPassword}
                        disabled={!isPasswordValid || !isMatch}
                        className={`
                            w-full text-white font-bold py-3.5 rounded-full transition-all duration-200 transform hover:scale-[1.02] shadow-lg uppercase tracking-wider text-sm
                            ${isPasswordValid && isMatch ? 'bg-indigo-600 hover:bg-indigo-500 shadow-indigo-500/50' : 'bg-gray-600 hover:bg-gray-500 shadow-gray-500/50 cursor-not-allowed opacity-80'}
                        `}
                    >
                        Update Password
                    </button>
                </form>
            </div>
        </>
    )
}

// Exported form
export default function ResetPasswordPage() {
    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 p-4 overflow-hidden relative">

            {/* Background Animation */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
                <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-[-20%] left-[20%] w-96 h-96 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
            </div>

            <Suspense fallback={null}>
                <ResetPasswordForm />
            </Suspense>
        </div>
    )
}