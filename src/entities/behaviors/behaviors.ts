import { Attraction } from './attraction';
import { Collectible } from './collectible';
import { Guarding } from './guarding';

export interface Behaviors {
  attraction: Attraction;
  guarding: Guarding;
  collectible: Collectible;
}
