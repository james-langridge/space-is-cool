import React from 'react'

import AccordionSearchForm from '@/app/(with-header-footer)/search/ui/accordion-search-form'
import {DateScrollToolbar} from '@/app/(with-header-footer)/search/ui/date-scroll-toolbar'
import SearchForm from '@/app/(with-header-footer)/search/ui/search-form'
import Container from '@/app/ui/container'
import {Separator} from '@/app/ui/separator'

export default function Layout({children}: {children: React.ReactNode}) {
  return (
    <Container>
      <AccordionSearchForm>
        <SearchForm />
      </AccordionSearchForm>
      <DateScrollToolbar className="pb-4 sm:py-4" />
      <Separator className="my-4" />
      {children}
    </Container>
  )
}
