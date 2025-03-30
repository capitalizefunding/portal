"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export default function V0BrokeItPage() {
  const [applications, setApplications] = useState<any[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchApplications = async () => {
      const { data, error } = await supabase.from("applications").select("*")
      if (error) {
        setError(error.message)
      } else {
        setApplications(data)
      }
    }

    fetchApplications()
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">V0 Broke It</h1>
      {error && <p className="text-red-500">Error: {error}</p>}
      {!error && applications.length === 0 && <p>No applications found.</p>}
      <ul className="space-y-2">
        {applications.map((app) => (
          <li key={app.id} className="border p-4 rounded">
            <strong>{app.legal_business_name}</strong><br />
            Requested: ${app.amount_requested} • Status: {app.status}
          </li>
        ))}
      </ul>
    </div>
  )
}