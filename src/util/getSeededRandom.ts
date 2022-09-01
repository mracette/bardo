import { mulberry32 } from 'crco-utils';
import { SEEDS } from '../globals/math';

export const getSeededRandom = (n: number) => mulberry32(SEEDS[n]);
