import { describe, expect, test } from '@jest/globals';
import {
  engineeringNotation,
  ExponentNumber,
  ExponentNumberFormat,
  lettersNotation,
  logarithmNotation,
  Notation,
  standardNotation,
} from '../src';
import { EXPONENT_COUNT_LIMIT, VALUE_EXPONENT_DIFFERENCE_LIMIT } from '../src/const';

describe('Print test', () => {
  test('1', () => {
    expect(new ExponentNumber(0, 1).toString()).toBe('1');
  });

  test('2', () => {
    expect(new ExponentNumber(0, 1.2345).toString()).toBe('1.2345');
  });

  test('3', () => {
    expect(new ExponentNumber(0, 1.23451).toString()).toBe('1.2345');
  });

  test('4', () => {
    expect(new ExponentNumber(1, 1).toString()).toBe('10');
  });

  test('5', () => {
    expect(
      new ExponentNumber(0, Math.pow(10, VALUE_EXPONENT_DIFFERENCE_LIMIT + 1)).toString(),
    ).toBe('1e10');
  });

  test('6', () => {
    expect(
      new ExponentNumber(0, Math.pow(10, VALUE_EXPONENT_DIFFERENCE_LIMIT + 1.1)).toString(),
    ).toBe('1.2589e10');
  });

  test('7', () => {
    expect(
      new ExponentNumber(1, Math.pow(10, VALUE_EXPONENT_DIFFERENCE_LIMIT + 1)).toString(),
    ).toBe('e1e10');
  });

  test('8', () => {
    expect(
      new ExponentNumber(1, Math.pow(10, VALUE_EXPONENT_DIFFERENCE_LIMIT + 1.1)).toString(),
    ).toBe('e1.2589e10');
  });

  test('9', () => {
    expect(new ExponentNumber(5, 100).toString()).toBe('eeeee100');
  });

  test('10', () => {
    expect(new ExponentNumber(5, 1).toString()).toBe('eee1e10');
  });

  test('11', () => {
    expect(new ExponentNumber(0, 9.999e99).toString()).toBe('9.999e99');
  });

  test('12', () => {
    expect(new ExponentNumber(0, 1e100).toString()).toBe('e100');
  });

  test('13', () => {
    expect(new ExponentNumber(0, 0).toString()).toBe('0');
  });

  test('14', () => {
    expect(new ExponentNumber(10, 100).toString()).toBe('e(10)100');
  });

  test('15', () => {
    expect(new ExponentNumber(EXPONENT_COUNT_LIMIT, 100).toString()).toBe(
      `${'e'.repeat(EXPONENT_COUNT_LIMIT)}100`,
    );
  });

  test('16', () => {
    expect(new ExponentNumber(EXPONENT_COUNT_LIMIT + 1, 100).toString()).toBe(
      `e(${EXPONENT_COUNT_LIMIT + 1})100`,
    );
  });
});

describe('Plus test', () => {
  test('1', () => {
    const first = new ExponentNumber(0, 10);
    const second = new ExponentNumber(0, 10);
    expect(first.plus(second).toString()).toBe('20');
  });

  test('2', () => {
    const first = new ExponentNumber(0, 0);
    const second = new ExponentNumber(0, 0);
    expect(first.plus(second).toString()).toBe('0');
  });

  test('3', () => {
    const first = new ExponentNumber(0, 1.234);
    const second = new ExponentNumber(0, 1.234);
    expect(first.plus(second).toString()).toBe('2.468');
  });

  test('4', () => {
    const first = new ExponentNumber(0, 1.00005);
    const second = new ExponentNumber(0, 0.00005);
    expect(first.plus(second).toString()).toBe('1.0001');
  });

  test('5', () => {
    const first = new ExponentNumber(0, 1);
    const second = new ExponentNumber(0, 0.000051);
    expect(first.plus(second).toString()).toBe('1.0001');
  });

  test('6', () => {
    const first = new ExponentNumber(1, 100);
    const second = new ExponentNumber(0, 1);
    expect(first.plus(second).toString()).toBe('e100');
  });

  test('7', () => {
    const first = new ExponentNumber(1, 100);
    const second = new ExponentNumber(1, 100);
    expect(first.plus(second).toString()).toBe('e100.3');
  });

  test('8', () => {
    const first = new ExponentNumber(1, 100);
    const second = new ExponentNumber(1, 101);
    expect(first.plus(second).toString()).toBe('e101.04');
  });

  test('9', () => {
    const first = new ExponentNumber(2, 100);
    const second = new ExponentNumber(2, 100);
    expect(first.plus(second).toString()).toBe('ee100');
  });

  test('10', () => {
    const first = new ExponentNumber(1, 1e20);
    const second = new ExponentNumber(1, 1e20);
    expect(first.plus(second).toString()).toBe('e1e20');
  });

  test('11', () => {
    const first = new ExponentNumber(1, 100);
    const second = new ExponentNumber(0, 9.999e99);
    expect(first.plus(second).toString()).toBe('e100.3');
  });

  test('12', () => {
    const first = new ExponentNumber(0, 9.999e99);
    const second = new ExponentNumber(1, 100);
    expect(first.plus(second).toString()).toBe('e100.3');
  });

  test('13', () => {
    const first = new ExponentNumber(2, 100);
    const second = new ExponentNumber(3, 100);
    expect(first.plus(second).toString()).toBe('eee100');
  });

  test('14', () => {
    const first = new ExponentNumber(3, 100);
    const second = new ExponentNumber(2, 100);
    expect(first.plus(second).toString()).toBe('eee100');
  });
});

