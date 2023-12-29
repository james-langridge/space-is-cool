import React from 'react'

import Container from '@/app/ui/container'

export default function Layout({children}: {children: React.ReactNode}) {
  return <Container>{children}</Container>
}
