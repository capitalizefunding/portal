"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"

export default function ViewApplicationPage() {
  const router = useRouter()

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={() => router.push("/dashboard/applications")} className="gap-1">
          <ArrowLeft className="h-4 w-4" />
          Back to Applications
        </Button>
      </div>

      <div>
        <h2 className="text-2xl font-vectora-bold tracking-tight">Application Details</h2>
        <p className="text-muted-foreground font-vectora-roman">Acme Corp - Business Expansion</p>
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
                <p>Acme Corp</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Date Submitted</h3>
                <p>Mar 24, 2025</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Amount</h3>
                <p>$75,000</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
                <p className="text-green-600">Approved</p>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Purpose</h3>
              <p>Business Expansion</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Notes</h3>
              <p>
                Client is expanding their operations to a new location and needs funding for equipment and initial
                inventory.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-4">
        <Button variant="outline" onClick={() => router.push("/dashboard/applications/edit")}>
          Edit Application
        </Button>
        <Button
          className="bg-brand-button text-black hover:bg-brand-button/90 rounded-brand"
          onClick={() => router.push("/dashboard/applications")}
        >
          Back to Applications
        </Button>
      </div>
    </div>
  )
}

