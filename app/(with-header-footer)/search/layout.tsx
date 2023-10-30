import React from 'react'

import Container from '@/components/global/Container'
import SearchForm from '@/components/global/SearchForm'

import Providers from '../../providers'

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <Container padding={166}>
      <Providers>
        <SearchForm />
      </Providers>
      {children}
    </Container>
  )
}
