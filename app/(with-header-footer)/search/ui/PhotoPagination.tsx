'use client'

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from '@radix-ui/react-icons'
import {useParams, useRouter, useSearchParams} from 'next/navigation'
import {useEffect, useState} from 'react'

import {cn} from '@/app/lib/utils'
import {Button} from '@/app/ui/button'
import {CameraName, RoverName} from '@/types/APIResponseTypes'

function getNumPages(n: number): number {
  const quotient = Math.floor(n / 25)
  const remainder = n % 25

  return remainder === 0 ? quotient : quotient + 1
}

export function PhotoPagination({
  className,
  totalPhotos,
}: {
  className?: string
  totalPhotos: number
}) {
  const router = useRouter()
  const params = useParams<{
    rover: RoverName
    date: string
    camera?: CameraName
  }>()
  const [isPending, setIsPending] = useState(false)
  const searchParams = useSearchParams()
  const page = searchParams.get('page')

  useEffect(() => {
    setIsPending(false)
  }, [page])

  if (!page) return null

  const totalPages = getNumPages(totalPhotos)
  const {rover, date, camera} = params
  const prevPage = +page - 1
  const nextPage = +page + 1

  return (
    <div className={cn('flex items-center justify-center px-2', className)}>
      <div className="flex items-center space-x-6 lg:space-x-8">
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

          <div className="flex w-[100px] items-center justify-center text-sm font-medium">
            Page {page} of {totalPages}
          </div>

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
