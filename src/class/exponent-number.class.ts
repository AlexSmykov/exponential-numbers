import {
  minusDifferentExponentLevelNumber,
  minusEqualExponentLevelNumber,
  plusDifferentExponentLevelNumber,
  plusEqualExponentLevelNumber,
} from '../utils/util-math.utils';
import { DECIMAL_DIGITS, VALUE_EXPONENT_DIFFERENCE_LIMIT, VALUE_EXPONENT_LIMIT } from '../const';

export class ExponentNumber {
  exponentFactor = 0;
  value = 0;

  constructor(exponentFactor = 0, value = 0) {
    this.exponentFactor = exponentFactor;
    this.value = value;

    this.normalize();
  }

  copy(): ExponentNumber {
    return new ExponentNumber(this.exponentFactor, this.value);
  }

  normalize(): void {
    while (Math.log10(this.value) >= VALUE_EXPONENT_LIMIT) {
      this.exponentFactor += 1;
      this.value = Math.log10(this.value);
    }

    while (this.exponentFactor >= 1 && this.value < VALUE_EXPONENT_LIMIT) {
      this.exponentFactor -= 1;
      this.value = Math.pow(10, this.value);
    }

    while (this.exponentFactor < 0 && this.value > 0) {
      this.exponentFactor += 1;
      this.value = Math.max(Math.log10(this.value), 0);
    }

    if (this.value === Math.pow(10, -VALUE_EXPONENT_DIFFERENCE_LIMIT)) {
      this.value = 0;
      this.exponentFactor = 0;
    }
  }

  applyNewValues(newNumber: ExponentNumber): void {
    this.exponentFactor = newNumber.exponentFactor;
    this.value = newNumber.value;
  }

  toString(): string {
    const cutNumber = Number(this.value.toPrecision(DECIMAL_DIGITS));

    let numberText = cutNumber.toString();

    if (Math.log10(cutNumber) >= VALUE_EXPONENT_DIFFERENCE_LIMIT) {
      const numberExp = Math.floor(Math.log10(cutNumber));
      const firstNumbers = cutNumber
        .toString()
        .replace('.', '')
        .split('e')[0]
        .slice(0, DECIMAL_DIGITS);
      const firstPart = `${firstNumbers[0]}.${firstNumbers.slice(1)}`;
      numberText = `${Number(firstPart)}e${numberExp}`;
    }

    return `${'e'.repeat(this.exponentFactor)}${numberText}`;
  }

  plus(otherNumber: ExponentNumber): ExponentNumber {
    if (this.exponentFactor === otherNumber.exponentFactor) {
      if (this.exponentFactor > 1) {
        return this;
      }

      this.applyNewValues(plusEqualExponentLevelNumber(this, otherNumber));
    } else {
      if (this.exponentFactor <= 1 && otherNumber.exponentFactor <= 1) {
        this.applyNewValues(plusDifferentExponentLevelNumber(this, otherNumber));
      } else {
        const biggerNumber = this.exponentFactor > otherNumber.exponentFactor ? this : otherNumber;
        this.applyNewValues(biggerNumber);
      }
    }

    this.normalize();

    return this;
  }

  minus(otherNumber: ExponentNumber): ExponentNumber {
    if (this.exponentFactor === otherNumber.exponentFactor) {
      if (this.exponentFactor > 1) {
        if (otherNumber.value >= this.value) {
          this.applyNewValues(new ExponentNumber(0, 0));
        }

        return this;
      }

      if (this.value === otherNumber.value) {
        this.applyNewValues(new ExponentNumber(0, 0));

        return this;
      }

      this.applyNewValues(minusEqualExponentLevelNumber(this, otherNumber));
    } else {
      if (this.exponentFactor <= 1 && otherNumber.exponentFactor <= 1) {
        this.applyNewValues(minusDifferentExponentLevelNumber(this, otherNumber));
      } else {
        if (otherNumber.exponentFactor > this.exponentFactor) {
          this.applyNewValues(new ExponentNumber(0, 0));
        }
      }
    }

    this.normalize();

    return this;
  }

  multiply(otherNumber: ExponentNumber): ExponentNumber {
    const result = new ExponentNumber(this.exponentFactor, Math.log10(this.value));

    result.plus(new ExponentNumber(otherNumber.exponentFactor, Math.log10(otherNumber.value)));

    this.exponentFactor = result.exponentFactor + 1;
    this.value = result.value;

    this.normalize();

    return this;
  }

  divide(otherNumber: ExponentNumber): ExponentNumber {
    if (this.exponentFactor === 0 && this.value === 0) {
      return this;
    }

    const result = new ExponentNumber(this.exponentFactor, Math.log10(this.value));

    result.minus(new ExponentNumber(otherNumber.exponentFactor, Math.log10(otherNumber.value)));

    this.exponentFactor = result.exponentFactor + 1;
    this.value = result.value;

    this.normalize();

    return this;
  }

  power(otherNumber: ExponentNumber): ExponentNumber {
    const result = new ExponentNumber(this.exponentFactor, Math.log10(this.value));

    result.multiply(otherNumber);

    this.exponentFactor = result.exponentFactor + 1;
    this.value = result.value;

    this.normalize();

    return this;
  }

  log(base: ExponentNumber): ExponentNumber {
    const result = new ExponentNumber(this.exponentFactor, Math.log10(this.value));
    result.divide(new ExponentNumber(base.exponentFactor, Math.log10(base.value)));

    this.applyNewValues(result);

    this.normalize();

    return this;
  }

  log10(): ExponentNumber {
    return new ExponentNumber(this.exponentFactor - 1, this.value);
  }

  isMoreThanValue(otherNumber: ExponentNumber): boolean {
    return (
      this.exponentFactor > otherNumber.exponentFactor ||
      (this.exponentFactor === otherNumber.exponentFactor && this.value > otherNumber.value)
    );
  }

  isEqual(otherNumber: ExponentNumber): boolean {
    return otherNumber.exponentFactor === this.exponentFactor && otherNumber.value === this.value;
  }

  isMoreThanOrEqualValue(otherNumber: ExponentNumber): boolean {
    return this.isMoreThanValue(otherNumber) || this.isEqual(otherNumber);
  }
}