describe('Minus test', () => {
  test('1', () => {
    const first = new ExponentNumber(0, 20);
    const second = new ExponentNumber(0, 10);
    expect(first.minus(second).toString()).toBe('10');
  });

  test('2', () => {
    const first = new ExponentNumber(0, 0);
    const second = new ExponentNumber(0, 0);
    expect(first.minus(second).toString()).toBe('0');
  });

  test('3', () => {
    const first = new ExponentNumber(0, 2.468);
    const second = new ExponentNumber(0, 1.234);
    expect(first.minus(second).toString()).toBe('1.234');
  });

  test('4', () => {
    const first = new ExponentNumber(0, 1.0001);
    const second = new ExponentNumber(0, 0.00004);
    expect(first.minus(second).toString()).toBe('1.0001');
  });

  test('5', () => {
    const first = new ExponentNumber(0, 1.0001);
    const second = new ExponentNumber(0, 0.000051);
    expect(first.minus(second).toString()).toBe('1');
  });

  test('6', () => {
    const first = new ExponentNumber(1, 100);
    const second = new ExponentNumber(0, 1);
    expect(first.minus(second).toString()).toBe('e100');
  });

  test('7', () => {
    const first = new ExponentNumber(0, 1.1e100);
    const second = new ExponentNumber(1, 100);
    expect(first.minus(second).toString()).toBe('1e99');
  });

  test('8', () => {
    const first = new ExponentNumber(1, 100);
    const second = new ExponentNumber(1, 101);
    expect(first.minus(second).toString()).toBe('0');
  });

  test('9', () => {
    const first = new ExponentNumber(2, 100);
    const second = new ExponentNumber(2, 100);
    expect(first.minus(second).toString()).toBe('0');
  });

  test('10', () => {
    const first = new ExponentNumber(1, 100);
    const second = new ExponentNumber(0, 9.999e99);
    expect(first.minus(second).toString()).toBe('1e96');
  });

  test('11', () => {
    const first = new ExponentNumber(2, 100);
    const second = new ExponentNumber(3, 100);
    expect(first.minus(second).toString()).toBe('0');
  });
});

describe('Multiply test', () => {
  test('1', () => {
    const first = new ExponentNumber(0, 10);
    const second = new ExponentNumber(0, 10);
    expect(first.multiply(second).toString()).toBe('100');
  });

  test('2', () => {
    const first = new ExponentNumber(0, 1);
    const second = new ExponentNumber(0, 1);
    expect(first.multiply(second).toString()).toBe('1');
  });

  test('3', () => {
    const first = new ExponentNumber(0, 100);
    const second = new ExponentNumber(0, 0);
    expect(first.multiply(second).toString()).toBe('0');
  });

  test('4', () => {
    const first = new ExponentNumber(0, 10);
    const second = new ExponentNumber(0, 0.01);
    expect(first.multiply(second).toString()).toBe('0.1');
  });

  test('5', () => {
    const first = new ExponentNumber(0, 1000000);
    const second = new ExponentNumber(0, 1000000);
    expect(first.multiply(second).toString()).toBe('1e12');
  });

  test('6', () => {
    const first = new ExponentNumber(0, 1e50);
    const second = new ExponentNumber(0, 1e50);
    expect(first.multiply(second).toString()).toBe('e100');
  });

  test('7', () => {
    const first = new ExponentNumber(1, 100);
    const second = new ExponentNumber(1, 100);
    expect(first.multiply(second).toString()).toBe('e200');
  });

  test('8', () => {
    const first = new ExponentNumber(1, 100);
    const second = new ExponentNumber(0, 100);
    expect(first.multiply(second).toString()).toBe('e102');
  });

  test('9', () => {
    const first = new ExponentNumber(0, 100);
    const second = new ExponentNumber(1, 100);
    expect(first.multiply(second).toString()).toBe('e102');
  });

  test('10', () => {
    const first = new ExponentNumber(2, 100);
    const second = new ExponentNumber(1, 100);
    expect(first.multiply(second).toString()).toBe('ee100');
  });

  test('11', () => {
    const first = new ExponentNumber(2, 100);
    const second = new ExponentNumber(2, 100);
    expect(first.multiply(second).toString()).toBe('ee100.3');
  });

  test('12', () => {
    const first = new ExponentNumber(2, 100);
    const second = new ExponentNumber(1, 9.999e99);
    expect(first.multiply(second).toString()).toBe('ee100.3');
  });

  test('13', () => {
    const first = new ExponentNumber(0, 0.5);
    const second = new ExponentNumber(0, 0.1);
    expect(first.multiply(second).toString()).toBe('0.05');
  });

  test('14', () => {
    const first = new ExponentNumber(0, 0.1);
    const second = new ExponentNumber(1, 100);
    expect(first.multiply(second).toString()).toBe('1e99');
  });
});

