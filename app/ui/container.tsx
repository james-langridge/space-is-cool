import React from 'react'

import {cn} from '@/app/lib/utils'

export default function Container({
  children,
  padding = 166,
  className,
}: {
  children: React.ReactNode
  padding?: number
  className?: string
}) {
  return (
    <main
      className={cn('relative w-full', className)}
      style={{minHeight: `calc(100vh - ${padding}px)`}}
    >
      {children}
    </main>
  )
}
