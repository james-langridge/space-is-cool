import React from 'react'

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/app/photo/ui/Card'
import {Button} from '@/app/ui/button'

export function ErrorPage({
  error,
  reset,
}: {
  error: Error & {digest?: string}
  reset: () => void
}) {
  return (
    <div className="flex justify-center">
      <Card>
        <CardHeader>
          <CardTitle>Something went wrong!</CardTitle>
        </CardHeader>
        {error.message && (
          <CardContent>
            <p>{error.message}</p>
          </CardContent>
        )}
        <CardFooter className="flex justify-center">
          <Button onClick={() => reset()}>Try again</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
