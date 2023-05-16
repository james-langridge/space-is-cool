'use client'

import clsx from 'clsx'
import Link from 'next/link'
import {usePathname} from 'next/navigation'
import React from 'react'

export default function Footer() {
  const pathname = usePathname()

  if (pathname.startsWith('/photo')) {
    return null
  }

  return (
    <footer className="fixed bottom-0 left-0 p-4 w-full flex justify-center">
      <div className="flex max-w-min justify-center overflow-hidden bg-white border divide-x rounded-lg rtl:flex-row-reverse dark:bg-gray-900 dark:border-gray-700 dark:divide-gray-700">
        <Link href={'/latest-photos'}>
          <button
            title="Latest Photos"
            className={clsx(
              'px-4 py-2 text-sm font-medium text-gray-600 transition-colors duration-200 sm:text-base sm:px-6 dark:text-gray-300',
              {
                'bg-gray-200 dark:bg-gray-500': pathname === '/latest-photos',
                'hover:bg-gray-100 dark:hover:bg-gray-800':
                  pathname !== '/latest-photos',
              },
            )}
          >
            Latest
          </button>
        </Link>
        <Link href={'/search'}>
          <button
            title="Search Photos"
            className={clsx(
              'px-4 py-2 text-sm font-medium text-gray-600 transition-colors duration-200 sm:text-base sm:px-6 dark:text-gray-300',
              {
                'bg-gray-200 dark:bg-gray-500': pathname === '/search',
                'hover:bg-gray-100 dark:hover:bg-gray-800':
                  pathname !== '/search',
              },
            )}
          >
            Search
          </button>
        </Link>
        <Link href={'/favourites'}>
          <button
            title="Favourite Photos"
            className={clsx(
              'px-4 py-2 text-sm font-medium text-gray-600 transition-colors duration-200 sm:text-base sm:px-6 dark:text-gray-300',
              {
                'bg-gray-200 dark:bg-gray-500': pathname === '/favourites',
                'hover:bg-gray-100 dark:hover:bg-gray-800':
                  pathname !== '/favourites',
              },
            )}
          >
            Favourites
          </button>
        </Link>
        <Link href={'/manifests'}>
          <button
            title="Rover Mission Manifests"
            className={clsx(
              'px-4 py-2 text-sm font-medium text-gray-600 transition-colors duration-200 sm:text-base sm:px-6 dark:text-gray-300',
              {
                'bg-gray-200 dark:bg-gray-500': pathname === '/manifests',
                'hover:bg-gray-100 dark:hover:bg-gray-800':
                  pathname !== '/manifests',
              },
            )}
          >
            Manifests
          </button>
        </Link>
      </div>
    </footer>
  )
}