describe('Divide test', () => {
  test('1', () => {
    const first = new ExponentNumber(0, 100);
    const second = new ExponentNumber(0, 10);
    expect(first.divide(second).toString()).toBe('10');
  });

  test('2', () => {
    const first = new ExponentNumber(0, 1);
    const second = new ExponentNumber(0, 1);
    expect(first.divide(second).toString()).toBe('1');
  });

  test('3', () => {
    const first = new ExponentNumber(0, 0);
    const second = new ExponentNumber(0, 100);
    expect(first.divide(second).toString()).toBe('0');
  });

  test('4', () => {
    const first = new ExponentNumber(0, 1);
    const second = new ExponentNumber(0, 0.01);
    expect(first.divide(second).toString()).toBe('100');
  });

  test('5', () => {
    const first = new ExponentNumber(0, 0.01);
    const second = new ExponentNumber(0, 1);
    expect(first.divide(second).toString()).toBe('0.01');
  });

  test('6', () => {
    const first = new ExponentNumber(0, 1e12);
    const second = new ExponentNumber(0, 1000000);
    expect(first.divide(second).toString()).toBe('1000000');
  });

  test('7', () => {
    const first = new ExponentNumber(1, 100);
    const second = new ExponentNumber(0, 1e50);
    expect(first.divide(second).toString()).toBe('1e50');
  });

  test('8', () => {
    const first = new ExponentNumber(1, 200);
    const second = new ExponentNumber(1, 100);
    expect(first.divide(second).toString()).toBe('e100');
  });

  test('9', () => {
    const first = new ExponentNumber(1, 103);
    const second = new ExponentNumber(0, 100);
    expect(first.divide(second).toString()).toBe('e101');
  });

  test('10', () => {
    const first = new ExponentNumber(2, 100);
    const second = new ExponentNumber(1, 100);
    expect(first.divide(second).toString()).toBe('ee100');
  });

  test('11', () => {
    const first = new ExponentNumber(2, 101);
    const second = new ExponentNumber(2, 100);
    expect(first.divide(second).toString()).toBe('ee100.95');
  });

  test('12', () => {
    const first = new ExponentNumber(2, 100);
    const second = new ExponentNumber(1, 9.999e99);
    expect(first.divide(second).toString()).toBe('e1e96');
  });

  test('13', () => {
    const first = new ExponentNumber(0, 0.5);
    const second = new ExponentNumber(0, 0.1);
    expect(first.divide(second).toString()).toBe('5');
  });

  test('14', () => {
    const first = new ExponentNumber(0, 0.5);
    const second = new ExponentNumber(1, 100);
    expect(first.divide(second).toString()).toBe('0');
  });
});

describe('Power test', () => {
  test('1', () => {
    const first = new ExponentNumber(0, 3);
    const second = new ExponentNumber(0, 2);
    expect(first.power(second).toString()).toBe('9');
  });

  test('2', () => {
    const first = new ExponentNumber(0, 3);
    const second = new ExponentNumber(0, 4);
    expect(first.power(second).toString()).toBe('81');
  });

  test('3', () => {
    const first = new ExponentNumber(0, 10);
    const second = new ExponentNumber(0, 1.2);
    expect(first.power(second).toString()).toBe('15.849');
  });

  test('4', () => {
    const first = new ExponentNumber(1, 100);
    const second = new ExponentNumber(0, 1.2);
    expect(first.power(second).toString()).toBe('e120');
  });

  test('5', () => {
    const first = new ExponentNumber(1, 100);
    const second = new ExponentNumber(0, 10);
    expect(first.power(second).toString()).toBe('e1000');
  });

  test('6', () => {
    const first = new ExponentNumber(1, 100);
    const second = new ExponentNumber(1, 100);
    expect(first.power(second).toString()).toBe('ee102');
  });

  test('7', () => {
    const first = new ExponentNumber(2, 100);
    const second = new ExponentNumber(2, 100);
    expect(first.power(second).toString()).toBe('eee100');
  });

  test('8', () => {
    const first = new ExponentNumber(0, 9);
    const second = new ExponentNumber(0, 0.5);
    expect(first.power(second).toString()).toBe('3');
  });

  test('9', () => {
    const first = new ExponentNumber(0, 81);
    const second = new ExponentNumber(0, 0.25);
    expect(first.power(second).toString()).toBe('3');
  });

  test('10', () => {
    const first = new ExponentNumber(0, 100);
    const second = new ExponentNumber(0, 0.1);
    expect(first.power(second).toString()).toBe('1.5849');
  });

  test('11', () => {
    const first = new ExponentNumber(1, 1000);
    const second = new ExponentNumber(0, 0.1);
    expect(first.power(second).toString()).toBe('e100');
  });

  test('12', () => {
    const first = new ExponentNumber(0, 100);
    const second = new ExponentNumber(0, 0);
    expect(first.power(second).toString()).toBe('1');
  });

  test('13', () => {
    const first = new ExponentNumber(3, 100);
    const second = new ExponentNumber(3, 100);
    expect(first.power(second).toString()).toBe('eeee100');
  });

  test('14', () => {
    const first = new ExponentNumber(4, 100);
    const second = new ExponentNumber(4, 100);
    expect(first.power(second).toString()).toBe('eeeee100');
  });

  test('15', () => {
    const first = new ExponentNumber(1, 100);
    const second = new ExponentNumber(3, 100);
    expect(first.power(second).toString()).toBe('eeee100');
  });

  test('16', () => {
    const first = new ExponentNumber(0, 0.5);
    const second = new ExponentNumber(0, 2);
    expect(first.power(second).toString()).toBe('0.25');
  });

  test('16', () => {
    const first = new ExponentNumber(0, 0.5);
    const second = new ExponentNumber(0, 2);
    expect(first.power(second).toString()).toBe('0.25');
  });

  test('17', () => {
    const first = new ExponentNumber(0, 0.5);
    const second = new ExponentNumber(1, 100);
    expect(first.power(second).toString()).toBe('0');
  });
});

