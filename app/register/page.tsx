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
import { Checkbox } from "@/components/ui/checkbox"
import { AlertCircle, CheckCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function RegisterPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [companyName, setCompanyName] = useState("")
  const [phone, setPhone] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [emailSent, setEmailSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }

    try {
      // Simulate API call and email sending
      setTimeout(() => {
        setIsLoading(false)
        setEmailSent(true)
        setSuccess(true)

        // Redirect to login page after showing success message
        setTimeout(() => {
          router.push("/login")
        }, 5000)
      }, 1500)
    } catch (err: any) {
      setError(err.message || "An error occurred during registration")
      setIsLoading(false)
    }
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
            <CardTitle className="text-2xl font-vectora-bold">Partner Registration</CardTitle>
            <CardDescription>Create an account to start submitting funding applications</CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success ? (
              <div className="space-y-4">
                <Alert className="bg-green-50 text-green-600 border-green-200">
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>
                    Registration successful! {emailSent ? "A verification email has been sent to " + email : ""}
                  </AlertDescription>
                </Alert>
                {emailSent && (
                  <div className="p-4 bg-gray-50 rounded-md">
                    <h4 className="font-vectora-bold mb-2">Next Steps:</h4>
                    <ol className="list-decimal pl-5 space-y-1 text-sm font-vectora-roman">
                      <li>Check your email inbox for a verification message</li>
                      <li>Click the verification link in the email</li>
                      <li>Return to the login page to access your account</li>
                    </ol>
                  </div>
                )}
                <p className="text-center text-sm text-muted-foreground font-vectora-roman">
                  You will be redirected to the login page in a few seconds...
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" required />
                  <Label htmlFor="terms" className="text-sm font-vectora-roman">
                    I agree to the{" "}
                    <button
                      type="button"
                      className="text-brand-green font-bold underline hover:text-brand-green/80 text-sm font-vectora-roman"
                    >
                      Terms of Service
                    </button>{" "}
                    and{" "}
                    <button
                      type="button"
                      className="text-brand-green font-bold underline hover:text-brand-green/80 text-sm font-vectora-roman"
                    >
                      Privacy Policy
                    </button>
                  </Label>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-brand-button text-black hover:bg-brand-button/90 rounded-brand"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating Account..." : "Create Account"}
                </Button>
              </form>
            )}
          </CardContent>
          <CardFooter className="flex flex-col">
            <div className="mt-2 text-center text-sm font-vectora-roman">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => router.push("/login")}
                className="text-brand-green font-bold underline hover:text-brand-green/80 text-sm font-vectora-roman"
              >
                Sign in
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

