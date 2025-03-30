"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle } from "lucide-react"

export default function AccountPage() {
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-vectora-bold tracking-tight">Account</h2>
        <p className="text-muted-foreground font-vectora-roman">Manage your account settings and preferences</p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="company">Company</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your personal details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" defaultValue="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" defaultValue="Smith" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="john.smith@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" defaultValue="(555) 123-4567" />
              </div>
              <div className="flex justify-end">
                <Button
                  onClick={handleSave}
                  className="bg-brand-button text-black hover:bg-brand-button/90 rounded-brand"
                >
                  {saved ? (
                    <>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Saved
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Manage how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="emailNotifications"
                  defaultChecked
                  className="h-4 w-4 rounded border-gray-300"
                />
                <Label htmlFor="emailNotifications">Email Notifications</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="smsNotifications"
                  defaultChecked
                  className="h-4 w-4 rounded border-gray-300"
                />
                <Label htmlFor="smsNotifications">SMS Notifications</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="applicationUpdates"
                  defaultChecked
                  className="h-4 w-4 rounded border-gray-300"
                />
                <Label htmlFor="applicationUpdates">Application Updates</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="commissionAlerts"
                  defaultChecked
                  className="h-4 w-4 rounded border-gray-300"
                />
                <Label htmlFor="commissionAlerts">Commission Alerts</Label>
              </div>
              <div className="flex justify-end">
                <Button
                  onClick={handleSave}
                  className="bg-brand-button text-black hover:bg-brand-button/90 rounded-brand"
                >
                  {saved ? (
                    <>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Saved
                    </>
                  ) : (
                    "Save Preferences"
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="company" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Company Information</CardTitle>
              <CardDescription>Update your company details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name</Label>
                <Input id="companyName" defaultValue="Smith Financial Services" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input id="website" type="url" defaultValue="https://smithfinancial.example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" defaultValue="123 Business Ave, Suite 500" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" defaultValue="New York" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input id="state" defaultValue="NY" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zipCode">Zip Code</Label>
                  <Input id="zipCode" defaultValue="10001" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="taxId">Tax ID / EIN</Label>
                <Input id="taxId" defaultValue="12-3456789" />
              </div>
              <div className="flex justify-end">
                <Button
                  onClick={handleSave}
                  className="bg-brand-button text-black hover:bg-brand-button/90 rounded-brand"
                >
                  {saved ? (
                    <>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Saved
                    </>
                  ) : (
                    "Save Company Info"
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Payment Information</CardTitle>
              <CardDescription>Manage your payment methods and preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="paymentMethod">Default Payment Method</Label>
                <select id="paymentMethod" className="w-full rounded-md border border-input bg-background px-3 py-2">
                  <option>Direct Deposit (ACH)</option>
                  <option>Check</option>
                  <option>Wire Transfer</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bankName">Bank Name</Label>
                <Input id="bankName" defaultValue="First National Bank" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="accountNumber">Account Number</Label>
                  <Input id="accountNumber" defaultValue="•••• •••• 4567" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="routingNumber">Routing Number</Label>
                  <Input id="routingNumber" defaultValue="•••• •••• 8901" type="password" />
                </div>
              </div>
              <div className="flex justify-end">
                <Button
                  onClick={handleSave}
                  className="bg-brand-button text-black hover:bg-brand-button/90 rounded-brand"
                >
                  {saved ? (
                    <>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Saved
                    </>
                  ) : (
                    "Save Payment Info"
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Commission History</CardTitle>
              <CardDescription>View your recent commission payments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-4 text-sm font-medium text-muted-foreground">
                  <div>Date</div>
                  <div>Client</div>
                  <div>Amount</div>
                  <div>Status</div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4 text-sm border-b pb-2">
                  <div>Mar 15, 2025</div>
                  <div>Acme Corp</div>
                  <div>$2,250.00</div>
                  <div className="text-green-600">Paid</div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4 text-sm border-b pb-2">
                  <div>Feb 28, 2025</div>
                  <div>Globex Inc</div>
                  <div>$1,875.00</div>
                  <div className="text-green-600">Paid</div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4 text-sm border-b pb-2">
                  <div>Feb 15, 2025</div>
                  <div>Wayne Enterprises</div>
                  <div>$3,500.00</div>
                  <div className="text-green-600">Paid</div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4 text-sm border-b pb-2">
                  <div>Jan 30, 2025</div>
                  <div>Stark Industries</div>
                  <div>$1,250.00</div>
                  <div className="text-green-600">Paid</div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4 text-sm">
                  <div>Jan 15, 2025</div>
                  <div>Umbrella Corp</div>
                  <div>$2,125.00</div>
                  <div className="text-green-600">Paid</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Voided Check</CardTitle>
              <CardDescription>Upload a voided check for direct deposit payments</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="h-20 w-32 rounded-md bg-gray-100 flex items-center justify-center">
                  <span className="text-gray-500">Check Image</span>
                </div>
                <Button variant="outline">Upload Voided Check</Button>
              </div>
              <p className="text-sm text-muted-foreground">
                Please upload a clear image of a voided check for account verification.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>Update your password</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input id="currentPassword" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input id="newPassword" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input id="confirmPassword" type="password" />
              </div>
              <div className="flex justify-end">
                <Button
                  onClick={handleSave}
                  className="bg-brand-button text-black hover:bg-brand-button/90 rounded-brand"
                >
                  {saved ? (
                    <>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Saved
                    </>
                  ) : (
                    "Update Password"
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Two-Factor Authentication</CardTitle>
              <CardDescription>Enhance your account security</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Two-Factor Authentication</h4>
                  <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                </div>
                <Button variant="outline">Enable</Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Recovery Codes</h4>
                  <p className="text-sm text-muted-foreground">Generate backup codes for account recovery</p>
                </div>
                <Button variant="outline">Generate</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