describe('Root test', () => {
  test('1', () => {
    const first = new ExponentNumber(0, 9);
    const second = new ExponentNumber(0, 2);
    expect(first.root(second).toString()).toBe('3');
  });

  test('2', () => {
    const first = new ExponentNumber(0, 81);
    const second = new ExponentNumber(0, 4);
    expect(first.root(second).toString()).toBe('3');
  });

  test('3', () => {
    const first = new ExponentNumber(0, 15.849);
    const second = new ExponentNumber(0, 1.2);
    expect(first.root(second).toString()).toBe('10');
  });

  test('4', () => {
    const first = new ExponentNumber(1, 144);
    const second = new ExponentNumber(0, 1.2);
    expect(first.root(second).toString()).toBe('e120');
  });

  test('5', () => {
    const first = new ExponentNumber(1, 1000);
    const second = new ExponentNumber(0, 10);
    expect(first.root(second).toString()).toBe('e100');
  });

  test('6', () => {
    const first = new ExponentNumber(2, 103);
    const second = new ExponentNumber(1, 100);
    expect(first.root(second).toString()).toBe('e1000');
  });

  test('7', () => {
    const first = new ExponentNumber(3, 100);
    const second = new ExponentNumber(2, 100);
    expect(first.root(second).toString()).toBe('10');
  });

  test('8', () => {
    const first = new ExponentNumber(0, 3);
    const second = new ExponentNumber(0, 0.5);
    expect(first.root(second).toString()).toBe('9');
  });

  test('9', () => {
    const first = new ExponentNumber(0, 3);
    const second = new ExponentNumber(0, 0.25);
    expect(first.root(second).toString()).toBe('81');
  });

  test('10', () => {
    const first = new ExponentNumber(0, 1.5849);
    const second = new ExponentNumber(0, 0.1);
    expect(first.root(second).toString()).toBe('100');
  });

  test('11', () => {
    const first = new ExponentNumber(1, 100);
    const second = new ExponentNumber(0, 0.1);
    expect(first.root(second).toString()).toBe('e1000');
  });

  test('12', () => {
    const first = new ExponentNumber(3, 10);
    const second = new ExponentNumber(3, 10);
    expect(first.root(second).toString()).toBe('1');
  });

  test('13', () => {
    const first = new ExponentNumber(4, 100);
    const second = new ExponentNumber(3, 100);
    expect(first.root(second).toString()).toBe('10');
  });

  test('14', () => {
    const first = new ExponentNumber(0, 0.01);
    const second = new ExponentNumber(0, 2);
    expect(first.root(second).toString()).toBe('0.1');
  });

  test('15', () => {
    const first = new ExponentNumber(0, 0.1);
    const second = new ExponentNumber(1, 100);
    expect(first.root(second).toString()).toBe('1');
  });
});

describe('Log test', () => {
  test('1', () => {
    const first = new ExponentNumber(0, 8);
    const second = new ExponentNumber(0, 2);
    expect(first.log(second).toString()).toBe('3');
  });

  test('2', () => {
    const first = new ExponentNumber(0, 1000);
    const second = new ExponentNumber(0, 10);
    expect(first.log(second).toString()).toBe('3');
  });

  test('3', () => {
    const first = new ExponentNumber(1, 100);
    const second = new ExponentNumber(0, 10);
    expect(first.log(second).toString()).toBe('100');
  });

  test('4', () => {
    const first = new ExponentNumber(1, 6400);
    const second = new ExponentNumber(1, 80);
    expect(first.log(second).toString()).toBe('80');
  });

  test('5', () => {
    const first = new ExponentNumber(1, 10000);
    const second = new ExponentNumber(0, 100);
    expect(first.log(second).toString()).toBe('5000');
  });

  test('6', () => {
    const first = new ExponentNumber(0, 100);
    const second = new ExponentNumber(0, 100);
    expect(first.log(second).toString()).toBe('1');
  });

  test('7', () => {
    const first = new ExponentNumber(0, 10);
    const second = new ExponentNumber(0, 100);
    expect(first.log(second).toString()).toBe('0.5');
  });

  test('8', () => {
    const first = new ExponentNumber(0, 5);
    const second = new ExponentNumber(0, 1.2);
    expect(first.log(second).toString()).toBe('8.8275');
  });

  test('9', () => {
    const first = new ExponentNumber(1, 100);
    const second = new ExponentNumber(1, 200);
    expect(first.log(second).toString()).toBe('0.5');
  });

  test('10', () => {
    const first = new ExponentNumber(2, 100);
    const second = new ExponentNumber(2, 201);
    expect(first.log(second).toString()).toBe('0');
  });

  test('11', () => {
    const first = new ExponentNumber(0, 0.1);
    const second = new ExponentNumber(0, 10);
    expect(first.log(second).toString()).toBe('0');
  });

  test('12', () => {
    const first = new ExponentNumber(0, 0.1);
    const second = new ExponentNumber(1, 100);
    expect(first.log(second).toString()).toBe('0');
  });
});

