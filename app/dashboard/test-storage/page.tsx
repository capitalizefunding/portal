"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function TestLocalStoragePage() {
  const [key, setKey] = useState("testKey")
  const [value, setValue] = useState("testValue")
  const [savedItems, setSavedItems] = useState([])
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  // Load all localStorage items on mount
  useEffect(() => {
    refreshStoredItems()
  }, [])

  const refreshStoredItems = () => {
    try {
      const items = []
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        const value = localStorage.getItem(key)
        items.push({ key, value })
      }
      setSavedItems(items)
    } catch (err) {
      setError(`Error reading localStorage: ${err.message}`)
    }
  }

  const handleSave = () => {
    try {
      localStorage.setItem(key, value)
      setSuccess(`Successfully saved "${key}" to localStorage`)
      refreshStoredItems()
    } catch (err) {
      setError(`Error saving to localStorage: ${err.message}`)
    }
  }

  const handleClear = () => {
    try {
      localStorage.clear()
      setSuccess("Successfully cleared localStorage")
      refreshStoredItems()
    } catch (err) {
      setError(`Error clearing localStorage: ${err.message}`)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-vectora-bold tracking-tight">Test localStorage</h2>
        <p className="text-muted-foreground font-vectora-roman">
          This page tests if localStorage is working properly in your browser
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Save to localStorage</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="key">Key</Label>
            <Input id="key" value={key} onChange={(e) => setKey(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="value">Value</Label>
            <Input id="value" value={value} onChange={(e) => setValue(e.target.value)} />
          </div>
          <div className="flex gap-4">
            <Button onClick={handleSave}>Save Item</Button>
            <Button variant="outline" onClick={handleClear}>
              Clear All
            </Button>
          </div>

          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">{success}</p>}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Current localStorage Items</CardTitle>
        </CardHeader>
        <CardContent>
          {savedItems.length === 0 ? (
            <p>No items in localStorage</p>
          ) : (
            <div className="space-y-2">
              {savedItems.map((item, index) => (
                <div key={index} className="border p-2 rounded">
                  <p>
                    <strong>Key:</strong> {item.key}
                  </p>
                  <p>
                    <strong>Value:</strong> <span className="font-mono text-xs break-all">{item.value}</span>
                  </p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Browser Information</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            <strong>User Agent:</strong> {typeof window !== "undefined" ? window.navigator.userAgent : "Not available"}
          </p>
          <p>
            <strong>localStorage Available:</strong>{" "}
            {typeof window !== "undefined" && window.localStorage ? "Yes" : "No"}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

