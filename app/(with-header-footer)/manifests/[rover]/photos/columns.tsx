'use client'

import {ColumnDef} from '@tanstack/react-table'
import {format} from 'date-fns'

import {DataTableColumnHeader} from '@/app/ui/data-table-column-header'
import {PhotoManifestEntry} from '@/types/APIResponseTypes'

export const columns: ColumnDef<PhotoManifestEntry>[] = [
  {
    accessorKey: 'sol',
    header: ({column}) => <DataTableColumnHeader column={column} title="Sol" />,
    cell: ({row}) => {
      const formattedNumber = new Intl.NumberFormat().format(
        row.getValue('sol'),
      )

      return <div>{formattedNumber}</div>
    },
  },
  {
    accessorKey: 'earth_date',
    header: ({column}) => (
      <DataTableColumnHeader column={column} title="Earth Date" />
    ),
    cell: ({row}) => {
      const formattedDate = format(
        new Date(row.getValue('earth_date')),
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
