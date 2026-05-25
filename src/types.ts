export interface ParticleType {
  id: number;
  type: 'rose' | 'cookie' | 'heart';
  x: number;
  y: number;
  speed: number;
  size: number;
  rotation: number;
  rotationSpeed: number;
  swaySeed: number;
}

export type ExperienceState = 'welcome' | 'main';
