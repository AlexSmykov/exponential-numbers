import { ExponentNumber, ExponentNumberSource } from './exponent-number.class';
import { scientificNotation } from '../notations/notations';
import { FormatOptions, Notation } from '../interfaces/notation.interface';
import { DECIMAL_DIGITS, EXPONENT_COUNT_LIMIT, VALUE_EXPONENT_LIMIT } from '../const';

const MAX_DIGITS = 100;

export class ExponentNumberFormat {
  readonly notation: Notation;
  readonly digits: number;
  readonly exponentCountLimit: number;

  constructor(options: FormatOptions = {}) {
    const {
      notation = scientificNotation,
      digits = DECIMAL_DIGITS,
      exponentCountLimit = EXPONENT_COUNT_LIMIT,
    } = options;

    if (!Number.isInteger(digits) || digits < 1 || digits > MAX_DIGITS) {
      throw new RangeError(`Expected digits to be an integer from 1 to ${MAX_DIGITS}`);
    }

    if (!Number.isInteger(exponentCountLimit) || exponentCountLimit < 0) {
      throw new RangeError('Expected exponentCountLimit to be a non-negative integer');
    }

    this.notation = notation;
    this.digits = digits;
    this.exponentCountLimit = exponentCountLimit;
  }

  format(source: ExponentNumberSource): string {
    let { exponentFactor, value } = ExponentNumber.from(source);

    if (Number(value.toPrecision(this.digits)) >= Math.pow(10, VALUE_EXPONENT_LIMIT)) {
      exponentFactor += 1;
      value = VALUE_EXPONENT_LIMIT;
    }

    if (exponentFactor === 0) {
      return this.notation.format(value, this.digits);
    }

    const exponentText =
      exponentFactor <= this.exponentCountLimit
        ? 'e'.repeat(exponentFactor)
        : `e(${exponentFactor})`;

    return `${exponentText}${scientificNotation.format(value, this.digits)}`;
  }
}

export const DEFAULT_FORMAT = new ExponentNumberFormat();
