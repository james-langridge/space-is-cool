import React from 'react'

import Container from '@/components/shared/Container'
import Header from '@/components/shared/Header'

export default function ManifestsRoute({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Container>
      <Header string="Mission Manifests" />
      {children}
    </Container>
  )
}
