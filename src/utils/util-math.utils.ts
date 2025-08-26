import { ExponentNumber } from "../class/exponent-number.class";
import { VALUE_EXPONENT_DIFFERENCE_LIMIT } from "../const";

export function plusEqualExponentLevelNumber(
  first: ExponentNumber,
  second: ExponentNumber,
): ExponentNumber {
  if (first.exponentFactor !== second.exponentFactor) {
    throw new Error("Expected exponentFactor to be equal");
  }

  if (second.exponentFactor > 1) {
    throw new Error("Expected exponentFactor to be lower or equal than 1");
  }

  if (second.exponentFactor === 1) {
    if (
      Math.abs(first.value - second.value) > VALUE_EXPONENT_DIFFERENCE_LIMIT
    ) {
      return first.value - second.value > 0 ? first.copy() : second.copy();
    }

    const biggerValue = Math.max(first.value, second.value);
    const smallerValue = Math.min(first.value, second.value);

    return new ExponentNumber(
      1,
      biggerValue + Math.log10(1 + Math.pow(10, smallerValue - biggerValue)),
    );
  }

  return new ExponentNumber(0, first.value + second.value);
}

export function plusDifferentExponentLevelNumber(
  first: ExponentNumber,
  second: ExponentNumber,
): ExponentNumber {
  if (first.exponentFactor === second.exponentFactor) {
    throw new Error("Expected exponentFactor to be different");
  }

  if (first.exponentFactor > 1 || second.exponentFactor > 1) {
    throw new Error("Expected exponentFactor to be lower or equal than 1");
  }

  const biggerValue =
    first.exponentFactor > second.exponentFactor ? first : second;
  const smallerValue =
    first.exponentFactor > second.exponentFactor ? second : first;

  const smallValueExponent = Math.log10(smallerValue.value);
  const exponentDifference = biggerValue.value - smallValueExponent;

  if (exponentDifference > VALUE_EXPONENT_DIFFERENCE_LIMIT) {
    return biggerValue.copy();
  }

  return new ExponentNumber(
    1,
    biggerValue.value + smallValueExponent / Math.pow(10, exponentDifference),
  );
}

export function minusEqualExponentLevelNumber(
  first: ExponentNumber,
  second: ExponentNumber,
): ExponentNumber {
  if (first.exponentFactor !== second.exponentFactor) {
    throw new Error("Expected exponentFactor to be equal");
  }

  if (second.exponentFactor > 1) {
    throw new Error("Expected exponentFactor to be lower or equal than 1");
  }

  if (second.exponentFactor === 1) {
    if (second.value >= first.value) {
      return new ExponentNumber(0, 0);
    }

    if (first.value - second.value > VALUE_EXPONENT_DIFFERENCE_LIMIT) {
      return first.value - second.value < 0 ? first.copy() : second.copy();
    }

    return new ExponentNumber(
      1,
      first.value + Math.log10(1 - Math.pow(10, second.value - first.value)),
    );
  }

  return new ExponentNumber(
    0,
    Math.max(first.value - second.value, -VALUE_EXPONENT_DIFFERENCE_LIMIT),
  );
}

export function minusDifferentExponentLevelNumber(
  first: ExponentNumber,
  second: ExponentNumber,
): ExponentNumber {
  if (first.exponentFactor === second.exponentFactor) {
    throw new Error("Expected exponentFactor to be different");
  }

  if (first.exponentFactor > 1 || second.exponentFactor > 1) {
    throw new Error("Expected exponentFactor to be lower or equal than 1");
  }

  if (second.exponentFactor > first.exponentFactor) {
    return new ExponentNumber(0, 0);
  }

  const smallValueExponent = Math.log10(second.value);
  const exponentDifference = first.value - smallValueExponent;

  if (exponentDifference > VALUE_EXPONENT_DIFFERENCE_LIMIT) {
    return first.copy();
  }

  return new ExponentNumber(
    1,
    first.value -
      smallValueExponent / Math.pow(10, first.value - smallValueExponent),
  );
}
