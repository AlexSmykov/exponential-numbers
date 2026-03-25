import { describe, expect, test } from '@jest/globals';
import { ExponentNumber } from '../src';
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

  test('12', () => {
    const first = new ExponentNumber(1, 150);
    const second = new ExponentNumber(1, 120);
    expect(first.minus(second).toString()).toBe('e150');
  });

  test('13', () => {
    const first = new ExponentNumber(1, 120);
    const second = new ExponentNumber(1, 150);
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

  test('11.1', () => {
    const first = new ExponentNumber(3, 101);
    const second = new ExponentNumber(3, 100);
    expect(first.divide(second).toString()).toBe('eee101');
  });

  test('11.2', () => {
    const first = new ExponentNumber(3, 100);
    const second = new ExponentNumber(3, 101);
    expect(first.divide(second).toString()).toBe('0');
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

  test('15', () => {
    const first = new ExponentNumber(0, 10);
    const second = new ExponentNumber(0, 100);
    expect(first.divide(second).toString()).toBe('0.1');
  });

  test('16', () => {
    const first = new ExponentNumber(1, 100);
    const second = new ExponentNumber(1, 200);
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
    expect(first.root(second).toString()).toBe('0');
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
    expect(first.log(second).toString()).toBe('-1');
  });

  test('12', () => {
    const first = new ExponentNumber(0, 0.1);
    const second = new ExponentNumber(1, 100);
    expect(first.log(second).toString()).toBe('-0.01');
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
