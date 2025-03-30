"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle, Upload } from "lucide-react"

export default function NewApplicationPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  // Form state to persist data between tabs
  const [formData, setFormData] = useState({
    // Business Info
    legalBusinessName: "",
    dba: "",
    businessAddress: "",
    city: "",
    state: "",
    zipCode: "",
    federalTaxId: "",
    inceptionDate: "",
    stateIncorporated: "",

    // Funding Details
    amountRequested: "",
    timeframe: "",
    useOfFunds: "",
    monthlyRevenue: "",
    creditScore: "",
    existingFunding: "",

    // Owner Info
    ownerFirstName: "",
    ownerLastName: "",
    homeAddress: "",
    ownerCity: "",
    ownerState: "",
    ownerZipCode: "",
    dateOfBirth: "",
    socialSecurity: "",
    ownershipPercent: "",

    // Contact Info
    contactFirstName: "",
    contactLastName: "",
    email: "",
    phone: "",
  })

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }))
  }

  // Handle select changes
  const handleSelectChange = (id: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setSuccess(true)

      // Redirect after showing success message
      setTimeout(() => {
        router.push("/dashboard/applications")
      }, 2000)
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-vectora-bold tracking-tight">New Application</h2>
        <p className="text-muted-foreground font-vectora-roman">Submit a new funding application</p>
      </div>

      {success ? (
        <Card>
          <CardContent className="pt-6 flex flex-col items-center justify-center gap-4">
            <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-xl font-vectora-bold">Application Submitted</h3>
            <p className="text-center text-muted-foreground font-vectora-roman">
              Your application has been submitted successfully. You will be redirected to the applications page.
            </p>
          </CardContent>
        </Card>
      ) : (
        <form onSubmit={handleSubmit} className="font-vectora-roman">
          <style jsx global>{`
            .tab-active {
              background-color: #6AB235 !important;
              color: white !important;
            }
            
            input, textarea, select {
              font-family: "Vectora LT Std 55 Roman", sans-serif;
            }
            
            [data-state="active"][data-orientation="horizontal"] {
              background-color: #6AB235;
              color: white;
            }
          `}</style>

          <Tabs defaultValue="business" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="business">Business Info</TabsTrigger>
              <TabsTrigger value="funding">Funding Details</TabsTrigger>
              <TabsTrigger value="owner">Owner Info</TabsTrigger>
              <TabsTrigger value="contact">Contact Info</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
            </TabsList>

            <TabsContent value="business" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Business Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="legalBusinessName">Legal Business Name *</Label>
                      <Input
                        id="legalBusinessName"
                        required
                        className="font-vectora-roman"
                        value={formData.legalBusinessName}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dba">Doing Business As</Label>
                      <Input
                        id="dba"
                        className="font-vectora-roman"
                        value={formData.dba}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="businessAddress">Physical Business Address *</Label>
                    <Input
                      id="businessAddress"
                      required
                      className="font-vectora-roman"
                      value={formData.businessAddress}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        required
                        className="font-vectora-roman"
                        value={formData.city}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State *</Label>
                      <Input
                        id="state"
                        required
                        className="font-vectora-roman"
                        value={formData.state}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zipCode">Zip Code *</Label>
                      <Input
                        id="zipCode"
                        required
                        className="font-vectora-roman"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="federalTaxId">Federal Tax ID *</Label>
                      <Input
                        id="federalTaxId"
                        placeholder="XX-XXXXXXX"
                        required
                        className="font-vectora-roman"
                        value={formData.federalTaxId}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="inceptionDate">Inception Date *</Label>
                      <Input
                        id="inceptionDate"
                        type="date"
                        required
                        className="font-vectora-roman"
                        value={formData.inceptionDate}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="stateIncorporated">State Incorporated *</Label>
                      <Select
                        value={formData.stateIncorporated}
                        onValueChange={(value) => handleSelectChange("stateIncorporated", value)}
                      >
                        <SelectTrigger className="font-vectora-roman">
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent className="font-vectora-roman">
                          <SelectItem value="AL">Alabama</SelectItem>
                          <SelectItem value="AK">Alaska</SelectItem>
                          <SelectItem value="AZ">Arizona</SelectItem>
                          <SelectItem value="AR">Arkansas</SelectItem>
                          <SelectItem value="CA">California</SelectItem>
                          <SelectItem value="CO">Colorado</SelectItem>
                          <SelectItem value="CT">Connecticut</SelectItem>
                          <SelectItem value="DE">Delaware</SelectItem>
                          <SelectItem value="FL">Florida</SelectItem>
                          <SelectItem value="GA">Georgia</SelectItem>
                          <SelectItem value="HI">Hawaii</SelectItem>
                          <SelectItem value="ID">Idaho</SelectItem>
                          <SelectItem value="IL">Illinois</SelectItem>
                          <SelectItem value="IN">Indiana</SelectItem>
                          <SelectItem value="IA">Iowa</SelectItem>
                          <SelectItem value="KS">Kansas</SelectItem>
                          <SelectItem value="KY">Kentucky</SelectItem>
                          <SelectItem value="LA">Louisiana</SelectItem>
                          <SelectItem value="ME">Maine</SelectItem>
                          <SelectItem value="MD">Maryland</SelectItem>
                          <SelectItem value="MA">Massachusetts</SelectItem>
                          <SelectItem value="MI">Michigan</SelectItem>
                          <SelectItem value="MN">Minnesota</SelectItem>
                          <SelectItem value="MS">Mississippi</SelectItem>
                          <SelectItem value="MO">Missouri</SelectItem>
                          <SelectItem value="MT">Montana</SelectItem>
                          <SelectItem value="NE">Nebraska</SelectItem>
                          <SelectItem value="NV">Nevada</SelectItem>
                          <SelectItem value="NH">New Hampshire</SelectItem>
                          <SelectItem value="NJ">New Jersey</SelectItem>
                          <SelectItem value="NM">New Mexico</SelectItem>
                          <SelectItem value="NY">New York</SelectItem>
                          <SelectItem value="NC">North Carolina</SelectItem>
                          <SelectItem value="ND">North Dakota</SelectItem>
                          <SelectItem value="OH">Ohio</SelectItem>
                          <SelectItem value="OK">Oklahoma</SelectItem>
                          <SelectItem value="OR">Oregon</SelectItem>
                          <SelectItem value="PA">Pennsylvania</SelectItem>
                          <SelectItem value="RI">Rhode Island</SelectItem>
                          <SelectItem value="SC">South Carolina</SelectItem>
                          <SelectItem value="SD">South Dakota</SelectItem>
                          <SelectItem value="TN">Tennessee</SelectItem>
                          <SelectItem value="TX">Texas</SelectItem>
                          <SelectItem value="UT">Utah</SelectItem>
                          <SelectItem value="VT">Vermont</SelectItem>
                          <SelectItem value="VA">Virginia</SelectItem>
                          <SelectItem value="WA">Washington</SelectItem>
                          <SelectItem value="WV">West Virginia</SelectItem>
                          <SelectItem value="WI">Wisconsin</SelectItem>
                          <SelectItem value="WY">Wyoming</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="funding" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Funding Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="amountRequested">Amount Requested *</Label>
                      <Input
                        id="amountRequested"
                        type="number"
                        min="5000"
                        required
                        className="font-vectora-roman"
                        value={formData.amountRequested}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="timeframe">Timeframe for Funding *</Label>
                      <Select
                        value={formData.timeframe}
                        onValueChange={(value) => handleSelectChange("timeframe", value)}
                      >
                        <SelectTrigger className="font-vectora-roman">
                          <SelectValue placeholder="How quickly do you need the funds?" />
                        </SelectTrigger>
                        <SelectContent className="font-vectora-roman">
                          <SelectItem value="immediate">Immediately (1-3 days)</SelectItem>
                          <SelectItem value="soon">Soon (1-2 weeks)</SelectItem>
                          <SelectItem value="flexible">Flexible (2-4 weeks)</SelectItem>
                          <SelectItem value="planning">Planning Phase (1+ months)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="useOfFunds">Use of Funds *</Label>
                    <Textarea
                      id="useOfFunds"
                      placeholder="Briefly explain what funding will be used for."
                      className="min-h-[100px] font-vectora-roman"
                      required
                      value={formData.useOfFunds}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="monthlyRevenue">Monthly Revenue *</Label>
                      <Input
                        id="monthlyRevenue"
                        type="number"
                        min="0"
                        required
                        className="font-vectora-roman"
                        value={formData.monthlyRevenue}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="creditScore">Credit Score *</Label>
                      <Select
                        value={formData.creditScore}
                        onValueChange={(value) => handleSelectChange("creditScore", value)}
                      >
                        <SelectTrigger className="font-vectora-roman">
                          <SelectValue placeholder="Select credit range" />
                        </SelectTrigger>
                        <SelectContent className="font-vectora-roman">
                          <SelectItem value="excellent">Excellent (720+)</SelectItem>
                          <SelectItem value="good">Good (680-719)</SelectItem>
                          <SelectItem value="fair">Fair (620-679)</SelectItem>
                          <SelectItem value="poor">Poor (580-619)</SelectItem>
                          <SelectItem value="bad">Bad (Below 580)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="existingFunding">Existing Funding *</Label>
                      <Select
                        value={formData.existingFunding}
                        onValueChange={(value) => handleSelectChange("existingFunding", value)}
                      >
                        <SelectTrigger className="font-vectora-roman">
                          <SelectValue placeholder="Select option" />
                        </SelectTrigger>
                        <SelectContent className="font-vectora-roman">
                          <SelectItem value="none">None</SelectItem>
                          <SelectItem value="loan">Business Loan</SelectItem>
                          <SelectItem value="line">Line of Credit</SelectItem>
                          <SelectItem value="mca">Merchant Cash Advance</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="owner" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Ownership Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="ownerFirstName">First Name *</Label>
                      <Input
                        id="ownerFirstName"
                        required
                        className="font-vectora-roman"
                        value={formData.ownerFirstName}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="ownerLastName">Last Name *</Label>
                      <Input
                        id="ownerLastName"
                        required
                        className="font-vectora-roman"
                        value={formData.ownerLastName}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="homeAddress">Home Address *</Label>
                    <Input
                      id="homeAddress"
                      required
                      className="font-vectora-roman"
                      value={formData.homeAddress}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="ownerCity">City *</Label>
                      <Input
                        id="ownerCity"
                        required
                        className="font-vectora-roman"
                        value={formData.ownerCity}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="ownerState">State *</Label>
                      <Input
                        id="ownerState"
                        required
                        className="font-vectora-roman"
                        value={formData.ownerState}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="ownerZipCode">Zip Code *</Label>
                      <Input
                        id="ownerZipCode"
                        required
                        className="font-vectora-roman"
                        value={formData.ownerZipCode}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                      <Input
                        id="dateOfBirth"
                        type="date"
                        required
                        className="font-vectora-roman"
                        value={formData.dateOfBirth}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="socialSecurity">Social Security *</Label>
                      <Input
                        id="socialSecurity"
                        placeholder="XXX-XX-XXXX"
                        required
                        className="font-vectora-roman"
                        value={formData.socialSecurity}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="ownershipPercent">Ownership Percent *</Label>
                      <Input
                        id="ownershipPercent"
                        type="number"
                        min="0"
                        max="100"
                        required
                        className="font-vectora-roman"
                        value={formData.ownershipPercent}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="contact" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="contactFirstName">First Name *</Label>
                      <Input
                        id="contactFirstName"
                        required
                        className="font-vectora-roman"
                        value={formData.contactFirstName}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contactLastName">Last Name *</Label>
                      <Input
                        id="contactLastName"
                        required
                        className="font-vectora-roman"
                        value={formData.contactLastName}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        className="font-vectora-roman"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        required
                        className="font-vectora-roman"
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="documents" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Upload Documents</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="month1">Month 1 *</Label>
                      <Button variant="outline" className="w-full h-12 font-vectora-roman" type="button">
                        <Upload className="mr-2 h-4 w-4" />
                        Upload File
                      </Button>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="month2">Month 2 *</Label>
                      <Button variant="outline" className="w-full h-12 font-vectora-roman" type="button">
                        <Upload className="mr-2 h-4 w-4" />
                        Upload File
                      </Button>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="month3">Month 3 *</Label>
                      <Button variant="outline" className="w-full h-12 font-vectora-roman" type="button">
                        <Upload className="mr-2 h-4 w-4" />
                        Upload File
                      </Button>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="month4">Month 4 *</Label>
                      <Button variant="outline" className="w-full h-12 font-vectora-roman" type="button">
                        <Upload className="mr-2 h-4 w-4" />
                        Upload File
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Upload any additional documents, if applicable.</Label>
                    <Button variant="outline" className="w-full h-12 font-vectora-roman" type="button">
                      <Upload className="mr-2 h-4 w-4" />
                      Upload File
                    </Button>
                  </div>

                  <div className="pt-4">
                    <h3 className="text-base font-medium mb-4">
                      And for faster processing, upload your final funding stipulations below.
                    </h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="driversLicense">Drivers License</Label>
                        <Button variant="outline" className="w-full h-12 font-vectora-roman" type="button">
                          <Upload className="mr-2 h-4 w-4" />
                          Upload File
                        </Button>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="voidedCheck">Voided Check</Label>
                        <Button variant="outline" className="w-full h-12 font-vectora-roman" type="button">
                          <Upload className="mr-2 h-4 w-4" />
                          Upload File
                        </Button>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="proofOfOwnership">Proof of Ownership</Label>
                        <Button variant="outline" className="w-full h-12 font-vectora-roman" type="button">
                          <Upload className="mr-2 h-4 w-4" />
                          Upload File
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="mt-6 flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/dashboard/applications")}
              className="rounded-[28px] border-2 font-vectora-roman"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-brand-button text-black hover:bg-brand-button/90 rounded-brand font-vectora-roman"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </Button>
          </div>
        </form>
      )}
    </div>
  )
}

