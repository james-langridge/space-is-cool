import React from 'react'

import Container from '@/components/shared/Container'
import Header from '@/components/shared/Header'
export default function FavouritesRoute({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Container>
      <Header string="Favourite Photos" />
      {children}
    </Container>
  )
}
