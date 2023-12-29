'use client'

import {ColumnDef} from '@tanstack/react-table'
import {format} from 'date-fns'

import {statuses} from '@/app/(with-header-footer)/manifests/data-table'
import {DataTableColumnHeader} from '@/app/ui/data-table-column-header'
import {PhotoManifest} from '@/types/APIResponseTypes'

export const columns: ColumnDef<PhotoManifest>[] = [
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
      const formattedDate = format(
        new Date(row.getValue('landing_date')),
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
      const formattedDate = format(
        new Date(row.getValue('launch_date')),
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
      const formattedNumber = new Intl.NumberFormat().format(
        row.getValue('max_sol'),
      )

      return <div>{formattedNumber}</div>
    },
  },
  {
    accessorKey: 'max_date',
    header: ({column}) => (
      <DataTableColumnHeader column={column} title="Max Date" />
    ),
    cell: ({row}) => {
      const formattedDate = format(
        new Date(row.getValue('max_date')),
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
      const formattedNumber = new Intl.NumberFormat().format(
        row.getValue('total_photos'),
      )

      return <div>{formattedNumber}</div>
    },
  },
]
