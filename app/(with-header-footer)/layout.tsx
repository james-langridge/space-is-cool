import Link from 'next/link'
import React from 'react'

import Header from '@/components/global/Header'
import NavFooter from '@/components/global/NavFooter'

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
