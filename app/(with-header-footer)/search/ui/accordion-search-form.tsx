'use client'

import React, {useState} from 'react'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/app/ui/accordion'

export default function AccordionSearchForm({
  children,
}: {
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(false)

  const string = open ? 'Hide search form' : 'Show search form'

  return (
    <Accordion type="single" collapsible className="p-4">
      <AccordionItem value="search-form" className="flex flex-col items-center">
        <AccordionTrigger onClick={() => setOpen(!open)}>
          {string}
        </AccordionTrigger>
        <AccordionContent>{children}</AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
