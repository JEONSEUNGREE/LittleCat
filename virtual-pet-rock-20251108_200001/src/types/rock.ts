export type RockMood = 'calm' | 'happy' | 'zen' | 'sleeping' | 'content'
export type RockEvolution = 'pebble' | 'stone' | 'boulder' | 'mountain'

export interface RockState {
  mood: RockMood
  energy: number
  meditation: number
  touches: number
  age: number
  evolution: RockEvolution
}
