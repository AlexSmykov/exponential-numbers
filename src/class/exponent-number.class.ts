import {
  minusDifferentExponentLevelNumber,
  minusEqualExponentLevelNumber,
  plusDifferentExponentLevelNumber,
  plusEqualExponentLevelNumber,
} from '../utils/util-math.utils';
import { DEFAULT_FORMAT, ExponentNumberFormat } from './exponent-number-format.class';
import { FormatOptions } from '../interfaces/notation.interface';
import { VALUE_EXPONENT_DIFFERENCE_LIMIT, VALUE_EXPONENT_LIMIT } from '../const';

const NUMBER_TEXT_PATTERN = /^(e*)(?:\((\d+)\))?(\d+(?:\.\d+)?(?:e[+-]?\d+)?)$/;

export interface ExponentNumberLike {
  exponentFactor: number;
  value: number;
}

export type ExponentNumberSource = ExponentNumber | ExponentNumberLike | number | string;

export class ExponentNumber {
  static readonly ZERO = new ExponentNumber(0, 0);
  static readonly ONE = new ExponentNumber(0, 1);

  readonly exponentFactor: number;
  readonly value: number;

  constructor(exponentFactor = 0, value = 0) {
    if (!Number.isInteger(exponentFactor)) {
      throw new RangeError('Expected exponentFactor to be an integer');
    }

    if (!Number.isFinite(value)) {
      throw new RangeError('Expected value to be a finite number');
    }

    if (exponentFactor <= 0 && value < 0) {
      throw new RangeError('Negative numbers are not supported');
    }

    while (Math.log10(value) >= VALUE_EXPONENT_LIMIT) {
      exponentFactor += 1;
      value = Math.log10(value);
    }

    while (exponentFactor >= 1 && value < VALUE_EXPONENT_LIMIT) {
      exponentFactor -= 1;
      value = Math.pow(10, value);
    }

    while (exponentFactor < 0) {
      exponentFactor += 1;
      value = Math.max(Math.log10(value), 0);
    }

    this.exponentFactor = exponentFactor;
    this.value = value;
  }

  static from(source: ExponentNumberSource): ExponentNumber {
    if (source instanceof ExponentNumber) {
      return source;
    }

    if (typeof source === 'number') {
      return new ExponentNumber(0, source);
    }

    if (typeof source === 'string') {
      const [, exponents, exponentCount, value] = NUMBER_TEXT_PATTERN.exec(source.trim()) ?? [];

      if (value === undefined || (exponentCount !== undefined && exponents !== 'e')) {
        throw new RangeError(`Expected valid number text, got "${source}"`);
      }

      return new ExponentNumber(
        exponentCount === undefined ? exponents.length : Number(exponentCount),
        Number(value),
      );
    }

    return new ExponentNumber(source.exponentFactor, source.value);
  }

  static max(first: ExponentNumberSource, second: ExponentNumberSource): ExponentNumber {
    const firstNumber = ExponentNumber.from(first);
    const secondNumber = ExponentNumber.from(second);

    return firstNumber.isGreaterThanOrEqualValue(secondNumber) ? firstNumber : secondNumber;
  }

  static min(first: ExponentNumberSource, second: ExponentNumberSource): ExponentNumber {
    const firstNumber = ExponentNumber.from(first);
    const secondNumber = ExponentNumber.from(second);

    return firstNumber.isGreaterThanValue(secondNumber) ? secondNumber : firstNumber;
  }

  toString(): string {
    return DEFAULT_FORMAT.format(this);
  }

  format(format: ExponentNumberFormat | FormatOptions = DEFAULT_FORMAT): string {
    return (
      format instanceof ExponentNumberFormat ? format : new ExponentNumberFormat(format)
    ).format(this);
  }

  toNumber(): number {
    if (this.exponentFactor === 0) {
      return this.value;
    }

    return this.exponentFactor === 1 ? Math.pow(10, this.value) : Infinity;
  }

