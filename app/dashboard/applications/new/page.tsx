"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { supabase, testSupabaseConnection } from "@/lib/supabase"

export default function SimpleApplicationForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")
  const [debugInfo, setDebugInfo] = useState("")
  const [connectionStatus, setConnectionStatus] = useState<"unknown" | "testing" | "success" | "error">("unknown")
  const [connectionError, setConnectionError] = useState("")
  const [columns, setColumns] = useState<string[]>([])

  // Update the form state and handleSubmit function to use the correct column names

  // Add more form fields to match the table structure
  const [businessName, setBusinessName] = useState("")
  const [amount, setAmount] = useState("")
  const [purpose, setPurpose] = useState("")
  const [contactFirstName, setContactFirstName] = useState("")
  const [contactLastName, setContactLastName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")

  // Test Supabase connection on component mount
  useEffect(() => {
    testConnection()
    getTableColumns()
  }, [])

  const testConnection = async () => {
    setConnectionStatus("testing")
    setDebugInfo("Testing Supabase connection...")

    try {
      const { success, error, data } = await testSupabaseConnection()

      if (success) {
        setConnectionStatus("success")
        setDebugInfo((prev) => prev + "\nConnection successful: " + JSON.stringify(data))
      } else {
        setConnectionStatus("error")
        setConnectionError(error?.message || "Unknown error")
        setDebugInfo((prev) => prev + "\nConnection failed: " + JSON.stringify(error))
      }
    } catch (err) {
      setConnectionStatus("error")
      setConnectionError(err.message || "Unknown error")
      setDebugInfo((prev) => prev + "\nConnection test exception: " + err.message)
    }
  }

  const getTableColumns = async () => {
    setDebugInfo((prev) => prev + "\nGetting table columns...")

    try {
      // Try to get a sample row to determine columns
      const { data, error } = await supabase.from("applications").select("*").limit(1)

      if (error) {
        setDebugInfo((prev) => prev + "\nError getting sample row: " + JSON.stringify(error))
        return
      }

      if (data && data.length > 0) {
        const foundColumns = Object.keys(data[0])
        setColumns(foundColumns)
        setDebugInfo((prev) => prev + "\nFound columns: " + foundColumns.join(", "))
      } else {
        setDebugInfo((prev) => prev + "\nTable exists but is empty, trying SQL approach")

        // Try SQL approach
        try {
          const { data: columnData, error: columnError } = await supabase.query(`
            SELECT column_name
            FROM information_schema.columns
            WHERE table_schema = 'public'
            AND table_name = 'applications';
          `)

          if (columnError) {
            setDebugInfo((prev) => prev + "\nError getting column info: " + JSON.stringify(columnError))
            return
          }

          if (columnData && columnData.length > 0) {
            const foundColumns = columnData.map((col) => col.column_name)
            setColumns(foundColumns)
            setDebugInfo((prev) => prev + "\nFound columns via SQL: " + foundColumns.join(", "))
          } else {
            setDebugInfo((prev) => prev + "\nNo columns found via SQL")
          }
        } catch (sqlErr) {
          setDebugInfo((prev) => prev + "\nException in SQL query: " + sqlErr.message)
        }
      }
    } catch (err) {
      setDebugInfo((prev) => prev + "\nException getting columns: " + err.message)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setDebugInfo("Form submission started")
    setIsSubmitting(true)
    setError("")

    try {
      // Create a simple application object for localStorage
      const newApplication = {
        id: Date.now().toString(),
        legalBusinessName: businessName,
        amountRequested: amount,
        useOfFunds: purpose,
        contactFirstName: contactFirstName,
        contactLastName: contactLastName,
        email: email,
        phone: phone,
        created_at: new Date().toISOString(),
        status: "pending",
      }

      setDebugInfo("Created application object for localStorage")

      // Try to store in localStorage
      try {
        const existingApps = JSON.parse(localStorage.getItem("applications") || "[]")
        existingApps.push(newApplication)
        localStorage.setItem("applications", JSON.stringify(existingApps))
        setDebugInfo((prev) => prev + "\nSaved to localStorage successfully")
      } catch (storageError) {
        setDebugInfo((prev) => prev + "\nError saving to localStorage: " + storageError.message)
      }

      // Try to save to Supabase using a direct approach
      setDebugInfo((prev) => prev + "\nAttempting to save to Supabase...")

      // Create a properly formatted application object for Supabase with the correct column names
      const applicationToSave = {
        // Business Info
        legalBusinessName: businessName,

        // Funding Details
        amountRequested: amount,
        useOfFunds: purpose,

        // Contact Info
        contactFirstName: contactFirstName || "Demo",
        contactLastName: contactLastName || "User",
        email: email || "demo@example.com",
        phone: phone || "555-123-4567",

        // Add timestamp
        created_at: new Date().toISOString(),
      }

      setDebugInfo((prev) => prev + "\nFormatted data for Supabase: " + JSON.stringify(applicationToSave))

      // Try direct insert
      const { data, error } = await supabase.from("applications").insert([applicationToSave]).select()

      if (error) {
        setDebugInfo((prev) => prev + "\nSupabase error: " + JSON.stringify(error))
        console.error("Supabase save error:", error)
      } else {
        setDebugInfo((prev) => prev + "\nSaved to Supabase successfully: " + JSON.stringify(data))
      }

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setIsSubmitting(false)
      setSuccess(true)
      setDebugInfo((prev) => prev + "\nForm submission successful")

      // Redirect after showing success message
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

      {/* Connection Status */}
      <Card>
        <CardHeader>
          <CardTitle>Supabase Connection Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            {connectionStatus === "testing" && (
              <>
                <Loader2 className="h-5 w-5 animate-spin text-brand-green" />
                <span>Testing connection...</span>
              </>
            )}
            {connectionStatus === "success" && (
              <>
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="text-green-600">Connected to Supabase</span>
              </>
            )}
            {connectionStatus === "error" && (
              <>
                <AlertCircle className="h-5 w-5 text-red-600" />
                <span className="text-red-600">Connection error: {connectionError}</span>
              </>
            )}
            {connectionStatus === "unknown" && <span>Connection status unknown</span>}
          </div>
          <div className="mt-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={testConnection}
              disabled={connectionStatus === "testing"}
            >
              Test Connection
            </Button>
          </div>

          {columns.length > 0 && (
            <div className="mt-4">
              <p className="font-medium">Available Columns:</p>
              <ul className="list-disc pl-5">
                {columns.map((col, index) => (
                  <li key={index}>{col}</li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>

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
                <Input id="amount" type="text" value={amount} onChange={(e) => setAmount(e.target.value)} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="purpose">Purpose of Funding</Label>
                <Textarea id="purpose" value={purpose} onChange={(e) => setPurpose(e.target.value)} required />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contactFirstName">First Name</Label>
                  <Input
                    id="contactFirstName"
                    value={contactFirstName}
                    onChange={(e) => setContactFirstName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactLastName">Last Name</Label>
                  <Input
                    id="contactLastName"
                    value={contactLastName}
                    onChange={(e) => setContactLastName(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
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

