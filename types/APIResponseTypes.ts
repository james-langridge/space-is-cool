export type Camera = {
  id: number
  name: CameraName
  rover_id: number
  full_name: FullName
}

export enum CameraName {
  Mahli = 'MAHLI',
  Fhaz = 'FHAZ',
  Rhaz = 'RHAZ',
  Mast = 'MAST',
  Chemcam = 'CHEMCAM',
  Mardi = 'MARDI',
  Navcam = 'NAVCAM',
  Pancam = 'PANCAM',
  Minites = 'MINITES',
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
  Spirit = 'Spirit',
  Perseverance = 'Perseverance',
}

export enum Status {
  Active = 'active',
}
