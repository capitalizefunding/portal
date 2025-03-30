"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Loader2, AlertCircle } from "lucide-react"

export default function ViewApplicationPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const id = searchParams.get("id")

  const [application, setApplication] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    if (!id) {
      setError("Application ID is missing")
      setIsLoading(false)
      return
    }

    // Simulate loading
    setTimeout(() => {
      try {
        // Get applications from localStorage
        const applications = JSON.parse(localStorage.getItem("applications") || "[]")
        const app = applications.find((a: any) => a.id === id)

        if (app) {
          setApplication(app)
        } else {
          setError("Application not found")
        }

        setIsLoading(false)
      } catch (err: any) {
        console.error("Error loading application:", err)
        setError("Failed to load application details")
        setIsLoading(false)
      }
    }, 500)
  }, [id])

  // Helper function to format currency
  const formatCurrency = (amount: number | string) => {
    const num = typeof amount === "string" ? Number.parseFloat(amount) : amount
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num || 0)
  }

  // Helper function to format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={() => router.push("/dashboard/applications")} className="gap-1">
          <ArrowLeft className="h-4 w-4" />
          Back to Applications
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-brand-green" />
        </div>
      ) : error ? (
        <div className="text-center py-8 text-red-500">
          <AlertCircle className="h-8 w-8 mx-auto mb-2" />
          <p>{error}</p>
        </div>
      ) : application ? (
        <>
          <div>
            <h2 className="text-2xl font-vectora-bold tracking-tight">Application Details</h2>
            <p className="text-muted-foreground font-vectora-roman">
              {application.legalBusinessName || application.contactFirstName + " " + application.contactLastName} -
              {application.useOfFunds || "Business Funding"}
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Application Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Client</h3>
                    <p>
                      {application.legalBusinessName ||
                        application.contactFirstName + " " + application.contactLastName}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Date Submitted</h3>
                    <p>{formatDate(application.created_at)}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Amount</h3>
                    <p>{formatCurrency(application.amountRequested)}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
                    <p
                      className={
                        application.status === "approved"
                          ? "text-green-600"
                          : application.status === "needs info"
                            ? "text-red-600"
                            : "text-amber-600"
                      }
                    >
                      {application.status === "pending" ? "In Review" : application.status}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Purpose</h3>
                  <p>{application.useOfFunds || "Business Funding"}</p>
                </div>

                {application.timeframe && (
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Timeframe</h3>
                    <p>
                      {application.timeframe === "immediate"
                        ? "Immediately (1-3 days)"
                        : application.timeframe === "soon"
                          ? "Soon (1-2 weeks)"
                          : application.timeframe === "flexible"
                            ? "Flexible (2-4 weeks)"
                            : "Planning Phase (1+ months)"}
                    </p>
                  </div>
                )}

                {application.contactFirstName && (
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Contact</h3>
                    <p>
                      {application.contactFirstName} {application.contactLastName}
                    </p>
                    <p>{application.email}</p>
                    <p>{application.phone}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4">
            <Button variant="outline" onClick={() => router.push(`/dashboard/applications/edit?id=${application.id}`)}>
              Edit Application
            </Button>
            <Button
              className="bg-brand-button text-black hover:bg-brand-button/90 rounded-brand"
              onClick={() => router.push("/dashboard/applications")}
            >
              Back to Applications
            </Button>
          </div>
        </>
      ) : (
        <div className="text-center py-8 text-muted-foreground">
          <p>Application not found.</p>
        </div>
      )}
    </div>
  )
}

