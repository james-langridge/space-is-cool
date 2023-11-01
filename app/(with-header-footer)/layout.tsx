import Link from 'next/link'
import React from 'react'

import Header from '@/app/ui/Header'
import NavFooter from '@/app/ui/NavFooter'

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <>
      <Link href="/">
        <Header string="SpaceI sCool" />
      </Link>
      {children}
      <NavFooter />
    </>
  )
}
