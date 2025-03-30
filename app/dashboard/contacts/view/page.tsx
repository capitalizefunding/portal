"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Mail, Phone } from "lucide-react"

export default function ViewContactPage() {
  const router = useRouter()

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={() => router.push("/dashboard/contacts")} className="gap-1">
          <ArrowLeft className="h-4 w-4" />
          Back to Contacts
        </Button>
      </div>

      <div>
        <h2 className="text-2xl font-vectora-bold tracking-tight">Contact Details</h2>
        <p className="text-muted-foreground font-vectora-roman">John Doe - Acme Corp</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Name</h3>
                <p>John Doe</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Title</h3>
                <p>CEO</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Email</h3>
                <div className="flex items-center gap-1">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>john.doe@acme.com</span>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Phone</h3>
                <div className="flex items-center gap-1">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>(555) 123-4567</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Company Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Company</h3>
                <p>Acme Corp</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Address</h3>
                <p>123 Business Ave, Suite 100</p>
                <p>New York, NY 10001</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Lead Source</h3>
                <p>Referral</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              John is interested in business expansion funding. He has been a client for 3 years and has an excellent
              payment history.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end gap-4">
        <Button variant="outline" onClick={() => router.push("/dashboard/contacts/edit")}>
          Edit Contact
        </Button>
        <Button
          className="bg-brand-button text-black hover:bg-brand-button/90 rounded-brand"
          onClick={() => router.push("/dashboard/contacts")}
        >
          Back to Contacts
        </Button>
      </div>
    </div>
  )
}

