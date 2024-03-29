'use client'

import {zodResolver} from '@hookform/resolvers/zod'
import {format} from 'date-fns'
import {CalendarIcon, XSquareIcon, Loader2} from 'lucide-react'
import {useParams, useRouter} from 'next/navigation'
import React, {useEffect, useState} from 'react'
import {useForm} from 'react-hook-form'
import * as z from 'zod'

import {Calendar} from '@/app/(with-header-footer)/search/ui/Calendar'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/app/(with-header-footer)/search/ui/Form'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/app/(with-header-footer)/search/ui/Popover'
import {
  cn,
  validateCameraName,
  validateDate,
  validateRoverName,
} from '@/app/lib/utils'
import {Button} from '@/app/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/ui/select'
import {
  allCameraNames,
  CameraName,
  CameraNameCuriosity,
  CameraNameOpportunitySpirit,
  CameraNamePerseverance,
  RoverName,
} from '@/types/APIResponseTypes'

const formSchema = z
  .object({
    rover: z.enum([
      RoverName.Curiosity,
      RoverName.Opportunity,
      RoverName.Perseverance,
      RoverName.Spirit,
    ]),
    earth_date: z.date().nullable().optional(),
    camera: z.enum(allCameraNames).optional(),
  })
  .refine(data => !(data.camera && !data.earth_date), {
    message: 'Date is required when camera is selected',
    path: ['earth_date'],
  })

export default function SearchForm() {
  const [isPending, setIsPending] = useState(false)
  const [popoverOpen, setPopoverOpen] = useState(false)
  const params = useParams<{
    rover: RoverName
    date: string
    camera?: CameraName
  }>()
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rover: validateRoverName(params.rover),
      earth_date: validateDate(params.date),
      camera: validateCameraName(params.camera || ''),
    },
  })
  const rover = form.watch('rover')
  const cameras =
    rover === RoverName.Perseverance
      ? CameraNamePerseverance
      : rover === RoverName.Curiosity
      ? CameraNameCuriosity
      : CameraNameOpportunitySpirit

  function isSameSearch(values: z.infer<typeof formSchema>) {
    const {rover, camera, earth_date} = values
    const date = earth_date ? format(earth_date, 'yyyy-MM-dd') : undefined

    return (
      camera === params.camera && rover === params.rover && date === params.date
    )
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (!isSameSearch(values)) {
      setIsPending(true)
    }

    const {rover, camera, earth_date} = values
    const date = earth_date ? format(earth_date, 'yyyy-MM-dd') : ''

    router.push(`/search/${rover}/${date}/${camera || ''}${date && '?page=1'}`)
  }

  useEffect(() => {
    setIsPending(false)
  }, [params])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-7 w-full p-2">
        <div className="flex flex-wrap items-start justify-center gap-10 sm:items-start sm:justify-evenly">
          <div className="w-[150px]">
            <FormField
              control={form.control}
              name="rover"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Rover</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a rover" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.values(RoverName).map(rover => (
                        <SelectItem key={rover} value={rover}>
                          {rover}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="w-[150px]">
            <FormField
              control={form.control}
              name="earth_date"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Date</FormLabel>
                  <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                    <div className="flex flex-row items-center">
                      <PopoverTrigger asChild className="flex-1">
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground',
                            )}
                          >
                            {field.value ? (
                              format(field.value, 'd LLL yyyy')
                            ) : (
                              <span>Pick a date</span>
                            )}
                            {field.value ? (
                              <Button
                                onClick={e => {
                                  e.stopPropagation()
                                  form.setValue('earth_date', null)
                                }}
                                type="button"
                                variant={'ghost'}
                                size={'icon'}
                                className={cn(
                                  !field.value && 'text-muted-foreground',
                                  'ml-auto h-4 w-4',
                                )}
                              >
                                <XSquareIcon className="opacity-50" />
                              </Button>
                            ) : (
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            )}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                    </div>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        captionLayout="dropdown-buttons"
                        fromYear={2003}
                        toYear={2025}
                        defaultMonth={
                          field.value !== null ? field.value : undefined
                        }
                        mode="single"
                        selected={
                          field.value !== null ? field.value : undefined
                        }
                        onSelect={date => {
                          field.onChange(date)
                          setPopoverOpen(false)
                        }}
                        disabled={date =>
                          date > new Date() || date < new Date('1900-01-01')
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="w-[150px]">
            <FormField
              control={form.control}
              name="camera"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Camera</FormLabel>
                  <Select
                    onValueChange={value => {
                      if (value === 'any') {
                        field.onChange(undefined)
                      } else {
                        field.onChange(value)
                      }
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a camera" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="any">Any</SelectItem>
                      {cameras.map(camera => (
                        <SelectItem key={camera} value={camera}>
                          {camera}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="w-[150px] self-end">
            <Button type="submit" disabled={isPending} className="w-full">
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                </>
              ) : (
                'Search'
              )}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  )
}
