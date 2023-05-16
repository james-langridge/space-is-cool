import {useInfiniteQuery} from '@tanstack/react-query'
import React from 'react'

import {FormState} from '@/app/providers'
import {getPhotos} from '@/lib/api'

type Props = {
  formForQuery: FormState | null
  isFormSubmitted: boolean
  setFormSubmitted: React.Dispatch<React.SetStateAction<boolean>>
}

export function useSearchPhotos({
  formForQuery,
  isFormSubmitted,
  setFormSubmitted,
}: Props) {
  return useInfiniteQuery({
    queryKey: ['photos', JSON.stringify(formForQuery)],
    queryFn: ({pageParam = 0}) =>
      formForQuery ? getPhotos({...formForQuery, page: pageParam}) : [],
    getNextPageParam: lastPage => {
      return lastPage.length === 25 ? lastPage[0].page + 1 : undefined
    },
    enabled: isFormSubmitted,
    onSettled: () => {
      setFormSubmitted(false)
    },
  })
}
