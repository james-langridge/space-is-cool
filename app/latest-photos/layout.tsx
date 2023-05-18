import Link from 'next/link'
import React from 'react'

import Container from '@/components/Container'
import Header from '@/components/Header'
import {RoverName} from '@/types/APIResponseTypes'

export const metadata = {
  title: 'Space Is Cool [sic]',
  description: 'A Cool [sic] UI to view NASA Mars Rover images.',
}

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <Container>
      <Header string="Latest Photos" />
      <div className="pt-4 sm:px-4 sm:pb-0 w-full flex justify-center">
        <div className="flex max-w-min justify-center overflow-hidden border divide-x rounded-lg rtl:flex-row-reverse dark:bg-gray-900 dark:border-gray-700 dark:divide-gray-700">
          {Object.values(RoverName).map(rover => (
            <Link key={rover} href={`/latest-photos/${rover}`}>
              <button
                className={
                  'px-2.5 py-2 text-sm font-medium text-gray-600 transition-colors duration-200 sm:text-base sm:px-6 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }
              >
                {rover}
              </button>
            </Link>
          ))}
        </div>
      </div>
      {children}
    </Container>
  )
}
