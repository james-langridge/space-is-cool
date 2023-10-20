import React from 'react'

import ButtonRovers from '@/components/pages/search/ButtonRovers'
import Container from '@/components/shared/Container'
import Header from '@/components/shared/Header'

export default function SearchLayout({children}: {children: React.ReactNode}) {
  return (
    <Container>
      <Header string="Search Photos" />
      <ButtonRovers />
      {children}
    </Container>
  )
}
