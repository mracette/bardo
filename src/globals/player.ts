import { Player } from '../entities/player';
import { Weapon } from '../entities/weapons/weapon';
import { mapCenter, state } from './game';
import { graphics } from './graphics';

export const player = new Player(graphics.gameplay, mapCenter.clone());