  plus(otherNumberSource: ExponentNumberSource): ExponentNumber {
    const otherNumber = ExponentNumber.from(otherNumberSource);

    if (this.exponentFactor === otherNumber.exponentFactor) {
      if (this.exponentFactor > 1) {
        return this.value >= otherNumber.value ? this : otherNumber;
      }

      return plusEqualExponentLevelNumber(this, otherNumber);
    }

    if (this.exponentFactor <= 1 && otherNumber.exponentFactor <= 1) {
      return plusDifferentExponentLevelNumber(this, otherNumber);
    }

    return this.exponentFactor > otherNumber.exponentFactor ? this : otherNumber;
  }

  minus(otherNumberSource: ExponentNumberSource): ExponentNumber {
    const otherNumber = ExponentNumber.from(otherNumberSource);

    if (!this.isGreaterThanValue(otherNumber)) {
      return new ExponentNumber(0, 0);
    }

    if (this.exponentFactor > 1) {
      return this;
    }

    if (this.exponentFactor === otherNumber.exponentFactor) {
      return minusEqualExponentLevelNumber(this, otherNumber);
    }

    return minusDifferentExponentLevelNumber(this, otherNumber);
  }

  multiply(otherNumberSource: ExponentNumberSource): ExponentNumber {
    const otherNumber = ExponentNumber.from(otherNumberSource);

    if (this.isZero() || otherNumber.isZero()) {
      return new ExponentNumber(0, 0);
    }

    if (this.exponentFactor === 0 && otherNumber.exponentFactor === 0) {
      return new ExponentNumber(0, this.value * otherNumber.value);
    }

    if (this.exponentFactor <= 1 && otherNumber.exponentFactor <= 1) {
      return new ExponentNumber(1, this.log10Value() + otherNumber.log10Value());
    }

    if (this.exponentFactor === 0) {
      return otherNumber;
    }

    if (otherNumber.exponentFactor === 0) {
      return this;
    }

    const result = new ExponentNumber(this.exponentFactor - 1, this.value).plus(
      new ExponentNumber(otherNumber.exponentFactor - 1, otherNumber.value),
    );

    return new ExponentNumber(result.exponentFactor + 1, result.value);
  }

  divide(otherNumberSource: ExponentNumberSource): ExponentNumber {
    const otherNumber = ExponentNumber.from(otherNumberSource);

    if (otherNumber.isZero()) {
      throw new RangeError('Division by zero');
    }

    if (this.isZero()) {
      return this;
    }

    if (
      this.exponentFactor === 0 &&
      otherNumber.exponentFactor === 0 &&
      Number.isFinite(this.value / otherNumber.value)
    ) {
      return new ExponentNumber(0, this.value / otherNumber.value);
    }

    if (this.exponentFactor <= 1 && otherNumber.exponentFactor <= 1) {
      const exponentDifference = this.log10Value() - otherNumber.log10Value();

      if (exponentDifference <= -VALUE_EXPONENT_DIFFERENCE_LIMIT) {
        return new ExponentNumber(0, 0);
      }

      return new ExponentNumber(1, exponentDifference);
    }

    if (otherNumber.exponentFactor === 0) {
      return this;
    }

    if (otherNumber.isGreaterThanValue(this)) {
      return new ExponentNumber(0, 0);
    }

    if (this.isEqual(otherNumber)) {
      return new ExponentNumber(0, 1);
    }

    const result = new ExponentNumber(this.exponentFactor - 1, this.value).minus(
      new ExponentNumber(otherNumber.exponentFactor - 1, otherNumber.value),
    );

    return new ExponentNumber(result.exponentFactor + 1, result.value);
  }

  power(powerSource: ExponentNumberSource): ExponentNumber {
    const power = ExponentNumber.from(powerSource);

    if (
      this.exponentFactor === 0 &&
      power.exponentFactor === 0 &&
      Number.isFinite(Math.pow(this.value, power.value))
    ) {
      return new ExponentNumber(0, Math.pow(this.value, power.value));
    }

    if (this.exponentFactor === 0 && this.value < 1) {
      return new ExponentNumber(0, 0);
    }

    const result = new ExponentNumber(this.exponentFactor, Math.log10(this.value)).multiply(power);

    return new ExponentNumber(result.exponentFactor + 1, result.value);
  }

