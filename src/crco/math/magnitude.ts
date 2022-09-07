export const magnitude = (...args: number[]) =>
  args.reduce((a, b) => a + b ** 2, 0) ** 0.5;
