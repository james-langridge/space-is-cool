import Link from 'next/link'
import React from 'react'

import Container from '@/components/shared/Container'
import Header from '@/components/shared/Header'
import {RoverName} from '@/types/APIResponseTypes'

export const metadata = {
  title: 'Space Is Cool [sic]',
  description: 'A Cool [sic] UI to view NASA Mars Rover images.',
}

export default function LatestPhotosLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Container>
      <Header string="Latest Photos" />
      <div className="flex w-full justify-center pt-4 sm:px-4 sm:pb-0">
        <div className="flex max-w-min justify-center divide-x overflow-hidden rounded-lg border rtl:flex-row-reverse dark:divide-gray-700 dark:border-gray-700 dark:bg-gray-900">
          {Object.values(RoverName).map(rover => (
            <Link key={rover} href={`/latest-photos/${rover}`}>
              <button
                className={
                  'px-2.5 py-2 text-sm font-medium text-gray-600 transition-colors duration-200 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 sm:px-6 sm:text-base'
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
