import { Player } from '../entities/player';
import { graphics } from './graphics';
import { mapCenter } from './map';

export const player = new Player(graphics.gameplay, mapCenter.clone());