  root(otherNumberSource: ExponentNumberSource): ExponentNumber {
    const otherNumber = ExponentNumber.from(otherNumberSource);

    if (otherNumber.isZero()) {
      throw new RangeError('Expected root degree to be greater than 0');
    }

    if (
      this.exponentFactor === 0 &&
      otherNumber.exponentFactor === 0 &&
      Number.isFinite(Math.pow(this.value, 1 / otherNumber.value))
    ) {
      return new ExponentNumber(0, Math.pow(this.value, 1 / otherNumber.value));
    }

    if (this.exponentFactor === 0 && this.value < 1) {
      return new ExponentNumber(0, this.value === 0 ? 0 : 1);
    }

    const result = new ExponentNumber(this.exponentFactor, Math.log10(this.value)).divide(
      otherNumber,
    );

    return new ExponentNumber(result.exponentFactor + 1, result.value);
  }

  sqrt(): ExponentNumber {
    return this.root(2);
  }

  log(baseSource: ExponentNumberSource): ExponentNumber {
    const base = ExponentNumber.from(baseSource);

    if (base.exponentFactor === 0 && (base.value === 0 || base.value === 1)) {
      throw new RangeError('Expected logarithm base to be greater than 0 and not equal to 1');
    }

    if (this.exponentFactor === 0 && base.exponentFactor === 0) {
      return new ExponentNumber(0, Math.max(Math.log10(this.value) / Math.log10(base.value), 0));
    }

    if (
      (this.exponentFactor === 0 && this.value < 1) ||
      (base.exponentFactor === 0 && base.value < 1)
    ) {
      return new ExponentNumber(0, 0);
    }

    return new ExponentNumber(this.exponentFactor, Math.log10(this.value)).divide(
      new ExponentNumber(base.exponentFactor, Math.log10(base.value)),
    );
  }

  log10(): ExponentNumber {
    return new ExponentNumber(this.exponentFactor - 1, this.value);
  }

  ln(): ExponentNumber {
    return this.log10().multiply(Math.LN10);
  }

  pow10(): ExponentNumber {
    return new ExponentNumber(this.exponentFactor + 1, this.value);
  }

  exp(): ExponentNumber {
    if (this.exponentFactor === 0 && Number.isFinite(Math.exp(this.value))) {
      return new ExponentNumber(0, Math.exp(this.value));
    }

    return this.multiply(Math.LOG10E).pow10();
  }

  floor(): ExponentNumber {
    return this.exponentFactor === 0 ? new ExponentNumber(0, Math.floor(this.value)) : this;
  }

  ceil(): ExponentNumber {
    return this.exponentFactor === 0 ? new ExponentNumber(0, Math.ceil(this.value)) : this;
  }

  round(): ExponentNumber {
    return this.exponentFactor === 0 ? new ExponentNumber(0, Math.round(this.value)) : this;
  }

  isGreaterThanValue(otherNumberSource: ExponentNumberSource): boolean {
    return this.compare(otherNumberSource) > 0;
  }

  isEqual(otherNumberSource: ExponentNumberSource): boolean {
    return this.compare(otherNumberSource) === 0;
  }

  isGreaterThanOrEqualValue(otherNumberSource: ExponentNumberSource): boolean {
    return this.compare(otherNumberSource) >= 0;
  }

  isLessThanValue(otherNumberSource: ExponentNumberSource): boolean {
    return this.compare(otherNumberSource) < 0;
  }

  isLessThanOrEqualValue(otherNumberSource: ExponentNumberSource): boolean {
    return this.compare(otherNumberSource) <= 0;
  }

  compare(otherNumberSource: ExponentNumberSource): number {
    const otherNumber = ExponentNumber.from(otherNumberSource);

    if (this.exponentFactor !== otherNumber.exponentFactor) {
      return this.exponentFactor > otherNumber.exponentFactor ? 1 : -1;
    }

    if (this.value === otherNumber.value) {
      return 0;
    }

    return this.value > otherNumber.value ? 1 : -1;
  }

  isZero(): boolean {
    return this.exponentFactor === 0 && this.value === 0;
  }

  private log10Value(): number {
    return this.exponentFactor === 0 ? Math.log10(this.value) : this.value;
  }
}
