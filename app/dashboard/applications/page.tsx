"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function NewApplicationPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    legal_business_name: "",
    doing_business_as: "",
    business_address: "",
    city: "",
    state: "",
    zip_code: "",
    inception_date: "",
    federal_tax_id: "",
    state_of_incorporation: "",
    amount_requested: "",
    monthly_revenue: "",
    annual_revenue: "",
    use_of_funds: "",
    timeframe_to_fund: "",
    credit_score: "",
    existing_funding: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    email_address: "",
    home_address: "",
    home_city: "",
    home_state: "",
    home_zip_code: "",
    date_of_birth: "",
    social_security: "",
    ownership_percentage: "",
  })

  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError || !user) {
      setError("Unable to get user. Please log in again.")
      setIsLoading(false)
      return
    }

    const { error: insertError } = await supabase.from("applications").insert([
      {
        ...formData,
        submitted_by: user.id,
      },
    ])

    if (insertError) {
      setError(insertError.message)
    } else {
      router.push("/applications")
    }

    setIsLoading(false)
  }

  return (
    <div className="flex justify-center p-8">
      <Card className="w-full max-w-3xl">
        <CardHeader>
          <CardTitle className="text-2xl font-vectora-bold">New Application</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.keys(formData).map((key) => (
              <div key={key}>
                <Label htmlFor={key}>{key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}</Label>
                <Input
                  id={key}
                  name={key}
                  value={(formData as any)[key]}
                  onChange={handleChange}
                  required
                />
              </div>
            ))}
          </CardContent>
          <CardFooter className="justify-end">
            <Button
              type="submit"
              className="bg-brand-button text-black hover:bg-brand-button/90 rounded-brand"
              disabled={isLoading}
            >
              {isLoading ? "Submitting..." : "Submit Application"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
