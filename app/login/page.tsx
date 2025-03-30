"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // For now, let's just use the demo login functionality
      // since we're still setting up Supabase
      handleDemoLogin()
    } catch (err: any) {
      console.error("Login error:", err)
      setError(err.message || "Invalid email or password. Please try again.")
      setIsLoading(false)
    }
  }

  // Update the handleDemoLogin function to use a more reliable navigation method
  const handleDemoLogin = () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      // Navigate to dashboard
      window.location.href = "/dashboard"
    }, 1000)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="container flex h-16 items-center px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="Capitalize Funding" width={60} height={60} className="h-12 w-auto" priority />
          </Link>
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center p-4 md:p-8">
        <Card className="mx-auto max-w-md w-full">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-vectora-bold">Partner Login</CardTitle>
            <CardDescription>Enter your credentials to access your partner portal</CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="partner@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <button
                    type="button"
                    onClick={() => router.push("/forgot-password")}
                    className="text-brand-green font-bold underline hover:text-brand-green/80 text-sm font-vectora-roman"
                  >
                    Forgot password?
                  </button>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-brand-button text-black hover:bg-brand-button/90 rounded-brand"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>

              {/* Demo login button for testing */}
              <div className="text-center">
                <button
                  type="button"
                  onClick={handleDemoLogin}
                  className="text-brand-green font-bold underline hover:text-brand-green/80 text-sm font-vectora-roman"
                >
                  Demo Login (Skip Authentication)
                </button>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col">
            <div className="mt-2 text-center text-sm font-vectora-roman">
              Don&apos;t have a partner account?{" "}
              <button
                type="button"
                onClick={() => router.push("/register")}
                className="text-brand-green font-bold underline hover:text-brand-green/80 text-sm font-vectora-roman"
              >
                Register now
              </button>
            </div>
          </CardFooter>
        </Card>
      </main>
      <footer className="border-t py-4 bg-gray-50">
        <div className="container flex justify-center text-center text-sm text-gray-500 font-vectora-roman">
          © 2025 Capitalize Funding. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

