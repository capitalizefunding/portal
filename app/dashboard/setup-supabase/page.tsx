"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, AlertCircle, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

export default function SetupSupabasePage() {
  const router = useRouter()
  const [result, setResult] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const testConnection = async () => {
    setIsLoading(true)
    setResult("Testing Supabase connection...")

    try {
      // Test the connection with a simple query
      const { data, error } = await supabase.from("_test").select("*").limit(1)

      if (error && error.message.includes("does not exist")) {
        setResult((prev) => prev + "\nConnection successful, but _test table doesn't exist (which is expected).")
      } else if (error) {
        throw error
      } else {
        setResult((prev) => prev + "\nConnection successful!")
      }
    } catch (err) {
      setError(err.message)
      setResult((prev) => prev + `\nConnection error: ${err.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  const createApplicationsTable = async () => {
    setIsLoading(true)
    setResult("Creating applications table...")

    try {
      // Try direct SQL first
      const { error } = await supabase.query(`
        CREATE TABLE IF NOT EXISTS applications (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          business_name TEXT NOT NULL,
          amount NUMERIC,
          purpose TEXT,
          status TEXT DEFAULT 'pending',
          user_id TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `)

      if (error) {
        // If direct SQL fails, try using RPC
        const { error: rpcError } = await supabase.rpc("exec_sql", {
          sql: `
            CREATE TABLE IF NOT EXISTS applications (
              id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
              business_name TEXT NOT NULL,
              amount NUMERIC,
              purpose TEXT,
              status TEXT DEFAULT 'pending',
              user_id TEXT,
              created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
              updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
            );
          `,
        })

        if (rpcError) {
          throw rpcError
        }
      }

      setResult((prev) => prev + "\nApplications table created successfully!")

      // Verify the table was created
      const { error: verifyError } = await supabase.from("applications").select("count").limit(1)

      if (verifyError) {
        throw verifyError
      }

      setResult((prev) => prev + "\nVerified applications table exists!")
      setSuccess(true)
    } catch (err) {
      setError(err.message)
      setResult((prev) => prev + `\nError: ${err.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={() => router.push("/dashboard")} className="gap-1">
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Button>
        <div>
          <h2 className="text-2xl font-vectora-bold tracking-tight">Setup Database</h2>
          <p className="text-muted-foreground font-vectora-roman">
            Set up your Supabase database for the application form
          </p>
        </div>
      </div>

      {success ? (
        <Card>
          <CardContent className="pt-6 flex flex-col items-center justify-center gap-4">
            <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-xl font-vectora-bold">Setup Complete</h3>
            <p className="text-center text-muted-foreground font-vectora-roman">
              Your database has been set up successfully. You can now use the application form.
            </p>
            <Button
              className="bg-brand-button text-black hover:bg-brand-button/90 rounded-brand mt-4"
              onClick={() => router.push("/dashboard/applications/new")}
            >
              Go to Application Form
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Database Setup</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col gap-4">
                <Button onClick={testConnection} disabled={isLoading}>
                  1. Test Connection
                </Button>
                <Button onClick={createApplicationsTable} disabled={isLoading}>
                  2. Create Applications Table
                </Button>
              </div>

              <div className="mt-4">
                <h3 className="text-sm font-medium mb-2">Result</h3>
                <pre className="whitespace-pre-wrap bg-gray-100 p-4 rounded text-xs">
                  {result || "No actions performed yet"}
                </pre>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}