describe('More than test', () => {
  test('1', () => {
    const first = new ExponentNumber(0, 1);
    const second = new ExponentNumber(0, 1);
    expect(first.isGreaterThanValue(second)).toBe(false);
  });

  test('2', () => {
    const first = new ExponentNumber(0, 1);
    const second = new ExponentNumber(0, 2);
    expect(first.isGreaterThanValue(second)).toBe(false);
  });

  test('3', () => {
    const first = new ExponentNumber(0, 2);
    const second = new ExponentNumber(0, 1);
    expect(first.isGreaterThanValue(second)).toBe(true);
  });

  test('4', () => {
    const first = new ExponentNumber(1, 1);
    const second = new ExponentNumber(0, 1);
    expect(first.isGreaterThanValue(second)).toBe(true);
  });

  test('5', () => {
    const first = new ExponentNumber(1, 1);
    const second = new ExponentNumber(1, 1);
    expect(first.isGreaterThanValue(second)).toBe(false);
  });

  test('6', () => {
    const first = new ExponentNumber(1, 2);
    const second = new ExponentNumber(1, 1);
    expect(first.isGreaterThanValue(second)).toBe(true);
  });

  test('7', () => {
    const first = new ExponentNumber(1, 1);
    const second = new ExponentNumber(2, 1);
    expect(first.isGreaterThanValue(second)).toBe(false);
  });

  test('8', () => {
    const first = new ExponentNumber(1, 1);
    const second = new ExponentNumber(1, 2);
    expect(first.isGreaterThanValue(second)).toBe(false);
  });

  test('9', () => {
    const first = new ExponentNumber(100, 100);
    const second = new ExponentNumber(99, 101);
    expect(first.isGreaterThanValue(second)).toBe(true);
  });
});

describe('Equal test', () => {
  test('1', () => {
    const first = new ExponentNumber(0, 1);
    const second = new ExponentNumber(0, 1);
    expect(first.isEqual(second)).toBe(true);
  });

  test('2', () => {
    const first = new ExponentNumber(0, 1);
    const second = new ExponentNumber(0, 2);
    expect(first.isEqual(second)).toBe(false);
  });

  test('3', () => {
    const first = new ExponentNumber(0, 2);
    const second = new ExponentNumber(0, 1);
    expect(first.isEqual(second)).toBe(false);
  });

  test('4', () => {
    const first = new ExponentNumber(1, 1);
    const second = new ExponentNumber(0, 1);
    expect(first.isEqual(second)).toBe(false);
  });

  test('5', () => {
    const first = new ExponentNumber(1, 1);
    const second = new ExponentNumber(1, 1);
    expect(first.isEqual(second)).toBe(true);
  });

  test('6', () => {
    const first = new ExponentNumber(1, 2);
    const second = new ExponentNumber(1, 1);
    expect(first.isEqual(second)).toBe(false);
  });

  test('7', () => {
    const first = new ExponentNumber(1, 1);
    const second = new ExponentNumber(2, 1);
    expect(first.isEqual(second)).toBe(false);
  });

  test('8', () => {
    const first = new ExponentNumber(1, 1);
    const second = new ExponentNumber(1, 2);
    expect(first.isEqual(second)).toBe(false);
  });

  test('9', () => {
    const first = new ExponentNumber(100, 100);
    const second = new ExponentNumber(99, 101);
    expect(first.isEqual(second)).toBe(false);
  });
});

describe('More than or equal test', () => {
  test('1', () => {
    const first = new ExponentNumber(0, 1);
    const second = new ExponentNumber(0, 1);
    expect(first.isGreaterThanOrEqualValue(second)).toBe(true);
  });

  test('2', () => {
    const first = new ExponentNumber(0, 1);
    const second = new ExponentNumber(0, 2);
    expect(first.isGreaterThanOrEqualValue(second)).toBe(false);
  });

  test('3', () => {
    const first = new ExponentNumber(0, 2);
    const second = new ExponentNumber(0, 1);
    expect(first.isGreaterThanOrEqualValue(second)).toBe(true);
  });

  test('4', () => {
    const first = new ExponentNumber(1, 1);
    const second = new ExponentNumber(0, 1);
    expect(first.isGreaterThanOrEqualValue(second)).toBe(true);
  });

  test('5', () => {
    const first = new ExponentNumber(1, 1);
    const second = new ExponentNumber(1, 1);
    expect(first.isGreaterThanOrEqualValue(second)).toBe(true);
  });

  test('6', () => {
    const first = new ExponentNumber(1, 2);
    const second = new ExponentNumber(1, 1);
    expect(first.isGreaterThanOrEqualValue(second)).toBe(true);
  });

  test('7', () => {
    const first = new ExponentNumber(1, 1);
    const second = new ExponentNumber(2, 1);
    expect(first.isGreaterThanOrEqualValue(second)).toBe(false);
  });

  test('8', () => {
    const first = new ExponentNumber(1, 1);
    const second = new ExponentNumber(1, 2);
    expect(first.isGreaterThanOrEqualValue(second)).toBe(false);
  });

  test('9', () => {
    const first = new ExponentNumber(100, 100);
    const second = new ExponentNumber(99, 101);
    expect(first.isGreaterThanOrEqualValue(second)).toBe(true);
  });
});

