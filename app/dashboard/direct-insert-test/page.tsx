"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"

export default function DirectInsertTestPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleInsert = async () => {
    setIsLoading(true)
    setError(null)
    setSuccess(false)

    try {
      const { error } = await supabase.from("applications").insert([
        {
          legalBusinessName: "Fake Lead",
          amountRequested: "50000",
          status: "pending",
        },
      ])

      if (error) throw error

      setSuccess(true)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Direct Insert Test</h1>
      <Button onClick={handleInsert} disabled={isLoading}>
        {isLoading ? "Submitting..." : "Insert Test Application"}
      </Button>
      {success && <p className="text-green-600">Application inserted successfully!</p>}
      {error && <p className="text-red-600">Error: {error}</p>}
    </div>
  )
}
