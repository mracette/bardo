export enum Alignment {
  SpaceBetween = 'space-between',
  SpaceAround = 'space-around'
}

export interface SubdivideOptions {
  alignment?: Alignment;
  distribution?: (n: number) => number;
}

export const subdivide = (
  start: number,
  end: number,
  divisions: number,
  { alignment = Alignment.SpaceBetween, distribution }: SubdivideOptions = {}
) => {
  const array = [];
  const range = end - start;
  for (let i = 0; i < divisions; i++) {
    let value;
    if (alignment === Alignment.SpaceBetween) {
      value = start + (i * range) / (divisions - 1);
    } else {
      value = start + ((i + 0.5) * range) / divisions;
    }
    array.push(distribution ? distribution(value) : value);
  }
  return array;
};