describe('Edge cases test', () => {
  test('1', () => {
    const first = new ExponentNumber(1, 200);
    const second = new ExponentNumber(1, 100);
    expect(first.minus(second).toString()).toBe('e200');
  });

  test('2', () => {
    const first = new ExponentNumber(0, 5);
    const second = new ExponentNumber(0, 7);
    expect(first.minus(second).toString()).toBe('0');
  });

  test('3', () => {
    const first = new ExponentNumber(0, 5);
    const second = new ExponentNumber(0, 100);
    expect(first.minus(second).toString()).toBe('0');
  });

  test('4', () => {
    const first = new ExponentNumber(2, 100);
    const second = new ExponentNumber(0, 0.5);
    expect(first.multiply(second).toString()).toBe('ee100');
  });

  test('5', () => {
    const first = new ExponentNumber(0, 0.1);
    const second = new ExponentNumber(2, 100);
    expect(first.multiply(second).toString()).toBe('ee100');
  });

  test('6', () => {
    const first = new ExponentNumber(0, 0);
    const second = new ExponentNumber(2, 100);
    expect(first.multiply(second).toString()).toBe('0');
  });

  test('7', () => {
    const first = new ExponentNumber(2, 100);
    const second = new ExponentNumber(0, 0.5);
    expect(first.divide(second).toString()).toBe('ee100');
  });

  test('8', () => {
    const first = new ExponentNumber(0, 5);
    const second = new ExponentNumber(0, 5);
    expect(first.multiply(second).value).toBe(25);
  });

  test('9', () => {
    const first = new ExponentNumber(0, 100);
    const second = new ExponentNumber(0, 0);
    expect(() => first.divide(second)).toThrow(RangeError);
  });

  test('10', () => {
    const first = new ExponentNumber(0, 100);
    const second = new ExponentNumber(0, 1);
    expect(() => first.log(second)).toThrow(RangeError);
  });

  test('11', () => {
    const first = new ExponentNumber(0, 100);
    const second = new ExponentNumber(0, 0);
    expect(() => first.root(second)).toThrow(RangeError);
  });

  test('12', () => {
    const first = new ExponentNumber(1, 100);
    const second = new ExponentNumber(1, 200);
    expect(first.root(second).toString()).toBe('1');
  });

  test('13', () => {
    const first = new ExponentNumber(0, 0);
    const second = new ExponentNumber(1, 100);
    expect(first.root(second).toString()).toBe('0');
  });

  test('14', () => {
    expect(new ExponentNumber(0, 0).log10().toString()).toBe('0');
  });

  test('15', () => {
    expect(new ExponentNumber(0, 1e-9).toString()).toBe('1e-9');
  });

  test('16', () => {
    expect(() => new ExponentNumber(0, Infinity)).toThrow(RangeError);
  });

  test('17', () => {
    expect(() => new ExponentNumber(0, NaN)).toThrow(RangeError);
  });

  test('18', () => {
    expect(() => new ExponentNumber(0, -5)).toThrow(RangeError);
  });

  test('19', () => {
    expect(() => new ExponentNumber(1.5, 100)).toThrow(RangeError);
  });

  test('20', () => {
    const first = new ExponentNumber(2, 100);
    const second = new ExponentNumber(2, 1e50);
    expect(first.plus(second).toString()).toBe('ee1e50');
  });
});

describe('Immutability test', () => {
  const operations = ['plus', 'minus', 'multiply', 'divide', 'power', 'root', 'log'] as const;
  const numbers = [
    [0, 0.5],
    [0, 20],
    [1, 150],
    [2, 100],
    [3, 100],
  ];

  test.each(operations)('%s does not change operands', (operation) => {
    numbers.forEach(([firstFactor, firstValue]) => {
      numbers.forEach(([secondFactor, secondValue]) => {
        const first = new ExponentNumber(firstFactor, firstValue);
        const second = new ExponentNumber(secondFactor, secondValue);
        const firstText = first.toString();
        const secondText = second.toString();

        first[operation](second);

        expect(first.toString()).toBe(firstText);
        expect(second.toString()).toBe(secondText);
      });
    });
  });

  test('sqrt and log10 do not change number', () => {
    const number = new ExponentNumber(1, 150);

    number.sqrt();
    number.log10();

    expect(number.toString()).toBe('e150');
  });

  test('operations can be chained', () => {
    const number = new ExponentNumber(0, 10);

    expect(number.plus(number).multiply(number).sqrt().toString()).toBe('14.142');
  });
});

describe('From test', () => {
  test('1', () => {
    expect(ExponentNumber.from(5).toString()).toBe('5');
  });

  test('2', () => {
    expect(ExponentNumber.from('1.5e10').toString()).toBe('1.5e10');
  });

  test('3', () => {
    expect(ExponentNumber.from('e100').toString()).toBe('e100');
  });

  test('4', () => {
    expect(ExponentNumber.from('ee1e50').toString()).toBe('ee1e50');
  });

  test('5', () => {
    expect(ExponentNumber.from('e(10)100').toString()).toBe('e(10)100');
  });

  test('6', () => {
    expect(ExponentNumber.from('e5').toString()).toBe('100000');
  });

  test('7', () => {
    expect(ExponentNumber.from({ exponentFactor: 2, value: 100 }).toString()).toBe('ee100');
  });

  test('8', () => {
    const number = new ExponentNumber(2, 1.2345e50);
    expect(ExponentNumber.from(JSON.parse(JSON.stringify(number))).isEqual(number)).toBe(true);
  });

  test('9', () => {
    const number = new ExponentNumber(1, 100);
    expect(ExponentNumber.from(number)).toBe(number);
  });

  test('10', () => {
    expect(() => ExponentNumber.from('abc')).toThrow(RangeError);
  });

  test('11', () => {
    expect(() => ExponentNumber.from('')).toThrow(RangeError);
  });

  test('12', () => {
    expect(() => ExponentNumber.from('-5')).toThrow(RangeError);
  });

  test('13', () => {
    expect(() => ExponentNumber.from('ee(3)5')).toThrow(RangeError);
  });

  test('14', () => {
    expect(() => ExponentNumber.from(-5)).toThrow(RangeError);
  });

  test('15', () => {
    expect(ExponentNumber.ZERO.toString()).toBe('0');
  });

  test('16', () => {
    expect(ExponentNumber.ONE.toString()).toBe('1');
  });

  test('17', () => {
    expect(new ExponentNumber(0, 10).plus(5).toString()).toBe('15');
  });

  test('18', () => {
    expect(new ExponentNumber(0, 100).multiply('e100').toString()).toBe('e102');
  });

  test('19', () => {
    expect(new ExponentNumber(1, 100).power(2).toString()).toBe('e200');
  });
});

