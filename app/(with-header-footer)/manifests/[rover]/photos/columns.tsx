'use client'

import {ColumnDef} from '@tanstack/react-table'
import {format} from 'date-fns'
import type {ManifestPhoto} from 'mars-photo-sdk'

import {DataTableColumnHeader} from '@/app/ui/data-table-column-header'

export const columns: ColumnDef<ManifestPhoto>[] = [
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
    accessorKey: 'earthDate',
    header: ({column}) => (
      <DataTableColumnHeader column={column} title="Earth Date" />
    ),
    cell: ({row}) => {
      const earthDate = row.getValue('earthDate') as string | undefined
      if (!earthDate) return <div>-</div>

      const formattedDate = format(
        new Date(earthDate),
        'do MMM yyyy',
      )

      return <div>{formattedDate}</div>
    },
  },
  {
    accessorKey: 'totalPhotos',
    header: ({column}) => (
      <DataTableColumnHeader column={column} title="Total" />
    ),
    cell: ({row}) => {
      const totalPhotos = row.getValue('totalPhotos') as number | undefined
      if (totalPhotos === undefined) return <div>-</div>

      const formattedNumber = new Intl.NumberFormat().format(totalPhotos)

      return <div>{formattedNumber}</div>
    },
  },
]
