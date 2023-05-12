import {useForm, useFormDispatch} from '@/app/providers'
import {
  CameraNameCuriosity,
  CameraNameOpportunitySpirit,
  CameraNamePerseverance,
  RoverName,
} from '@/types/APIResponseTypes'

export default function CameraToggle() {
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
    <div className="pt-2 sm:px-4 sm:pb-0 w-full flex justify-center items-center dark:invert">
      <label htmlFor="cameras">Camera:</label>
      <select className="ml-2 p-2" name="cameras" id="cameras">
        <option
          onClick={() => dispatch({type: 'SET_CAMERA', payload: undefined})}
          value=""
        >
          Any
        </option>
        {Object.values(cameras).map(camera => (
          <option
            onClick={() => dispatch({type: 'SET_CAMERA', payload: camera})}
            key={camera}
            value={camera}
          >
            {camera}
          </option>
        ))}
      </select>
    </div>
  )
}
