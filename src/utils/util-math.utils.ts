export function plusExponentOne(biggerValue: number, smallerValue: number): number {
  return biggerValue + Math.log10(1 + Math.pow(10, smallerValue - biggerValue));
}

export function minusExponentOne(biggerValue: number, smallerValue: number): number {
  return biggerValue + Math.log10(1 - Math.pow(10, smallerValue - biggerValue));
}
