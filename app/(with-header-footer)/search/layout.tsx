import React from 'react'

import AccordionSearchForm from '@/app/(with-header-footer)/search/ui/accordion-search-form'
import SearchForm from '@/app/(with-header-footer)/search/ui/search-form'
import Container from '@/app/ui/container'
import {Separator} from '@/app/ui/separator'

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <Container>
      <AccordionSearchForm>
        <SearchForm />
      </AccordionSearchForm>
      <Separator className="my-4" />
      {children}
    </Container>
  )
}
