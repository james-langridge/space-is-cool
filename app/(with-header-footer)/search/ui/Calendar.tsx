'use client'

import {isSameMonth} from 'date-fns'
import {ChevronLeft, ChevronRight} from 'lucide-react'
import * as React from 'react'
import {MouseEventHandler} from 'react'
import {
  Button,
  DayPicker,
  CaptionProps,
  useNavigation,
  CaptionDropdowns,
  useDayPicker,
} from 'react-day-picker'

import {cn} from '@/app/lib/utils'
import {buttonVariants} from '@/app/ui/Button'
import 'react-day-picker/dist/style.css'

export type CalendarProps = React.ComponentProps<typeof DayPicker>

export function CustomCaption(props: CaptionProps) {
  const {
    classNames,
    numberOfMonths,
    styles,
    labels: {labelPrevious, labelNext},
    locale,
  } = useDayPicker()
  const {displayMonths, goToMonth, nextMonth, previousMonth} = useNavigation()

  const previousLabel = labelPrevious(previousMonth, {locale})
  const previousClassName = [
    classNames.nav_button,
    classNames.nav_button_previous,
  ].join(' ')

  const nextLabel = labelNext(nextMonth, {locale})
  const nextClassName = [
    classNames.nav_button,
    classNames.nav_button_next,
  ].join(' ')

  const displayIndex = displayMonths.findIndex(month =>
    isSameMonth(props.displayMonth, month),
  )

  const isFirst = displayIndex === 0
  const isLast = displayIndex === displayMonths.length - 1

  const hideNext = numberOfMonths > 1 && (isFirst || !isLast)
  const hidePrevious = numberOfMonths > 1 && (isLast || !isFirst)

  const handlePreviousClick: MouseEventHandler = () => {
    if (!previousMonth) return
    goToMonth(previousMonth)
  }

  const handleNextClick: MouseEventHandler = () => {
    if (!nextMonth) return
    goToMonth(nextMonth)
  }

  return (
    <div className={classNames.caption} style={styles.caption}>
      {!hidePrevious && (
        <Button
          name="previous-month"
          aria-label={previousLabel}
          className={previousClassName}
          style={styles.nav_button_previous}
          disabled={!previousMonth}
          onClick={handlePreviousClick}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      )}

      <CaptionDropdowns
        displayMonth={props.displayMonth}
        displayIndex={props.displayIndex}
        id={props.id}
      />

      {!hideNext && (
        <Button
          name="next-month"
          aria-label={nextLabel}
          className={nextClassName}
          style={styles.nav_button_next}
          disabled={!nextMonth}
          onClick={handleNextClick}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      )}
    </div>
  )
}

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('p-3', className)}
      classNames={{
        months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
        month: 'space-y-4',
        caption: 'flex justify-between pt-1 relative items-center',
        // caption_label: 'text-sm font-medium',
        nav: 'space-x-1 flex items-center',
        nav_button: cn(
          buttonVariants({variant: 'outline'}),
          'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100',
        ),
        nav_button_previous: 'absolute left-1',
        nav_button_next: 'absolute right-1',
        table: 'w-full border-collapse space-y-1',
        head_row: 'flex',
        head_cell:
          'text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]',
        row: 'flex w-full mt-2',
        cell: 'h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20',
        day: cn(
          buttonVariants({variant: 'ghost'}),
          'h-9 w-9 p-0 font-normal aria-selected:opacity-100',
        ),
        day_selected:
          'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
        day_today: 'bg-accent text-accent-foreground',
        day_outside: 'text-muted-foreground opacity-50',
        day_disabled: 'text-muted-foreground opacity-50',
        day_range_middle:
          'aria-selected:bg-accent aria-selected:text-accent-foreground',
        day_hidden: 'invisible',
        ...classNames,
      }}
      components={{
        Caption: CustomCaption,
      }}
      {...props}
    />
  )
}
Calendar.displayName = 'Calendar'

export {Calendar}
