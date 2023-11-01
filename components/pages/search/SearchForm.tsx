'use client'

import {zodResolver} from '@hookform/resolvers/zod'
import {format, parse} from 'date-fns'
import {CalendarIcon, XSquareIcon} from 'lucide-react'
import {usePathname, useRouter} from 'next/navigation'
import React, {useState} from 'react'
import {useForm} from 'react-hook-form'
import * as z from 'zod'

import {Calendar} from '@/components/Calendar'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/Form'
import {Popover, PopoverTrigger, PopoverContent} from '@/components/Popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/Select'
import {Button} from '@/components/shared/Button'
import {cn} from '@/lib/utils'
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
    earth_date: z.date().optional(),
    camera: z.enum(allCameraNames).optional(),
  })
  .refine(data => !(data.camera && !data.earth_date), {
    message: 'Date is required when camera is selected',
    path: ['earth_date'],
  })

export default function SearchForm() {
  const pathname = usePathname()
  const [popoverOpen, setPopoverOpen] = useState(false)
  const [, , roverPathname, datePathname, cameraPathname] = pathname.split('/')
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rover: roverPathname as RoverName,
      earth_date: datePathname
        ? parse(datePathname, 'yyyy-MM-dd', new Date())
        : undefined,
      camera: (cameraPathname as CameraName) || undefined,
    },
  })
  const rover = form.watch('rover')
  const cameras =
    rover === RoverName.Perseverance
      ? CameraNamePerseverance
      : rover === RoverName.Curiosity
      ? CameraNameCuriosity
      : CameraNameOpportunitySpirit

  function onSubmit(values: z.infer<typeof formSchema>) {
    const {rover, camera, earth_date} = values
    const date = earth_date ? format(earth_date, 'yyyy-MM-dd') : ''

    router.push(`/search/${rover}/${date}/${camera || ''}${date && '?page=1'}`)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="my-7 w-full max-w-prose px-7"
      >
        <div className="flex flex-row justify-between space-x-4">
          <div className="flex w-1/2 flex-col justify-between space-y-4">
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

            <Button type="submit">Search</Button>
          </div>

          <div className="flex w-1/2 flex-col justify-between space-y-4">
            <FormField
              control={form.control}
              name="earth_date"
              render={({field}) => (
                <FormItem className="flex flex-col">
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
                              format(field.value, 'PPP')
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <Button
                        onClick={() => form.setValue('earth_date', undefined)}
                        type="button"
                        variant={'ghost'}
                        size={'icon'}
                        className={cn(!field.value && 'text-muted-foreground')}
                      >
                        <XSquareIcon className="h-8 w-8 opacity-50" />
                      </Button>
                    </div>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        captionLayout="dropdown-buttons"
                        fromYear={2003}
                        toYear={2025}
                        defaultMonth={field.value}
                        mode="single"
                        selected={field.value}
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
                  <FormDescription>
                    View latest photos if no date is picked.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

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
        </div>
      </form>
    </Form>
  )
}
