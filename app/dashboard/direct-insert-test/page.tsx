'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'

export default function DirectInsertTest() {
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleTestInsert = async () => {
    setIsLoading(true)
    setMessage('')

    try {
      const { data, error } = await supabase.from('applications').insert([
        {
          legalBusinessName: 'Test Business',
          amountRequested: '50000',
          status: 'pending',
          user_id: (await supabase.auth.getUser()).data.user?.id || '',
        },
      ])

      if (error) {
        throw error
      }

      setMessage('Insert successful!')
    } catch (err: any) {
      setMessage(err.message || 'Something went wrong.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Supabase Direct Insert Test</h1>
      <Button onClick={handleTestInsert} disabled={isLoading}>
        {isLoading ? 'Testing...' : 'Run Insert Test'}
      </Button>
      {message && <p className="mt-4 text-sm">{message}</p>}
    </div>
  )
}
