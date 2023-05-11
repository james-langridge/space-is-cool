'use client'

import Link from 'next/link'
import {usePathname} from 'next/navigation'
import React from 'react'

import {classNames} from '@/lib/misc'

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
            className={classNames(
              'px-4 py-2 text-sm font-medium text-gray-600 transition-colors duration-200 sm:text-base sm:px-6  dark:text-gray-300',
              pathname === '/latest-photos'
                ? 'bg-gray-200'
                : 'hover:bg-gray-100 dark:hover:bg-gray-800',
            )}
          >
            Latest
          </button>
        </Link>
        <Link href={'/search'}>
          <button
            title="Search Photos"
            className={classNames(
              'px-4 py-2 text-sm font-medium text-gray-600 transition-colors duration-200 sm:text-base sm:px-6  dark:text-gray-300',
              pathname === '/search'
                ? 'bg-gray-200'
                : 'hover:bg-gray-100 dark:hover:bg-gray-800',
            )}
          >
            Search
          </button>
        </Link>
        <Link href={'/favourites'}>
          <button
            title="Favourite Photos"
            className={classNames(
              'px-4 py-2 text-sm font-medium text-gray-600 transition-colors duration-200 sm:text-base sm:px-6  dark:text-gray-300',
              pathname === '/favourites'
                ? 'bg-gray-200'
                : 'hover:bg-gray-100 dark:hover:bg-gray-800',
            )}
          >
            Favourites
          </button>
        </Link>
        <Link href={'/manifests'}>
          <button
            title="Rover Mission Manifests"
            className={classNames(
              'px-4 py-2 text-sm font-medium text-gray-600 transition-colors duration-200 sm:text-base sm:px-6  dark:text-gray-300',
              pathname === '/manifests'
                ? 'bg-gray-200'
                : 'hover:bg-gray-100 dark:hover:bg-gray-800',
            )}
          >
            Manifests
          </button>
        </Link>
      </div>
    </footer>
  )
}
