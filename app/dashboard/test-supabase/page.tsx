"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { supabase } from "@/lib/supabase"

export default function TestSupabasePage() {
  const [testResult, setTestResult] = useState("")
  const [tables, setTables] = useState([])
  const [query, setQuery] = useState("SELECT * FROM applications LIMIT 5")
  const [queryResult, setQueryResult] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    testConnection()
  }, [])

  const testConnection = async () => {
    setTestResult("Testing Supabase connection...")
    try {
      // Check if Supabase is initialized
      if (!supabase) {
        throw new Error("Supabase client is not initialized")
      }

      // Test the connection with a simple query
      const { data, error } = await supabase.from("applications").select("count").limit(1)

      if (error) {
        throw error
      }

      setTestResult(`Connection successful! Response: ${JSON.stringify(data)}`)

      // Get list of tables
      const { data: tablesData, error: tablesError } = await supabase.rpc("list_tables")

      if (tablesError) {
        setTestResult((prev) => `${prev}\nCould not fetch tables: ${tablesError.message}`)
      } else {
        setTables(tablesData || [])
        setTestResult((prev) => `${prev}\nFetched ${tablesData?.length || 0} tables`)
      }
    } catch (err) {
      setError(err.message)
      setTestResult(`Connection failed: ${err.message}`)
    }
  }

  const runCustomQuery = async () => {
    setQueryResult("Running query...")
    try {
      // Run the custom query
      const { data, error } = await supabase.rpc("run_sql", { query })

      if (error) {
        throw error
      }

      setQueryResult(`Query result: ${JSON.stringify(data, null, 2)}`)
    } catch (err) {
      setError(err.message)
      setQueryResult(`Query failed: ${err.message}`)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-vectora-bold tracking-tight">Test Supabase Connection</h2>
        <p className="text-muted-foreground font-vectora-roman">
          This page tests if your Supabase connection is working properly
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Connection Test</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={testConnection}>Test Connection</Button>

          {error && <p className="text-red-500">{error}</p>}

          <div className="mt-4">
            <h3 className="text-sm font-medium mb-2">Test Result</h3>
            <pre className="whitespace-pre-wrap bg-gray-100 p-4 rounded text-xs">{testResult || "No test run yet"}</pre>
          </div>
        </CardContent>
      </Card>

      {tables.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Database Tables</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-1">
              {tables.map((table, index) => (
                <li key={index}>{table}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Run Custom Query</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="query">SQL Query</Label>
            <Textarea
              id="query"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="font-mono"
              rows={3}
            />
          </div>

          <Button onClick={runCustomQuery}>Run Query</Button>

          <div className="mt-4">
            <h3 className="text-sm font-medium mb-2">Query Result</h3>
            <pre className="whitespace-pre-wrap bg-gray-100 p-4 rounded text-xs">
              {queryResult || "No query run yet"}
            </pre>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Supabase Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p>
              <strong>URL:</strong> https://xjgfljqskxnpnyfeojzp.supabase.co
            </p>
            <p>
              <strong>Key:</strong> [HIDDEN]
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

