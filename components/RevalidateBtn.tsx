'use client'

import React from 'react'

import revalidate from '@/app/actions'
import {Button} from '@/components/shared/Button'
import {RoverName} from '@/types/APIResponseTypes'

export default function RevalidateBtn({
  children,
  rover,
}: {
  children: React.ReactNode
  rover: RoverName
}) {
  return (
    <Button
      // TODO: the route has already been revalidated, so just reload the route?
      onClick={() => revalidate(rover)}
    >
      {children}
    </Button>
  )
}
