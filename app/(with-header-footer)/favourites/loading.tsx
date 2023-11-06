import React from 'react'

import PhotoGrid from '@/app/ui/PhotoGrid'
import {Skeleton} from '@/app/ui/Skeleton'

export default function Loading() {
  return (
    <PhotoGrid>
      <Skeleton className="h-24 w-auto sm:h-44 md:h-48 lg:h-64" />
      <Skeleton className="h-24 w-auto sm:h-44 md:h-48 lg:h-64" />
      <Skeleton className="h-24 w-auto sm:h-44 md:h-48 lg:h-64" />
      <Skeleton className="h-24 w-auto sm:h-44 md:h-48 lg:h-64" />
      <Skeleton className="h-24 w-auto sm:h-44 md:h-48 lg:h-64" />
      <Skeleton className="h-24 w-auto sm:h-44 md:h-48 lg:h-64" />

      <Skeleton className="h-24 w-auto sm:h-44 md:h-48 lg:h-64" />
      <Skeleton className="h-24 w-auto sm:h-44 md:h-48 lg:h-64" />
      <Skeleton className="h-24 w-auto sm:h-44 md:h-48 lg:h-64" />
      <Skeleton className="h-24 w-auto sm:h-44 md:h-48 lg:h-64" />
      <Skeleton className="h-24 w-auto sm:h-44 md:h-48 lg:h-64" />
      <Skeleton className="h-24 w-auto sm:h-44 md:h-48 lg:h-64" />
    </PhotoGrid>
  )
}
