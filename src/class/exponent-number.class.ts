import {
  DECIMAL_DIGITS,
  EXPONENT_COUNT_LIMIT,
  VALUE_EXPONENT_DIFFERENCE_LIMIT,
  VALUE_EXPONENT_LIMIT,
} from '../const';
import { minusExponentOne, plusExponentOne } from '../utils/util-math.utils';

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

    while (this.exponentFactor < 0 && this.value > 1) {
      this.exponentFactor += 1;
      this.value = Math.log10(this.value);
    }

    if (Math.abs(this.value) <= Math.pow(10, -VALUE_EXPONENT_DIFFERENCE_LIMIT)) {
      this.resetValue();
    }
  }

  applyNewValues(newNumber: ExponentNumber): void {
    this.exponentFactor = newNumber.exponentFactor;
    this.value = newNumber.value;
  }

  resetValue(): void {
    this.exponentFactor = 0;
    this.value = 0;
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

    const exponentText =
      this.exponentFactor <= EXPONENT_COUNT_LIMIT
        ? 'e'.repeat(this.exponentFactor)
        : `e(${this.exponentFactor})`;

    return `${exponentText}${numberText}`;
  }

  plus(otherNumber: ExponentNumber): ExponentNumber {
    const isOtherValueSmaller = this.isGreaterThanValue(otherNumber);
    const biggerValue = isOtherValueSmaller ? this : otherNumber;
    const smallerValue = isOtherValueSmaller ? otherNumber : this;

    switch (this.exponentFactor) {
      case 0: {
        switch (otherNumber.exponentFactor) {
          case 0: {
            return new ExponentNumber(0, this.value + otherNumber.value);
          }

          case 1: {
            return new ExponentNumber(
              1,
              plusExponentOne(otherNumber.value, Math.log10(this.value)),
            );
          }

          default: {
            return new ExponentNumber(otherNumber.exponentFactor, otherNumber.value);
          }
        }
      }

      case 1: {
        switch (otherNumber.exponentFactor) {
          case 0: {
            return new ExponentNumber(
              1,
              plusExponentOne(this.value, Math.log10(otherNumber.value)),
            );
          }

          case 1: {
            return new ExponentNumber(1, plusExponentOne(biggerValue.value, smallerValue.value));
          }

          default: {
            return new ExponentNumber(otherNumber.exponentFactor, otherNumber.value);
          }
        }
      }

      default: {
        switch (otherNumber.exponentFactor) {
          case 0: {
            return new ExponentNumber(this.exponentFactor, this.value);
          }

          case 1: {
            return new ExponentNumber(this.exponentFactor, this.value);
          }

          default: {
            return biggerValue;
          }
        }
      }
    }
  }

  minus(otherNumber: ExponentNumber): ExponentNumber {
    const isOtherValueSmaller = this.isGreaterThanValue(otherNumber);
    const biggerValue = isOtherValueSmaller ? this : otherNumber;
    const smallerValue = isOtherValueSmaller ? otherNumber : this;

    switch (this.exponentFactor) {
      case 0: {
        switch (otherNumber.exponentFactor) {
          case 0: {
            return isOtherValueSmaller
              ? new ExponentNumber(0, this.value - otherNumber.value)
              : new ExponentNumber(0, 0);
          }

          case 1: {
            return new ExponentNumber(0, 0);
          }

          default: {
            return new ExponentNumber(0, 0);
          }
        }
      }

      case 1: {
        switch (otherNumber.exponentFactor) {
          case 0: {
            return new ExponentNumber(
              1,
              minusExponentOne(this.value, Math.log10(otherNumber.value)),
            );
          }

          case 1: {
            return isOtherValueSmaller
              ? new ExponentNumber(1, minusExponentOne(biggerValue.value, smallerValue.value))
              : new ExponentNumber(0, 0);
          }

          default: {
            return new ExponentNumber(0, 0);
          }
        }
      }

      default: {
        switch (otherNumber.exponentFactor) {
          case 0: {
            return new ExponentNumber(this.exponentFactor, this.value);
          }

          case 1: {
            return new ExponentNumber(this.exponentFactor, this.value);
          }

          default: {
            return isOtherValueSmaller
              ? new ExponentNumber(this.exponentFactor, this.value)
              : new ExponentNumber(0, 0);
          }
        }
      }
    }
  }

  multiply(otherNumber: ExponentNumber): ExponentNumber {
    const isOtherValueSmaller = this.isGreaterThanValue(otherNumber);
    const biggerValue = isOtherValueSmaller ? this : otherNumber;

    switch (this.exponentFactor) {
      case 0: {
        switch (otherNumber.exponentFactor) {
          case 0: {
            return new ExponentNumber(0, this.value * otherNumber.value);
          }

          case 1: {
            if (this.value <= 0) {
              return new ExponentNumber(0, 0);
            }

            return new ExponentNumber(1, otherNumber.value + Math.log10(this.value));
          }

          default: {
            return new ExponentNumber(otherNumber.exponentFactor, otherNumber.value);
          }
        }
      }

      case 1: {
        switch (otherNumber.exponentFactor) {
          case 0: {
            if (otherNumber.value <= 0) {
              return new ExponentNumber(this.exponentFactor, this.value);
            }

            return new ExponentNumber(1, this.value + Math.log10(otherNumber.value));
          }

          case 1: {
            return new ExponentNumber(1, this.value + otherNumber.value);
          }

          default: {
            return new ExponentNumber(
              2,
              new ExponentNumber(0, this.value).plus(
                new ExponentNumber(otherNumber.exponentFactor - 1, otherNumber.value),
              ).value,
            );
          }
        }
      }

      default: {
        switch (otherNumber.exponentFactor) {
          case 0: {
            return new ExponentNumber(this.exponentFactor, this.value);
          }

          case 1: {
            return new ExponentNumber(
              this.exponentFactor,
              new ExponentNumber(this.exponentFactor - 1, this.value).plus(
                new ExponentNumber(0, otherNumber.value),
              ).value,
            );
          }

          default: {
            return new ExponentNumber(
              biggerValue.exponentFactor,
              new ExponentNumber(this.exponentFactor - 1, this.value).plus(
                new ExponentNumber(otherNumber.exponentFactor - 1, otherNumber.value),
              ).value,
            );
          }
        }
      }
    }
  }

  divide(otherNumber: ExponentNumber): ExponentNumber {
    const isOtherValueSmaller = this.isGreaterThanValue(otherNumber);

    if (this.value < 0 || otherNumber.value < 0) {
      return new ExponentNumber(0, 0);
    }

    if (this.isEqual(otherNumber)) {
      return new ExponentNumber(0, 1);
    }

    console.log(this, otherNumber);
    switch (this.exponentFactor) {
      case 0: {
        switch (otherNumber.exponentFactor) {
          case 0: {
            return new ExponentNumber(0, this.value / otherNumber.value);
          }

          case 1: {
            return new ExponentNumber(
              1,
              -minusExponentOne(otherNumber.value, Math.log10(this.value)),
            );
          }

          default: {
            return new ExponentNumber(0, 0);
          }
        }
      }

      case 1: {
        switch (otherNumber.exponentFactor) {
          case 0: {
            return new ExponentNumber(1, this.value - Math.log10(otherNumber.value));
          }

          case 1: {
            return new ExponentNumber(0, Math.pow(10, this.value - otherNumber.value));
          }

          default: {
            return new ExponentNumber(0, 0);
          }
        }
      }

      default: {
        switch (otherNumber.exponentFactor) {
          case 0: {
            return new ExponentNumber(this.exponentFactor, this.value);
          }

          case 1: {
            const subtractedNumber = new ExponentNumber(this.exponentFactor - 1, this.value).minus(
              new ExponentNumber(0, otherNumber.value),
            );

            return new ExponentNumber(subtractedNumber.exponentFactor + 1, subtractedNumber.value);
          }

          default: {
            if (!isOtherValueSmaller) {
              return new ExponentNumber(0, 0);
            }

            const powerMinus = new ExponentNumber(this.exponentFactor - 1, this.value).minus(
              new ExponentNumber(otherNumber.exponentFactor - 1, otherNumber.value),
            );

            console.log(powerMinus);
            return new ExponentNumber(powerMinus.exponentFactor + 1, powerMinus.value);
          }
        }
      }
    }
  }

  power(power: ExponentNumber): ExponentNumber {
    switch (this.exponentFactor) {
      case 0: {
        switch (power.exponentFactor) {
          case 0: {
            return new ExponentNumber(1, Math.log10(this.value) * power.value);
          }

          case 1: {
            if (this.value < 1) {
              return new ExponentNumber(0, 0);
            }

            const powerMult = new ExponentNumber(0, Math.log10(this.value)).multiply(
              new ExponentNumber(1, power.value),
            );

            return new ExponentNumber(powerMult.exponentFactor + 1, powerMult.value);
          }

          default: {
            if (this.value < 1) {
              return new ExponentNumber(0, 0);
            }

            return new ExponentNumber(
              power.exponentFactor + 1,
              new ExponentNumber(0, Math.log10(this.value)).multiply(
                new ExponentNumber(power.exponentFactor, power.value),
              ).value,
            );
          }
        }
      }

      case 1: {
        switch (power.exponentFactor) {
          case 0: {
            return new ExponentNumber(1, this.value * power.value);
          }

          case 1: {
            return new ExponentNumber(2, new ExponentNumber(0, this.value).multiply(power).value);
          }

          default: {
            return new ExponentNumber(
              power.exponentFactor + 1,
              new ExponentNumber(0, this.value).multiply(
                new ExponentNumber(power.exponentFactor, power.value),
              ).value,
            );
          }
        }
      }

      default: {
        switch (power.exponentFactor) {
          case 0: {
            return new ExponentNumber(
              this.exponentFactor,
              new ExponentNumber(this.exponentFactor - 1, this.value).multiply(
                new ExponentNumber(power.exponentFactor, power.value),
              ).value,
            );
          }

          case 1: {
            return new ExponentNumber(
              this.exponentFactor,
              new ExponentNumber(this.exponentFactor - 1, this.value).multiply(
                new ExponentNumber(power.exponentFactor, power.value),
              ).value,
            );
          }

          default: {
            const powerMult = new ExponentNumber(this.exponentFactor - 1, this.value).multiply(
              new ExponentNumber(power.exponentFactor, power.value),
            );

            return new ExponentNumber(powerMult.exponentFactor + 1, powerMult.value);
          }
        }
      }
    }
  }

  root(base: ExponentNumber): ExponentNumber {
    const isBaseSmaller = this.isGreaterThanValue(base);

    switch (this.exponentFactor) {
      case 0: {
        switch (base.exponentFactor) {
          case 0: {
            return new ExponentNumber(0, Math.pow(this.value, 1 / base.value));
          }

          case 1: {
            if (this.value <= 1) {
              return new ExponentNumber(0, 1);
            }

            return new ExponentNumber(
              0,
              new ExponentNumber(0, Math.log10(this.value)).divide(base).value,
            );
          }

          default: {
            return new ExponentNumber(0, 1);
          }
        }
      }

      case 1: {
        switch (base.exponentFactor) {
          case 0: {
            if (base.value <= 0) {
              return new ExponentNumber(0, 1);
            }

            return new ExponentNumber(1, new ExponentNumber(0, this.value).divide(base).value);
          }

          case 1: {
            return new ExponentNumber(0, new ExponentNumber(0, this.value).divide(base).value);
          }

          default: {
            return new ExponentNumber(0, 1);
          }
        }
      }

      default: {
        switch (base.exponentFactor) {
          case 0: {
            return new ExponentNumber(
              this.exponentFactor,
              new ExponentNumber(this.exponentFactor - 1, this.value).divide(base).value,
            );
          }

          case 1: {
            return new ExponentNumber(
              this.exponentFactor - 1,
              new ExponentNumber(this.exponentFactor - 1, this.value).divide(base).value,
            );
          }

          default: {
            if (base.isGreaterThanValue(new ExponentNumber(this.exponentFactor - 1, this.value))) {
              return new ExponentNumber(0, 0);
            }

            const powerDivide = new ExponentNumber(this.exponentFactor - 1, this.value).divide(
              base,
            );

            return new ExponentNumber(powerDivide.exponentFactor + 1, powerDivide.value);
          }
        }
      }
    }
  }

  sqrt(): ExponentNumber {
    return this.root(new ExponentNumber(0, 2));
  }

  log(base: ExponentNumber): ExponentNumber {
    if (this.value < 0 || base.value < 1) {
      return new ExponentNumber(this.exponentFactor, this.value);
    }

    switch (this.exponentFactor) {
      case 0: {
        switch (base.exponentFactor) {
          case 0: {
            return new ExponentNumber(0, Math.log10(this.value) / Math.log10(base.value));
          }

          case 1: {
            console.log(Math.log10(this.value), base.value);
            return new ExponentNumber(0, Math.log10(this.value) / base.value);
          }

          default: {
            return new ExponentNumber(0, 0);
          }
        }
      }

      case 1: {
        switch (base.exponentFactor) {
          case 0: {
            return new ExponentNumber(0, this.value / Math.log10(base.value));
          }

          case 1: {
            return new ExponentNumber(0, this.value / base.value);
          }

          default: {
            return new ExponentNumber(0, this.value).divide(
              new ExponentNumber(base.exponentFactor - 1, base.value),
            );
          }
        }
      }

      default: {
        switch (base.exponentFactor) {
          case 0: {
            return new ExponentNumber(this.exponentFactor - 1, this.value).divide(
              new ExponentNumber(0, Math.log10(base.value)),
            );
          }

          case 1: {
            return new ExponentNumber(this.exponentFactor - 1, this.value).divide(
              new ExponentNumber(0, base.value),
            );
          }

          default: {
            return new ExponentNumber(this.exponentFactor - 1, this.value).divide(
              new ExponentNumber(base.exponentFactor - 1, base.value),
            );
          }
        }
      }
    }
  }

  log10(): ExponentNumber {
    return new ExponentNumber(this.exponentFactor - 1, this.value);
  }

  isGreaterThanValue(otherNumber: ExponentNumber): boolean {
    return (
      this.exponentFactor > otherNumber.exponentFactor ||
      (this.exponentFactor === otherNumber.exponentFactor && this.value > otherNumber.value)
    );
  }

  isEqual(otherNumber: ExponentNumber): boolean {
    return otherNumber.exponentFactor === this.exponentFactor && otherNumber.value === this.value;
  }

  isGreaterThanOrEqualValue(otherNumber: ExponentNumber): boolean {
    return this.isGreaterThanValue(otherNumber) || this.isEqual(otherNumber);
  }
}
