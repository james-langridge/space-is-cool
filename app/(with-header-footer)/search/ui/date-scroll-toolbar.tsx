'use client'

import {ChevronLeftIcon, ChevronRightIcon} from '@radix-ui/react-icons'
import {format} from 'date-fns'
import {useParams, useRouter} from 'next/navigation'

import {cn} from '@/app/lib/utils'
import {Button} from '@/app/ui/button'
import {CameraName, RoverName} from '@/types/APIResponseTypes'

function getNewDate(dateString: string, days: number) {
  const date = new Date(dateString)
  date.setDate(date.getDate() + days)

  return date.toISOString().split('T')[0]
}

export function DateScrollToolbar({className}: {className?: string}) {
  const params = useParams<{
    rover: RoverName
    date: string
    camera?: CameraName
  }>()
  const {rover, date, camera} = params
  const router = useRouter()

  if (!date) return null

  // TODO disable buttons if min/max date for rover

  return (
    <div className={cn('flex items-center justify-center px-2', className)}>
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => {
              const newDate = getNewDate(date, -1)
              router.push(`/search/${rover}/${newDate}/${camera || ''}?page=1`)
            }}
          >
            <span className="sr-only">Go to previous day</span>
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>

          <div className="flex w-[100px] items-center justify-center text-sm font-medium">
            {format(new Date(date), 'd LLL yyyy')}
          </div>

          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => {
              const newDate = getNewDate(date, 1)
              router.push(`/search/${rover}/${newDate}/${camera || ''}?page=1`)
            }}
          >
            <span className="sr-only">Go to next day</span>
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
