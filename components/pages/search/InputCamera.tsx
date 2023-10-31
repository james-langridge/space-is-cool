import {Dispatch} from 'react'

import {FormAction, FormState} from '@/components/global/SearchForm'
import {
  CameraNameCuriosity,
  CameraNameOpportunitySpirit,
  CameraNamePerseverance,
  RoverName,
  CameraName,
} from '@/types/APIResponseTypes'

export default function InputCamera({
  form,
  dispatch,
}: {
  form: FormState
  dispatch: Dispatch<FormAction>
}) {
  const {rover} = form
  const cameras =
    rover === RoverName.Perseverance
      ? CameraNamePerseverance
      : rover === RoverName.Curiosity
      ? CameraNameCuriosity
      : CameraNameOpportunitySpirit

  return (
    <div className="flex w-full items-center justify-center pt-2 sm:px-4 sm:pb-0">
      <label htmlFor="cameras">Camera:</label>
      <select
        className="ml-2 p-2"
        name="cameras"
        id="cameras"
        value={form.camera}
        onChange={e =>
          dispatch({
            type: 'SET_CAMERA',
            payload:
              e.target.value === 'Any'
                ? undefined
                : (e.target.value as CameraName),
          })
        }
      >
        <option value="Any">Any</option>
        {Object.values(cameras).map(camera => (
          <option value={camera} key={camera}>
            {camera}
          </option>
        ))}
      </select>
    </div>
  )
}