describe('Compare test', () => {
  test('1', () => {
    expect(new ExponentNumber(0, 1).compare(2)).toBe(-1);
  });

  test('2', () => {
    expect(new ExponentNumber(0, 2).compare(2)).toBe(0);
  });

  test('3', () => {
    expect(new ExponentNumber(1, 100).compare(5)).toBe(1);
  });

  test('4', () => {
    expect(new ExponentNumber(2, 100).compare(new ExponentNumber(2, 101))).toBe(-1);
  });

  test('5', () => {
    expect(new ExponentNumber(0, 1).isLessThanValue(2)).toBe(true);
  });

  test('6', () => {
    expect(new ExponentNumber(0, 2).isLessThanValue(2)).toBe(false);
  });

  test('7', () => {
    expect(new ExponentNumber(1, 100).isLessThanValue(5)).toBe(false);
  });

  test('8', () => {
    expect(new ExponentNumber(0, 2).isLessThanOrEqualValue(2)).toBe(true);
  });

  test('9', () => {
    expect(new ExponentNumber(0, 3).isLessThanOrEqualValue(2)).toBe(false);
  });

  test('10', () => {
    expect(ExponentNumber.max(5, 'e100').toString()).toBe('e100');
  });

  test('11', () => {
    expect(ExponentNumber.min(5, 'e100').toString()).toBe('5');
  });

  test('12', () => {
    expect(ExponentNumber.ZERO.isZero()).toBe(true);
  });

  test('13', () => {
    expect(ExponentNumber.ONE.isZero()).toBe(false);
  });

  test('14', () => {
    const numbers = ['e100', 5, 'ee100', 0].map((source) => ExponentNumber.from(source));
    numbers.sort((first, second) => first.compare(second));
    expect(numbers.join(' ')).toBe('0 5 e100 ee100');
  });
});

describe('To number test', () => {
  test('1', () => {
    expect(new ExponentNumber(0, 5).toNumber()).toBe(5);
  });

  test('2', () => {
    expect(new ExponentNumber(1, 150).toNumber()).toBe(1e150);
  });

  test('3', () => {
    expect(new ExponentNumber(1, 400).toNumber()).toBe(Infinity);
  });

  test('4', () => {
    expect(new ExponentNumber(2, 100).toNumber()).toBe(Infinity);
  });
});

describe('Math functions test', () => {
  test('1', () => {
    expect(new ExponentNumber(0, Math.E).ln().toString()).toBe('1');
  });

  test('2', () => {
    expect(new ExponentNumber(1, 100).ln().toString()).toBe('230.26');
  });

  test('3', () => {
    expect(new ExponentNumber(2, 100).ln().toString()).toBe('e100.36');
  });

  test('4', () => {
    expect(new ExponentNumber(0, 0.5).ln().toString()).toBe('0');
  });

  test('5', () => {
    expect(new ExponentNumber(0, 1).exp().toString()).toBe('2.7183');
  });

  test('6', () => {
    expect(new ExponentNumber(0, 0).exp().toString()).toBe('1');
  });

  test('7', () => {
    expect(new ExponentNumber(0, 1000).exp().toString()).toBe('e434.29');
  });

  test('8', () => {
    expect(new ExponentNumber(1, 100).exp().toString()).toBe('e4.3429e99');
  });

  test('9', () => {
    expect(new ExponentNumber(2, 100).exp().toString()).toBe('eee100');
  });

  test('10', () => {
    expect(new ExponentNumber(0, 3).pow10().toString()).toBe('1000');
  });

  test('11', () => {
    expect(new ExponentNumber(0, 0).pow10().toString()).toBe('1');
  });

  test('12', () => {
    expect(new ExponentNumber(0, 150).pow10().toString()).toBe('e150');
  });

  test('13', () => {
    expect(new ExponentNumber(1, 100).pow10().toString()).toBe('ee100');
  });

  test('14', () => {
    expect(new ExponentNumber(2, 1e50).log10().pow10().toString()).toBe('ee1e50');
  });

  test('15', () => {
    expect(new ExponentNumber(0, 5.7).floor().toString()).toBe('5');
  });

  test('16', () => {
    expect(new ExponentNumber(0, 5.2).ceil().toString()).toBe('6');
  });

  test('17', () => {
    expect(new ExponentNumber(0, 5.5).round().toString()).toBe('6');
  });

  test('18', () => {
    expect(new ExponentNumber(0, 5.4).round().toString()).toBe('5');
  });

  test('19', () => {
    expect(new ExponentNumber(1, 100.5).floor().toString()).toBe('e100.5');
  });
});

