import './globals.css'
import React from 'react'

import Footer from '@/components/Footer'

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
          <Providers>{children}</Providers>
          <Footer />
        </div>
      </body>
    </html>
  )
}
