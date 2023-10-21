import './globals.css'
import React from 'react'

import NavFooter from '@/components/global/NavFooter'
import SearchForm from '@/components/global/SearchForm'
import Container from '@/components/shared/Container'
import Header from '@/components/shared/Header'

import Providers from './providers'

export const metadata = {
  title: 'Space Is Cool [sic]',
  description: 'A Cool [sic] UI to view NASA Mars Rover images.',
}

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body>
        <div className="bg-white dark:invert">
          <Header string="SpaceI sCool" />
          <Providers>
            <SearchForm />
            <Container>{children}</Container>
          </Providers>
          <NavFooter />
        </div>
      </body>
    </html>
  )
}
