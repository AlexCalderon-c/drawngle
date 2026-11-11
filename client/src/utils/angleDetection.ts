import { type Vector3 } from "three";

export type AngleCategory = 
  | 'Front' 
  | '3/4 Right' 
  | 'Profile Right' 
  | '3/4 Back Right' 
  | 'Back' 
  | '3/4 Back Left' 
  | 'Profile Left' 
  | '3/4 Left';

const ANGLE_MAP = [
  { min: 337.5, max: 360, category: 'Front' },
  { min: 0, max: 22.5, category: 'Front' },
  { min: 22.5, max: 67.5, category: '3/4 Right' },
  { min: 67.5, max: 112.5, category: 'Profile Right' },
  { min: 112.5, max: 157.5, category: '3/4 Back Right' },
  { min: 157.5, max: 202.5, category: 'Back' },
  { min: 202.5, max: 247.5, category: '3/4 Back Left' },
  { min: 247.5, max: 292.5, category: 'Profile Left' },
  { min: 292.5, max: 337.5, category: '3/4 Left' },
];

export const getAngleCategory = (forwardVector: Vector3): AngleCategory => {

  const radians = Math.atan2(forwardVector.x, forwardVector.z)

  const degrees = (radians * (180 / Math.PI));
  
  const normalized = ((degrees % 360) + 360) % 360;

  console.log(normalized)
  
  const found = ANGLE_MAP.find(range => 
    normalized >= range.min && normalized < range.max
  );
  
  return found ? (found.category as AngleCategory) : 'Front';
};

export const getSearchTag = (category: AngleCategory): string => {
  const map: Record<AngleCategory, string> = {
    'Front': 'portrait head front view',
    '3/4 Right': 'portrait head 3/4 view right',
    'Profile Right': 'portrait head profile view right',
    '3/4 Back Right': 'portrait head back 3/4 view right',
    'Back': 'portrait head back view',
    '3/4 Back Left': 'portrait head back 3/4 view left',
    'Profile Left': 'portrait head profile view left',
    '3/4 Left': 'portrait head 3/4 view left',
  };
  return map[category];
};
