import React from 'react'

import Container from '@/app/ui/container'
import {Separator} from '@/app/ui/separator'

export default function Layout({children}: {children: React.ReactNode}) {
  return (
    <Container>
      <Separator className="my-4" />
      {children}
    </Container>
  )
}
