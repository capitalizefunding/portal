"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, CheckCircle, Clock, AlertCircle, Loader2 } from "lucide-react"
import { getApplications, supabase } from "@/lib/supabase"

export default function ApplicationsPage() {
  const [applications, setApplications] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [debugInfo, setDebugInfo] = useState("")

  useEffect(() => {
    setDebugInfo("Loading applications...")

    const loadApplications = async () => {
      try {
        // Try to get applications from localStorage first
        try {
          const storedAppsString = localStorage.getItem("applications")
          setDebugInfo((prev) => prev + `\nLocalStorage data: ${storedAppsString}`)

          const storedApplications = JSON.parse(storedAppsString || "[]")
          setDebugInfo((prev) => prev + `\nParsed ${storedApplications.length} applications from localStorage`)

          // If we have applications in localStorage, use them
          if (storedApplications.length > 0) {
            setApplications(storedApplications)
            setDebugInfo((prev) => prev + `\nUsing ${storedApplications.length} applications from localStorage`)
          }
        } catch (storageErr) {
          setDebugInfo((prev) => prev + `\nError reading from localStorage: ${storageErr.message}`)
        }

        // Try to get applications from Supabase
        setDebugInfo((prev) => prev + `\nAttempting to fetch from Supabase...`)

        // Check if Supabase is initialized
        if (!supabase) {
          throw new Error("Supabase client is not initialized")
        }

        setDebugInfo((prev) => prev + `\nSupabase client initialized`)

        // Fetch applications from Supabase
        const { data, error } = await getApplications()

        if (error) {
          setDebugInfo((prev) => prev + `\nSupabase error: ${JSON.stringify(error)}`)
          throw error
        }

        if (data && data.length > 0) {
          setDebugInfo((prev) => prev + `\nFetched ${data.length} applications from Supabase`)
          setApplications(data)
        } else {
          setDebugInfo((prev) => prev + `\nNo applications found in Supabase`)
        }
      } catch (err) {
        const errorMessage = err.message || "An unknown error occurred"
        console.error("Error loading applications:", err)
        setDebugInfo((prev) => prev + `\nError: ${errorMessage}`)
        setError(`Failed to load applications: ${errorMessage}`)
      } finally {
        setIsLoading(false)
      }
    }

    // Simulate a short loading delay
    setTimeout(() => {
      loadApplications()
    }, 500)
  }, [])

  // Helper function to format currency
  const formatCurrency = (amount) => {
    const num = typeof amount === "string" ? Number.parseFloat(amount) : amount
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num || 0)
  }

  // Helper function to format date
  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    } catch (e) {
      return "Invalid date"
    }
  }

  // Helper function to render status badge
  const renderStatus = (status) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return (
          <div className="flex items-center gap-1 text-green-600">
            <CheckCircle className="h-4 w-4" />
            <span>Approved</span>
          </div>
        )
      case "in review":
      case "pending":
        return (
          <div className="flex items-center gap-1 text-amber-600">
            <Clock className="h-4 w-4" />
            <span>{status === "pending" ? "In Review" : status}</span>
          </div>
        )
      case "needs info":
        return (
          <div className="flex items-center gap-1 text-red-600">
            <AlertCircle className="h-4 w-4" />
            <span>Needs Info</span>
          </div>
        )
      default:
        return <span>{status || "Unknown"}</span>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-vectora-bold tracking-tight">Applications</h2>
          <p className="text-muted-foreground font-vectora-roman">Manage your client applications</p>
        </div>
        <Link href="/dashboard/applications/new">
          <Button className="bg-brand-button text-black hover:bg-brand-button/90 rounded-brand">
            <FileText className="mr-2 h-4 w-4" />
            New Application
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Applications</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-brand-green" />
            </div>
          ) : error ? (
            <div className="text-center py-8 text-red-500">
              <AlertCircle className="h-8 w-8 mx-auto mb-2" />
              <p>{error}</p>
            </div>
          ) : applications.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>No applications found. Create your first application to get started.</p>
              <Link href="/dashboard/applications/new" className="mt-4 inline-block">
                <Button className="bg-brand-button text-black hover:bg-brand-button/90 rounded-brand">
                  <FileText className="mr-2 h-4 w-4" />
                  New Application
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-5 text-sm font-medium text-muted-foreground">
                <div>Client</div>
                <div>Date</div>
                <div>Amount</div>
                <div>Status</div>
                <div className="text-right">Actions</div>
              </div>

              {applications.map((app) => (
                <div key={app.id} className="grid grid-cols-5 items-center gap-4 text-sm border-b pb-4">
                  <div>
                    <div className="font-medium">
                      {app.legalBusinessName || app.contactFirstName + " " + app.contactLastName || "Unnamed Business"}
                    </div>
                    <div className="text-xs text-muted-foreground">{app.useOfFunds || "Business Funding"}</div>
                  </div>
                  <div>{formatDate(app.created_at)}</div>
                  <div>{formatCurrency(app.amountRequested || 0)}</div>
                  <div>{renderStatus(app.status)}</div>
                  <div className="flex justify-end gap-2">
                    <Link href={`/dashboard/applications/view?id=${app.id}`}>
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Debug information */}
          <div className="mt-8 border-t pt-4">
            <h3 className="text-sm font-medium mb-2">Debug Information</h3>
            <pre className="whitespace-pre-wrap bg-gray-100 p-4 rounded text-xs">
              {debugInfo || "No debug information"}
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

