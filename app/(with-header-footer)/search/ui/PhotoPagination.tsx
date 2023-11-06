'use client'

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from '@radix-ui/react-icons'
import {useRouter} from 'next/navigation'
import {useEffect, useState} from 'react'

import {Button} from '@/app/ui/Button'
import {CameraName, RoverName} from '@/types/APIResponseTypes'

function getNumPages(n: number): number {
  const quotient = Math.floor(n / 25)
  const remainder = n % 25

  return remainder === 0 ? quotient : quotient + 1
}

export function PhotoPagination({
  totalPhotos,
  params,
  searchParams,
}: {
  totalPhotos: number
  params: {rover: RoverName; date: string; camera?: CameraName}
  searchParams: {page: string}
}) {
  const [isPending, setIsPending] = useState(false)
  const totalPages = getNumPages(totalPhotos)
  const {rover, date, camera} = params
  const {page} = searchParams
  const prevPage = +page - 1
  const nextPage = +page + 1
  const router = useRouter()

  useEffect(() => {
    setIsPending(false)
  }, [page])

  return (
    <div className="flex items-center justify-between px-2">
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {page} of {totalPages}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => {
              setIsPending(true)
              router.push(`/search/${rover}/${date}/${camera || ''}?page=1`)
            }}
            disabled={page === '1' || isPending}
          >
            <span className="sr-only">Go to first page</span>
            <DoubleArrowLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => {
              setIsPending(true)
              router.push(
                `/search/${rover}/${date}/${camera || ''}?page=${prevPage}`,
              )
            }}
            disabled={page === '1' || isPending}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => {
              setIsPending(true)
              router.push(
                `/search/${rover}/${date}/${camera || ''}?page=${nextPage}`,
              )
            }}
            disabled={+page === totalPages || isPending}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => {
              setIsPending(true)
              router.push(
                `/search/${rover}/${date}/${camera || ''}?page=${totalPages}`,
              )
            }}
            disabled={+page === totalPages || isPending}
          >
            <span className="sr-only">Go to last page</span>
            <DoubleArrowRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
