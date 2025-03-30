"use client"

import type React from "react"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft } from "lucide-react"

export default function EditApplicationPage() {
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate saving
    setTimeout(() => {
      router.push("/dashboard/applications")
    }, 500)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={() => router.push("/dashboard/applications")} className="gap-1">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <div>
          <h2 className="text-2xl font-vectora-bold tracking-tight">Edit Application</h2>
          <p className="text-muted-foreground font-vectora-roman">Acme Corp - Business Expansion</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Tabs defaultValue="business" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="business">Business Info</TabsTrigger>
            <TabsTrigger value="funding">Funding Details</TabsTrigger>
            <TabsTrigger value="contact">Contact Info</TabsTrigger>
          </TabsList>

          <TabsContent value="business" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Business Information</CardTitle>
                <CardDescription>Update the business details for this application</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="businessName">Business Name</Label>
                  <Input id="businessName" defaultValue="Acme Corp" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dba">DBA (if applicable)</Label>
                  <Input id="dba" defaultValue="Acme" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="taxId">Tax ID / EIN</Label>
                  <Input id="taxId" defaultValue="12-3456789" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="businessType">Business Type</Label>
                  <Select defaultValue="corporation">
                    <SelectTrigger>
                      <SelectValue placeholder="Select business type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sole-prop">Sole Proprietorship</SelectItem>
                      <SelectItem value="llc">LLC</SelectItem>
                      <SelectItem value="corporation">Corporation</SelectItem>
                      <SelectItem value="partnership">Partnership</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="businessAddress">Business Address</Label>
                  <Input id="businessAddress" defaultValue="123 Business Ave, Suite 100" required />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" defaultValue="New York" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Input id="state" defaultValue="NY" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zipCode">Zip Code</Label>
                    <Input id="zipCode" defaultValue="10001" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="yearsInBusiness">Years in Business</Label>
                  <Input id="yearsInBusiness" type="number" defaultValue="5" min="0" required />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="funding" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Funding Details</CardTitle>
                <CardDescription>Update the funding requirements</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fundingAmount">Requested Amount ($)</Label>
                  <Input id="fundingAmount" type="number" defaultValue="75000" min="5000" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fundingPurpose">Purpose of Funding</Label>
                  <Select defaultValue="expansion">
                    <SelectTrigger>
                      <SelectValue placeholder="Select purpose" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="working-capital">Working Capital</SelectItem>
                      <SelectItem value="equipment">Equipment Purchase</SelectItem>
                      <SelectItem value="expansion">Business Expansion</SelectItem>
                      <SelectItem value="inventory">Inventory</SelectItem>
                      <SelectItem value="debt-consolidation">Debt Consolidation</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fundingDetails">Additional Details</Label>
                  <Textarea
                    id="fundingDetails"
                    defaultValue="Client is expanding their operations to a new location and needs funding for equipment and initial inventory."
                    className="min-h-[100px]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="monthlyRevenue">Average Monthly Revenue ($)</Label>
                  <Input id="monthlyRevenue" type="number" defaultValue="125000" min="0" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="creditScore">Business Owner's Credit Score (estimated)</Label>
                  <Select defaultValue="excellent">
                    <SelectTrigger>
                      <SelectValue placeholder="Select credit range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="excellent">Excellent (720+)</SelectItem>
                      <SelectItem value="good">Good (680-719)</SelectItem>
                      <SelectItem value="fair">Fair (620-679)</SelectItem>
                      <SelectItem value="poor">Poor (580-619)</SelectItem>
                      <SelectItem value="bad">Bad (Below 580)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>Update the primary contact details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" defaultValue="John" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" defaultValue="Doe" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="title">Title / Position</Label>
                  <Input id="title" defaultValue="CEO" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="john.doe@acme.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" defaultValue="(555) 123-4567" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="alternatePhone">Alternate Phone (optional)</Label>
                  <Input id="alternatePhone" type="tel" defaultValue="(555) 987-6543" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bestTimeToContact">Best Time to Contact</Label>
                  <Select defaultValue="morning">
                    <SelectTrigger>
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="morning">Morning (9am-12pm)</SelectItem>
                      <SelectItem value="afternoon">Afternoon (12pm-5pm)</SelectItem>
                      <SelectItem value="evening">Evening (5pm-8pm)</SelectItem>
                      <SelectItem value="anytime">Anytime</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-6 flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => router.push("/dashboard/applications")}>
            Cancel
          </Button>
          <Button type="submit" className="bg-brand-button text-black hover:bg-brand-button/90 rounded-brand">
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  )
}

