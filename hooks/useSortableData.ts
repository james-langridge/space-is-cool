import {useMemo, useState} from 'react'

type Order = 'asc' | 'desc'

export function useSortableData<T>(
  items: T[],
  config: {key: keyof T; order: Order},
) {
  const [sortConfig, setSortConfig] = useState(config)

  const sortedItems = useMemo(() => {
    const sortableItems = [...items]
    sortableItems.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.order === 'asc' ? -1 : 1
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.order === 'asc' ? 1 : -1
      }
      return 0
    })
    return sortableItems
  }, [items, sortConfig])

  const requestSort = (key: keyof T) => {
    const newOrder =
      sortConfig.key === key && sortConfig.order === 'asc' ? 'desc' : 'asc'
    setSortConfig({key, order: newOrder})
  }

  return {items: sortedItems, requestSort, sortConfig}
}
