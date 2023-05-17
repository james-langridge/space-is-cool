import {useForm, useFormDispatch} from '@/app/providers'
import {
  CameraNameCuriosity,
  CameraNameOpportunitySpirit,
  CameraNamePerseverance,
  RoverName,
  CameraName,
} from '@/types/APIResponseTypes'

export default function InputCamera() {
  const form = useForm()
  const {rover} = form
  const dispatch = useFormDispatch()
  const cameras =
    rover === RoverName.Perseverance
      ? CameraNamePerseverance
      : rover === RoverName.Curiosity
      ? CameraNameCuriosity
      : CameraNameOpportunitySpirit

  return (
    <div className="pt-2 sm:px-4 sm:pb-0 w-full flex justify-center items-center">
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