describe('Format test', () => {
  test('1', () => {
    expect(new ExponentNumber(0, 123456789).toString()).toBe('123456789');
  });

  test('2', () => {
    expect(new ExponentNumber(0, 999999).toString()).toBe('999999');
  });

  test('3', () => {
    expect(new ExponentNumber(0, 123456.7).toString()).toBe('123457');
  });

  test('4', () => {
    expect(new ExponentNumber(0, 9.99996e99).toString()).toBe('e100');
  });

  test('5', () => {
    expect(new ExponentNumber(1, 9.99996e99).toString()).toBe('ee100');
  });

  test('6', () => {
    expect(new ExponentNumber(0, 123.456789).format({ digits: 8 })).toBe('123.45679');
  });

  test('7', () => {
    expect(new ExponentNumber(0, 1.23456e10).format({ digits: 3 })).toBe('1.23e10');
  });

  test('8', () => {
    expect(new ExponentNumber(10, 100).format({ exponentCountLimit: 12 })).toBe('eeeeeeeeee100');
  });

  test('9', () => {
    expect(new ExponentNumber(3, 100).format({ exponentCountLimit: 2 })).toBe('e(3)100');
  });

  test('10', () => {
    expect(ExponentNumber.from(12.3456789).format({ notation: engineeringNotation })).toBe(
      '12.346',
    );
  });

  test('11', () => {
    expect(ExponentNumber.from(1.23456e10).format({ notation: engineeringNotation })).toBe(
      '12.346e9',
    );
  });

  test('12', () => {
    expect(ExponentNumber.from(1.5e50).format({ notation: engineeringNotation })).toBe('150e48');
  });

  test('13', () => {
    expect(ExponentNumber.from(1.5e9).format({ notation: engineeringNotation })).toBe('1.5e9');
  });

  test('14', () => {
    expect(ExponentNumber.from(999).format({ notation: standardNotation })).toBe('999');
  });

  test('15', () => {
    expect(ExponentNumber.from(1234).format({ notation: standardNotation })).toBe('1.234K');
  });

  test('16', () => {
    expect(ExponentNumber.from(1234567).format({ notation: standardNotation, digits: 3 })).toBe(
      '1.23M',
    );
  });

  test('17', () => {
    expect(ExponentNumber.from(999999).format({ notation: standardNotation })).toBe('1M');
  });

  test('18', () => {
    expect(ExponentNumber.from(1.23456e10).format({ notation: standardNotation })).toBe('12.346B');
  });

  test('19', () => {
    expect(ExponentNumber.from(1.5e50).format({ notation: standardNotation })).toBe('150QiDc');
  });

  test('20', () => {
    expect(ExponentNumber.from(9.999e99).format({ notation: standardNotation })).toBe('9.999DTg');
  });

  test('21', () => {
    expect(ExponentNumber.from(1234).format({ notation: lettersNotation })).toBe('1.234a');
  });

  test('22', () => {
    expect(ExponentNumber.from(1234567).format({ notation: lettersNotation })).toBe('1.2346b');
  });

  test('23', () => {
    expect(ExponentNumber.from(1.5e78).format({ notation: lettersNotation })).toBe('1.5z');
  });

  test('24', () => {
    expect(ExponentNumber.from(1.5e81).format({ notation: lettersNotation })).toBe('1.5aa');
  });

  test('25', () => {
    expect(ExponentNumber.from(1.5e84).format({ notation: lettersNotation })).toBe('1.5ab');
  });

  test('26', () => {
    expect(ExponentNumber.from(1234567).format({ notation: logarithmNotation })).toBe('1234567');
  });

  test('27', () => {
    expect(ExponentNumber.from(1.23456e10).format({ notation: logarithmNotation })).toBe('e10.092');
  });

  test('28', () => {
    expect(ExponentNumber.from(1.5e50).format({ notation: logarithmNotation })).toBe('e50.176');
  });

  test('29', () => {
    expect(ExponentNumber.from('e150').format({ notation: standardNotation })).toBe('e150');
  });

  test('30', () => {
    expect(ExponentNumber.from('ee1e50').format({ notation: lettersNotation })).toBe('ee1e50');
  });

  test('31', () => {
    expect(ExponentNumber.from(0).format({ notation: standardNotation })).toBe('0');
  });

  test('32', () => {
    const notation: Notation = {
      format: (value, digits) =>
        value >= 1e6 ? `${Number((value / 1e6).toPrecision(digits))} mln` : value.toString(),
    };
    expect(new ExponentNumber(0, 1234567).format({ notation, digits: 3 })).toBe('1.23 mln');
  });
});

describe('Format class test', () => {
  test('1', () => {
    const format = new ExponentNumberFormat({ notation: standardNotation, digits: 3 });
    expect(format.format(new ExponentNumber(0, 1234567))).toBe('1.23M');
    expect(format.format(new ExponentNumber(0, 1.5e50))).toBe('150QiDc');
    expect(format.format(new ExponentNumber(2, 100))).toBe('ee100');
  });

  test('2', () => {
    expect(new ExponentNumberFormat().format(new ExponentNumber(0, 1.23456e10))).toBe('1.2346e10');
  });

  test('3', () => {
    const format = new ExponentNumberFormat({ notation: lettersNotation });
    expect(format.format(1234)).toBe('1.234a');
    expect(format.format('e150')).toBe('e150');
  });

  test('4', () => {
    const format = new ExponentNumberFormat({ notation: standardNotation, digits: 3 });
    expect(new ExponentNumber(0, 1234567).format(format)).toBe('1.23M');
  });

  test('5', () => {
    const format = new ExponentNumberFormat({ exponentCountLimit: 2 });
    expect(format.format(new ExponentNumber(3, 100))).toBe('e(3)100');
  });

  test('6', () => {
    expect(() => new ExponentNumberFormat({ digits: 0 })).toThrow(RangeError);
  });

  test('7', () => {
    expect(() => new ExponentNumberFormat({ digits: 2.5 })).toThrow(RangeError);
  });

  test('8', () => {
    expect(() => new ExponentNumberFormat({ exponentCountLimit: -1 })).toThrow(RangeError);
  });
});
