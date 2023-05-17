import {useQuery} from '@tanstack/react-query'
import React from 'react'

import {useForm} from '@/app/providers'
import {getMissionManifest} from '@/lib/api'
import {convertDateFormat} from '@/lib/date'

export default function PhotosNotFound() {
  const form = useForm()
  const {data: manifestData} = useQuery({
    queryKey: ['manifest', form.submittedForm?.rover],
    queryFn: () => getMissionManifest(form.submittedForm?.rover),
    enabled: !!form.submittedForm,
  })
  const maxDate = manifestData?.max_date.toString()
  const landingDate = manifestData?.landing_date.toString()

  return (
    <div className="prose w-full mx-auto p-5">
      <p className="max-w-prose">
        No photos found. It&apos;s possible no photos were taken on that day or
        by that camera. Note, the landing date for {form.submittedForm?.rover}{' '}
        is {convertDateFormat(landingDate)}, and the max Earth date is{' '}
        {convertDateFormat(maxDate)}. The sol date ranges from 0 to{' '}
        {manifestData?.max_sol}.
      </p>
    </div>
  )
}
