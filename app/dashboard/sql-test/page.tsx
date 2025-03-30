"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { supabase } from "@/lib/supabase"
import { Loader2 } from "lucide-react"

export default function SqlTestPage() {
  const [query, setQuery] = useState(`-- Test if the applications table exists
SELECT EXISTS (
  SELECT FROM information_schema.tables 
  WHERE table_schema = 'public' 
  AND table_name = 'applications'
);

-- If it exists, show the table structure
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_schema = 'public'
AND table_name = 'applications';`)

  const [result, setResult] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const runQuery = async () => {
    setIsLoading(true)
    setResult("")
    setError("")

    try {
      const { data, error } = await supabase.query(query)

      if (error) {
        setError(error.message || "An error occurred")
      } else {
        setResult(JSON.stringify(data, null, 2))
      }
    } catch (err) {
      setError(err.message || "An exception occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const testInsert = async () => {
    setIsLoading(true)
    setResult("Testing direct insert...")
    setError("")

    try {
      // First check if the table exists
      const { data: tableExists, error: tableError } = await supabase.query(`
        SELECT EXISTS (
          SELECT FROM information_schema.tables 
          WHERE table_schema = 'public' 
          AND table_name = 'applications'
        );
      `)

      if (tableError) {
        throw tableError
      }

      setResult((prev) => prev + "\nTable check: " + JSON.stringify(tableExists))

      // Try a direct insert
      const { data, error } = await supabase.query(`
        INSERT INTO applications (
          business_name, 
          amountrequested, 
          purpose, 
          status, 
          created_at
        ) VALUES (
          'Test Business', 
          50000, 
          'Test Purpose', 
          'pending', 
          NOW()
        ) RETURNING *;
      `)

      if (error) {
        throw error
      }

      setResult((prev) => prev + "\nInsert successful: " + JSON.stringify(data))
    } catch (err) {
      setError(err.message || "An exception occurred")
      setResult((prev) => prev + "\nError: " + err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-vectora-bold tracking-tight">SQL Test</h2>
        <p className="text-muted-foreground font-vectora-roman">
          Run SQL queries directly against your Supabase database
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>SQL Query</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea value={query} onChange={(e) => setQuery(e.target.value)} className="font-mono min-h-[200px]" />
          <div className="flex gap-2">
            <Button onClick={runQuery} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Running...
                </>
              ) : (
                "Run Query"
              )}
            </Button>
            <Button variant="outline" onClick={testInsert} disabled={isLoading}>
              Test Direct Insert
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Result</CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="bg-red-50 text-red-700 p-4 rounded mb-4">
              <p className="font-bold">Error:</p>
              <p>{error}</p>
            </div>
          )}
          <pre className="whitespace-pre-wrap bg-gray-100 p-4 rounded text-xs">{result || "No results yet"}</pre>
        </CardContent>
      </Card>
    </div>
  )
}

