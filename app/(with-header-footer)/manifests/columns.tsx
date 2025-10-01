'use client'

import {ColumnDef} from '@tanstack/react-table'
import {format} from 'date-fns'

import {statuses} from '@/app/(with-header-footer)/manifests/data-table'
import {DataTableColumnHeader} from '@/app/ui/data-table-column-header'
import type {Manifest} from 'mars-photo-sdk'

export const columns: ColumnDef<Manifest>[] = [
  {
    accessorKey: 'name',
    header: ({column}) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
  },
  {
    accessorKey: 'landing_date',
    header: ({column}) => (
      <DataTableColumnHeader column={column} title="Landing Date" />
    ),
    cell: ({row}) => {
      const landingDate = row.getValue('landing_date') as string | undefined
      if (!landingDate) return <div>-</div>

      const formattedDate = format(
        new Date(landingDate),
        'do MMM yyyy',
      )

      return <div>{formattedDate}</div>
    },
  },
  {
    accessorKey: 'launch_date',
    header: ({column}) => (
      <DataTableColumnHeader column={column} title="Launch Date" />
    ),
    cell: ({row}) => {
      const launchDate = row.getValue('launch_date') as string | undefined
      if (!launchDate) return <div>-</div>

      const formattedDate = format(
        new Date(launchDate),
        'do MMM yyyy',
      )

      return <div>{formattedDate}</div>
    },
  },
  {
    accessorKey: 'status',
    header: ({column}) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({row}) => {
      const status = statuses.find(
        status => status.value === row.getValue('status'),
      )

      if (!status) {
        return null
      }

      return (
        <div className="flex w-[100px] items-center">
          {status.icon && (
            <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{status.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'max_sol',
    header: ({column}) => (
      <DataTableColumnHeader column={column} title="Max Sol" />
    ),
    cell: ({row}) => {
      const maxSol = row.getValue('max_sol') as number | undefined
      if (maxSol === undefined) return <div>-</div>

      const formattedNumber = new Intl.NumberFormat().format(maxSol)

      return <div>{formattedNumber}</div>
    },
  },
  {
    accessorKey: 'max_date',
    header: ({column}) => (
      <DataTableColumnHeader column={column} title="Max Date" />
    ),
    cell: ({row}) => {
      const maxDate = row.getValue('max_date') as string | undefined
      if (!maxDate) return <div>-</div>

      const formattedDate = format(
        new Date(maxDate),
        'do MMM yyyy',
      )

      return <div>{formattedDate}</div>
    },
  },
  {
    accessorKey: 'total_photos',
    header: ({column}) => (
      <DataTableColumnHeader column={column} title="Total Photos" />
    ),
    cell: ({row}) => {
      const totalPhotos = row.getValue('total_photos') as number | undefined
      if (totalPhotos === undefined) return <div>-</div>

      const formattedNumber = new Intl.NumberFormat().format(totalPhotos)

      return <div>{formattedNumber}</div>
    },
  },
]
