import { Player } from '../entities/player';
import { Weapon } from '../entities/weapons/weapon';
import { state } from './game';
import { graphics } from './graphics';
import { mapCenter } from './map';

export const player = new Player(graphics.gameplay, mapCenter.clone());
