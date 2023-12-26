import React from 'react'

import SearchForm from '@/app/(with-header-footer)/search/ui/SearchForm'
import Container from '@/app/ui/container'
import {Separator} from '@/app/ui/separator'

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <Container>
      <div className="flex justify-center">
        <SearchForm />
      </div>
      <Separator className="my-4" />
      {children}
    </Container>
  )
}
