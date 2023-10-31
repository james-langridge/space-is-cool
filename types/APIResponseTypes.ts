export type Camera = {
  id: number
  name: CameraName
  rover_id: number
  full_name: FullName | FullNamePerseverance
}

export enum FullName {
  ChemistryAndCameraComplex = 'Chemistry and Camera Complex',
  FrontHazardAvoidanceCamera = 'Front Hazard Avoidance Camera',
  MarsDescentImager = 'Mars Descent Imager',
  MarsHandLensImager = 'Mars Hand Lens Imager',
  MastCamera = 'Mast Camera',
  NavigationCamera = 'Navigation Camera',
  PanoramicCamera = 'Panoramic Camera',
  RearHazardAvoidanceCamera = 'Rear Hazard Avoidance Camera',
}

export enum FullNamePerseverance {
  RoverUpLookCamera = 'Rover Up-Look Camera',
  RoverDownLookCamera = 'Rover Down-Look Camera',
  DescentStageDownLookCamera = 'Descent Stage Down-Look Camera',
  ParachuteUpLookCameraA = 'Parachute Up-Look Camera A',
  ParachuteUpLookCameraB = 'Parachute Up-Look Camera B',
  NavigationCameraLeft = 'Navigation Camera - Left',
  NavigationCameraRight = 'Navigation Camera - Right',
  MastCameraZoomRight = 'Mast Camera Zoom - Right',
  MastCameraZoomLeft = 'Mast Camera Zoom - Left',
  FrontHazardAvoidanceCameraLeft = 'Front Hazard Avoidance Camera - Left',
  FrontHazardAvoidanceCameraRight = 'Front Hazard Avoidance Camera - Right',
  RearHazardAvoidanceCameraLeft = 'Rear Hazard Avoidance Camera - Left',
  RearHazardAvoidanceCameraRight = 'Rear Hazard Avoidance Camera - Right',
  MEDASkycam = 'MEDA Skycam',
  SHERLOCWATSONCamera = 'SHERLOC WATSON Camera',
}

export type CameraName =
  | CameraNameCuriosity
  | CameraNameOpportunitySpirit
  | CameraNamePerseverance

export const CameraNameCuriosity = [
  'MAHLI',
  'FHAZ',
  'RHAZ',
  'MAST',
  'CHEMCAM',
  'MARDI',
  'NAVCAM',
] as const
export const CameraNameOpportunitySpirit = [
  'FHAZ',
  'RHAZ',
  'NAVCAM',
  'PANCAM',
  'MINITES',
] as const
export const CameraNamePerseverance = [
  'EDL_RUCAM',
  'EDL_RDCAM',
  'EDL_DDCAM',
  'EDL_PUCAM1',
  'EDL_PUCAM2',
  'NAVCAM_LEFT',
  'NAVCAM_RIGHT',
  'MCZ_RIGHT',
  'MCZ_LEFT',
  'FRONT_HAZCAM_LEFT_A',
  'FRONT_HAZCAM_RIGHT_A',
  'REAR_HAZCAM_LEFT',
  'REAR_HAZCAM_RIGHT',
  'SKYCAM',
  'SHERLOC_WATSON',
] as const

type CameraNameCuriosity = (typeof CameraNameCuriosity)[number]
type CameraNameOpportunitySpirit = (typeof CameraNameOpportunitySpirit)[number]
type CameraNamePerseverance = (typeof CameraNamePerseverance)[number]

export const allCameraNames = [
  ...CameraNameCuriosity,
  ...CameraNameOpportunitySpirit,
  ...CameraNamePerseverance,
] as const

export type Photo = {
  id: number
  sol: number
  camera: Camera
  img_src: string
  earth_date: Date
  rover: Rover
}

export type PhotoManifest = {
  name: string
  landing_date: Date
  launch_date: Date
  status: string
  max_sol: number
  max_date: Date
  total_photos: number
  photos: PhotoManifestEntry[]
}

export type PhotoManifestEntry = {
  sol: number
  earth_date: Date
  total_photos: number
  cameras: Camera[]
}

export type Rover = {
  id: number
  name: RoverName
  landing_date: Date
  launch_date: Date
  status: Status
}

export enum RoverName {
  Curiosity = 'Curiosity',
  Opportunity = 'Opportunity',
  Perseverance = 'Perseverance',
  Spirit = 'Spirit',
}

export enum Status {
  Active = 'active',
  Complete = 'complete',
}
