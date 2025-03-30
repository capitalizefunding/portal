"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, AlertCircle, ArrowLeft } from "lucide-react"
import { supabase } from "@/lib/supabase"

export default function CreateTablePage() {
  const router = useRouter()
  const [result, setResult] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const checkTable = async () => {
    setIsLoading(true)
    setResult("Checking if applications table exists...")

    try {
      // Simple check if the table exists
      const { data, error } = await supabase.from("applications").select("count").limit(1)

      if (error && error.message.includes("does not exist")) {
        setResult((prev) => prev + "\nApplications table does not exist yet.")
      } else if (error) {
        throw error
      } else {
        setResult((prev) => prev + "\nApplications table exists!")

        // Try to get a sample row to see what columns exist
        const { data: sampleData, error: sampleError } = await supabase.from("applications").select("*").limit(1)

        if (sampleError) {
          setResult((prev) => prev + "\nCould not fetch sample data: " + sampleError.message)
        } else if (sampleData && sampleData.length > 0) {
          const columns = Object.keys(sampleData[0])
          setResult((prev) => prev + `\nFound columns: ${columns.join(", ")}`)
        } else {
          setResult((prev) => prev + "\nTable exists but is empty. Could not determine columns.")
        }
      }
    } catch (err) {
      setError(err.message)
      setResult((prev) => prev + `\nError checking table: ${err.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  const createTable = async () => {
    setIsLoading(true)
    setResult("Creating applications table...")

    try {
      // First drop the table if it exists
      const { error: dropError } = await supabase.query(`
        DROP TABLE IF EXISTS applications;
      `)

      if (dropError) {
        setResult((prev) => prev + `\nWarning when dropping table: ${dropError.message}`)
      } else {
        setResult((prev) => prev + "\nExisting table dropped successfully (if it existed)")
      }

      // Create the table with the correct schema
      const { error: createError } = await supabase.query(`
        CREATE TABLE applications (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          business_name TEXT NOT NULL,
          amountrequested NUMERIC,
          purpose TEXT,
          status TEXT DEFAULT 'pending',
          user_id TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `)

      if (createError) {
        throw createError
      }

      setResult((prev) => prev + "\nApplications table created successfully!")

      // Verify the table was created
      const { error: verifyError } = await supabase.from("applications").select("count").limit(1)

      if (verifyError) {
        throw verifyError
      }

      setResult((prev) => prev + "\nVerified table exists!")
      setSuccess(true)
    } catch (err) {
      setError(err.message)
      setResult((prev) => prev + `\nError creating table: ${err.message}`)
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
          <h2 className="text-2xl font-vectora-bold tracking-tight">Create Applications Table</h2>
          <p className="text-muted-foreground font-vectora-roman">
            Create the applications table with the correct schema
          </p>
        </div>
      </div>

      {success ? (
        <Card>
          <CardContent className="pt-6 flex flex-col items-center justify-center gap-4">
            <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-xl font-vectora-bold">Table Created Successfully</h3>
            <p className="text-center text-muted-foreground font-vectora-roman">
              The applications table has been created with the correct schema. You can now use the application form.
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
              <CardTitle>Table Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col gap-4">
                <Button onClick={checkTable} disabled={isLoading}>
                  1. Check Table Status
                </Button>
                <Button onClick={createTable} disabled={isLoading}>
                  2. Create/Recreate Table
                </Button>
              </div>

              <Alert variant="warning" className="bg-amber-50 border-amber-200 text-amber-800">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  <p>
                    Warning: The "Create/Recreate Table" action will drop the existing applications table if it exists
                    and create a new one. Any existing data will be lost.
                  </p>
                </AlertDescription>
              </Alert>

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

