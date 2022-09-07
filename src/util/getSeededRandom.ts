import { mulberry32 } from '../crco';
import { SEEDS } from '../globals/math';

export const getSeededRandom = (n: number) => mulberry32(SEEDS[n]);
