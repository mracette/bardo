import { Player } from '../entities/player';
import { Weapon } from '../entities/weapon';
import { mapCenter, state } from './game';
import { graphics } from './graphics';

export const player = new Player(graphics.player, mapCenter.clone());
const weapon = new Weapon(graphics.player, mapCenter.clone());
state.weapons.push(weapon);
