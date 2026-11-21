import { type Vector3 } from "three";

export type YawCategory = 
  | 'Front' 
  | '3/4 Right' 
  | 'Profile Right' 
  | '3/4 Back Right' 
  | 'Back' 
  | '3/4 Back Left' 
  | 'Profile Left' 
  | '3/4 Left';

export type PitchCategory = 'Up' | 'Center' | 'Down';

export interface AngleResult {
  yaw: YawCategory;
  pitch: PitchCategory;
}

const YAW_MAP = [
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

export const getAngleCategory = (forwardVector: Vector3): AngleResult => {
  // Yaw
  const yaw = Math.atan2(forwardVector.x, forwardVector.z);
  const yawDegrees = ((yaw * (180 / Math.PI) % 360) + 360) % 360;
  
  const yawCategory = YAW_MAP.find(range => 
    yawDegrees >= range.min && yawDegrees < range.max
  )?.category || 'Front';

  const pitch = Math.asin(forwardVector.y) * (180 / Math.PI);
  let pitchCategory: PitchCategory = 'Center';
  if (pitch > 20) pitchCategory = 'Up';
  else if (pitch < -20) pitchCategory = 'Down';
  console.log(pitch)

  return { yaw: yawCategory as YawCategory, pitch: pitchCategory };
};

export const getSearchTag = (angle: AngleResult): string => {
  const yawMap: Record<YawCategory, string> = {
    'Front': 'portrait head front view',
    '3/4 Right': 'portrait head 3/4 view right',
    'Profile Right': 'portrait head profile view right',
    '3/4 Back Right': 'portrait head back 3/4 view right',
    'Back': 'portrait head back view',
    '3/4 Back Left': 'portrait head back 3/4 view left',
    'Profile Left': 'portrait head profile view left',
    '3/4 Left': 'portrait head 3/4 view left',
  };

  const pitchMap: Record<PitchCategory, string> = {
    'Up': 'looking up',
    'Center': '',
    'Down': 'looking down'
  };

  return `${yawMap[angle.yaw]} ${pitchMap[angle.pitch]}`;
};
