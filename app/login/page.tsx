"use client"

import type React from "react"

import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useStore } from "@/lib/store"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { Mail, Lock, User, Eye, EyeOff } from "lucide-react"

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()
  const { setUser, user, getRegisteredUsers, addRegisteredUser } = useStore()

  useEffect(() => {
    if (user) {
      router.push("/dashboard")
    }
  }, [user, router])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!email || !password) {
      setError("Please fill in all fields")
      return
    }

    if (isLogin) {
      const registeredUsers = getRegisteredUsers()
      const foundUser = registeredUsers.find((u) => u.email === email && u.password === password)

      if (foundUser) {
        setUser(foundUser)
        router.push("/dashboard")
      } else {
        setError("Invalid email or password. Please sign up first or check your credentials.")
      }
    } else {
      if (!name) {
        setError("Please fill in all fields")
        return
      }

      const registeredUsers = getRegisteredUsers()
      if (registeredUsers.some((u) => u.email === email)) {
        setError("This email is already registered. Please sign in instead.")
        return
      }

      const newUser = {
        id: Math.random().toString(),
        email,
        name,
        password,
      }
      addRegisteredUser(newUser)
      setUser(newUser)
      router.push("/dashboard")
    }
  }

  if (user) return null

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-950 to-slate-900">
      <section className="flex-grow py-12 flex items-center justify-center">
        <div className="w-full max-w-md px-4">
          <div className="bg-slate-800 rounded-lg border border-slate-700 p-8 shadow-2xl">
            <h1 className="text-3xl font-bold mb-2 text-center bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h1>
            <p className="text-center text-slate-400 mb-8">
              {isLogin ? "Sign in to your account" : "Join SHIVORA today"}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium mb-2 text-slate-300">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 text-slate-400" size={18} />
                    <Input
                      type="text"
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="pl-10 bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium mb-2 text-slate-300">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 text-slate-400" size={18} />
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-slate-700 border-slate-600 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-slate-300">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 text-slate-400" size={18} />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 bg-slate-700 border-slate-600 text-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-slate-400 hover:text-slate-200"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="bg-red-900/20 border border-red-800 rounded-lg p-3 text-sm text-red-400">{error}</div>
              )}

              {isLogin && (
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                    <input type="checkbox" className="rounded bg-slate-700 border-slate-600" />
                    Remember me
                  </label>
                  <a href="#" className="text-orange-500 hover:text-orange-400">
                    Forgot password?
                  </a>
                </div>
              )}

              <Button
                type="submit"
                size="lg"
                className="w-full bg-gradient-to-r from-orange-500 to-amber-600 hover:opacity-90 font-semibold text-white"
              >
                {isLogin ? "Sign In" : "Create Account"}
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-slate-700 text-center">
              <p className="text-sm text-slate-400 mb-3">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
              </p>
              <button
                onClick={() => {
                  setIsLogin(!isLogin)
                  setError("")
                  setEmail("")
                  setPassword("")
                  setName("")
                }}
                className="text-orange-500 font-semibold hover:text-orange-400"
              >
                {isLogin ? "Sign up here" : "Sign in here"}
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
