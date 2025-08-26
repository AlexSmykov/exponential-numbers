import {
  minusDifferentExponentLevelNumber,
  minusEqualExponentLevelNumber,
  plusDifferentExponentLevelNumber,
  plusEqualExponentLevelNumber,
} from 'src/utils/util-math.utils';
import { VALUE_EXPONENT_LIMIT } from 'src/const';

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
    if (Math.log10(this.value) >= VALUE_EXPONENT_LIMIT) {
      this.exponentFactor += 1;
      this.value = Math.log10(this.value);

      return;
    }

    if (this.exponentFactor > 1 && this.value < VALUE_EXPONENT_LIMIT) {
      this.exponentFactor -= 1;
      this.value = Math.pow(10, this.value);
    }
  }

  applyNewValues(newNumber: ExponentNumber): ExponentNumber {
    return new ExponentNumber(newNumber.exponentFactor, newNumber.value);
  }

  toString(): string {
    return `${'e'.repeat(this.exponentFactor)}${this.value.toPrecision(4)}`;
  }

  plus(otherNumber: ExponentNumber): ExponentNumber {
    if (this.exponentFactor === otherNumber.exponentFactor) {
      if (this.exponentFactor > 1) {
        return this;
      }

      this.applyNewValues(plusEqualExponentLevelNumber(this, otherNumber));
    } else {
      if (this.exponentFactor > 1 || otherNumber.exponentFactor > 1) {
        if (otherNumber.exponentFactor > this.exponentFactor) {
          this.applyNewValues(otherNumber);
        }

        this.applyNewValues(plusDifferentExponentLevelNumber(this, otherNumber));
      }
    }

    this.normalize();

    return this;
  }

  minus(otherNumber: ExponentNumber): ExponentNumber {
    if (this.exponentFactor === otherNumber.exponentFactor) {
      if (this.exponentFactor > 1) {
        return this;
      }

      if (this.value === otherNumber.value) {
        this.applyNewValues(new ExponentNumber(0, 0));

        return this;
      }

      this.applyNewValues(minusEqualExponentLevelNumber(this, otherNumber));
    } else {
      if (this.exponentFactor > 1 || otherNumber.exponentFactor > 1) {
        if (otherNumber.exponentFactor > this.exponentFactor) {
          this.applyNewValues(new ExponentNumber(0, 0));
        }

        this.applyNewValues(minusDifferentExponentLevelNumber(this, otherNumber));
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
    result.minus(new ExponentNumber(base.exponentFactor, Math.log10(base.value)));

    this.applyNewValues(result);

    this.normalize();

    return this;
  }

  log10(): ExponentNumber {
    return this.log(new ExponentNumber(0, 10));
  }

  isMoreThanValue(otherNumber: ExponentNumber): boolean {
    return (
      otherNumber.exponentFactor > this.exponentFactor ||
      (otherNumber.exponentFactor === this.exponentFactor && otherNumber.value > this.value)
    );
  }

  isEqualThanValue(otherNumber: ExponentNumber): boolean {
    return otherNumber.exponentFactor === this.exponentFactor && otherNumber.value === this.value;
  }

  isMoreOrEqualThanValue(otherNumber: ExponentNumber): boolean {
    return this.isMoreThanValue(otherNumber) || this.isEqualThanValue(otherNumber);
  }
}
