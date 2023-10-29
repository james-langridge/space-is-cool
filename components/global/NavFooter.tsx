'use client'

import clsx from 'clsx'
import Link from 'next/link'
import {usePathname} from 'next/navigation'
import React from 'react'

export default function NavFooter() {
  const pathname = usePathname()

  if (pathname.startsWith('/photo')) {
    return null
  }

  return (
    <footer className="sticky bottom-0 left-0 flex w-full justify-center p-4">
      <div className="flex max-w-min justify-center divide-x overflow-hidden rounded-lg border bg-white rtl:flex-row-reverse dark:divide-gray-700 dark:border-gray-700 dark:bg-gray-900">
        <Link href={'/search'}>
          <button
            title="Search Photos"
            className={clsx(
              'px-4 py-2 text-sm font-medium text-gray-600 transition-colors duration-200 dark:text-gray-300 sm:px-6 sm:text-base',
              {
                'bg-gray-200 dark:bg-gray-500': pathname === '/',
                'hover:bg-gray-100 dark:hover:bg-gray-800': pathname !== '/',
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
              'px-4 py-2 text-sm font-medium text-gray-600 transition-colors duration-200 dark:text-gray-300 sm:px-6 sm:text-base',
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
              'px-4 py-2 text-sm font-medium text-gray-600 transition-colors duration-200 dark:text-gray-300 sm:px-6 sm:text-base',
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
