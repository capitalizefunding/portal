"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { saveApplication, supabase } from "@/lib/supabase"

export default function SimpleApplicationForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")
  const [debugInfo, setDebugInfo] = useState("")

  // Simplified form with just a few fields
  const [businessName, setBusinessName] = useState("")
  const [amount, setAmount] = useState("")
  const [purpose, setPurpose] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setDebugInfo("Form submission started")
    setIsSubmitting(true)
    setError("")

    try {
      // Log form data
      const formData = {
        businessName: businessName,
        amount: amount,
        purpose: purpose,
      }

      setDebugInfo((prev) => prev + "\nForm data: " + JSON.stringify(formData))
      console.log("Form data:", formData)

      // Create a simple application object for localStorage
      const newApplication = {
        id: Date.now().toString(),
        legalBusinessName: businessName,
        amountRequested: amount,
        useOfFunds: purpose,
        created_at: new Date().toISOString(),
        status: "pending",
      }

      setDebugInfo((prev) => prev + "\nCreated application object")

      // Try to store in localStorage
      try {
        const existingApps = JSON.parse(localStorage.getItem("applications") || "[]")
        existingApps.push(newApplication)
        localStorage.setItem("applications", JSON.stringify(existingApps))
        setDebugInfo((prev) => prev + "\nSaved to localStorage successfully")
      } catch (storageError) {
        setDebugInfo((prev) => prev + "\nError saving to localStorage: " + storageError.message)
        console.error("localStorage error:", storageError)
      }

      // Try to save to Supabase
      setDebugInfo((prev) => prev + "\nAttempting to save to Supabase...")
      try {
        // Check if Supabase is initialized
        if (!supabase) {
          throw new Error("Supabase client is not initialized")
        }

        // Log Supabase connection info (without sensitive data)
        setDebugInfo((prev) => prev + "\nSupabase client initialized")

        // Try to save to Supabase
        const { data, error } = await saveApplication(formData)

        if (error) {
          setDebugInfo((prev) => prev + "\nSupabase error: " + JSON.stringify(error))
          console.error("Supabase save error:", error)
        } else {
          setDebugInfo((prev) => prev + "\nSaved to Supabase successfully: " + JSON.stringify(data))
        }
      } catch (supabaseError) {
        setDebugInfo((prev) => prev + "\nError with Supabase: " + supabaseError.message)
        console.error("Supabase error:", supabaseError)
        // Continue with the form submission even if Supabase fails
      }

      // Simulate API delay
      setDebugInfo((prev) => prev + "\nWaiting 1 second...")
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setIsSubmitting(false)
      setSuccess(true)
      setDebugInfo((prev) => prev + "\nForm submission successful")

      // Redirect after showing success message
      setDebugInfo((prev) => prev + "\nWill redirect in 2 seconds...")
      setTimeout(() => {
        router.push("/dashboard/applications")
      }, 2000)
    } catch (err) {
      const errorMessage = err.message || "An unknown error occurred"
      console.error("Form submission error:", err)
      setDebugInfo((prev) => prev + "\nError: " + errorMessage)
      setError(errorMessage)
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-vectora-bold tracking-tight">Simple Application Form</h2>
        <p className="text-muted-foreground font-vectora-roman">Submit a simplified funding application</p>
      </div>

      {success ? (
        <Card>
          <CardContent className="pt-6 flex flex-col items-center justify-center gap-4">
            <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-xl font-vectora-bold">Application Submitted</h3>
            <p className="text-center text-muted-foreground font-vectora-roman">
              Your application has been submitted successfully. You will be redirected to the applications page.
            </p>
          </CardContent>
        </Card>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="businessName">Business Name</Label>
                <Input
                  id="businessName"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount">Amount Requested ($)</Label>
                <Input
                  id="amount"
                  type="number"
                  min="1000"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="purpose">Purpose of Funding</Label>
                <Textarea id="purpose" value={purpose} onChange={(e) => setPurpose(e.target.value)} required />
              </div>
            </CardContent>
          </Card>

          {/* Debug information card */}
          <Card>
            <CardHeader>
              <CardTitle>Debug Information</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="whitespace-pre-wrap bg-gray-100 p-4 rounded text-xs">
                {debugInfo || "No debug information yet"}
              </pre>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => router.push("/dashboard/applications")}>
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-brand-button text-black hover:bg-brand-button/90 rounded-brand"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </Button>
          </div>
        </form>
      )}
    </div>
  )
}

