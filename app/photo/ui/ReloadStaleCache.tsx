'use client'

import {useRouter} from 'next/navigation'
import React from 'react'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/app/photo/ui/Card'
import {Button} from '@/app/ui/button'
import {RoverName} from '@/types/APIResponseTypes'

export function ReloadStaleCache({rover}: {rover: RoverName}) {
  const router = useRouter()

  return (
    <div className="flex h-screen items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>Photos updated!</CardTitle>
          <CardDescription>New latest photos are available.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Please click below to reload.</p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button onClick={() => router.push(`/search/${rover}`)}>
            Reload
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
