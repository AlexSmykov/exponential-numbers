import { describe, expect, test } from '@jest/globals';
import { ExponentNumber } from '../src';
import { VALUE_EXPONENT_DIFFERENCE_LIMIT } from '../src/const';

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
    ).toBe('1e13');
  });

  test('6', () => {
    expect(
      new ExponentNumber(0, Math.pow(10, VALUE_EXPONENT_DIFFERENCE_LIMIT + 1.1)).toString(),
    ).toBe('1.2589e13');
  });

  test('7', () => {
    expect(
      new ExponentNumber(1, Math.pow(10, VALUE_EXPONENT_DIFFERENCE_LIMIT + 1)).toString(),
    ).toBe('e1e13');
  });

  test('8', () => {
    expect(
      new ExponentNumber(1, Math.pow(10, VALUE_EXPONENT_DIFFERENCE_LIMIT + 1.1)).toString(),
    ).toBe('e1.2589e13');
  });

  test('9', () => {
    expect(new ExponentNumber(5, 100).toString()).toBe('eeeee100');
  });

  test('10', () => {
    expect(new ExponentNumber(5, 1).toString()).toBe('eee10000000000');
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
});

describe('Plus test', () => {
  test('1', () => {
    const first = new ExponentNumber(0, 10);
    const second = new ExponentNumber(0, 10);
    first.plus(second);
    expect(first.toString()).toBe('20');
  });

  test('2', () => {
    const first = new ExponentNumber(0, 0);
    const second = new ExponentNumber(0, 0);
    first.plus(second);
    expect(first.toString()).toBe('0');
  });

  test('3', () => {
    const first = new ExponentNumber(0, 1.234);
    const second = new ExponentNumber(0, 1.234);
    first.plus(second);
    expect(first.toString()).toBe('2.468');
  });

  test('4', () => {
    const first = new ExponentNumber(0, 1.00005);
    const second = new ExponentNumber(0, 0.00005);
    first.plus(second);
    expect(first.toString()).toBe('1.0001');
  });

  test('5', () => {
    const first = new ExponentNumber(0, 1);
    const second = new ExponentNumber(0, 0.000051);
    first.plus(second);
    expect(first.toString()).toBe('1.0001');
  });

  test('6', () => {
    const first = new ExponentNumber(1, 100);
    const second = new ExponentNumber(0, 1);
    first.plus(second);
    expect(first.toString()).toBe('e100');
  });

  test('7', () => {
    const first = new ExponentNumber(1, 100);
    const second = new ExponentNumber(1, 100);
    first.plus(second);
    expect(first.toString()).toBe('e100.3');
  });

  test('8', () => {
    const first = new ExponentNumber(1, 100);
    const second = new ExponentNumber(1, 101);
    first.plus(second);
    expect(first.toString()).toBe('e101.04');
  });

  test('9', () => {
    const first = new ExponentNumber(2, 100);
    const second = new ExponentNumber(2, 100);
    first.plus(second);
    expect(first.toString()).toBe('ee100');
  });

  test('10', () => {
    const first = new ExponentNumber(1, 1e20);
    const second = new ExponentNumber(1, 1e20);
    first.plus(second);
    expect(first.toString()).toBe('e1e20');
  });

  test('11', () => {
    const first = new ExponentNumber(1, 100);
    const second = new ExponentNumber(0, 9.999e99);
    first.plus(second);
    expect(first.toString()).toBe('e100.3');
  });

  test('12', () => {
    const first = new ExponentNumber(0, 9.999e99);
    const second = new ExponentNumber(1, 100);
    first.plus(second);
    expect(first.toString()).toBe('e100.3');
  });

  test('13', () => {
    const first = new ExponentNumber(2, 100);
    const second = new ExponentNumber(3, 100);
    first.plus(second);
    expect(first.toString()).toBe('eee100');
  });

  test('14', () => {
    const first = new ExponentNumber(3, 100);
    const second = new ExponentNumber(2, 100);
    first.plus(second);
    expect(first.toString()).toBe('eee100');
  });
});

describe('Minus test', () => {
  test('1', () => {
    const first = new ExponentNumber(0, 20);
    const second = new ExponentNumber(0, 10);
    first.minus(second);
    expect(first.toString()).toBe('10');
  });

  test('2', () => {
    const first = new ExponentNumber(0, 0);
    const second = new ExponentNumber(0, 0);
    first.minus(second);
    expect(first.toString()).toBe('0');
  });

  test('3', () => {
    const first = new ExponentNumber(0, 2.468);
    const second = new ExponentNumber(0, 1.234);
    first.minus(second);
    expect(first.toString()).toBe('1.234');
  });

  test('4', () => {
    const first = new ExponentNumber(0, 1.0001);
    const second = new ExponentNumber(0, 0.00004);
    first.minus(second);
    expect(first.toString()).toBe('1.0001');
  });

  test('5', () => {
    const first = new ExponentNumber(0, 1.0001);
    const second = new ExponentNumber(0, 0.000051);
    first.minus(second);
    expect(first.toString()).toBe('1');
  });

  test('6', () => {
    const first = new ExponentNumber(1, 100);
    const second = new ExponentNumber(0, 1);
    first.minus(second);
    expect(first.toString()).toBe('e100');
  });

  test('7', () => {
    const first = new ExponentNumber(0, 1.1e100);
    const second = new ExponentNumber(1, 100);
    first.minus(second);
    expect(first.toString()).toBe('1e99');
  });

  test('8', () => {
    const first = new ExponentNumber(1, 100);
    const second = new ExponentNumber(1, 101);
    first.minus(second);
    expect(first.toString()).toBe('0');
  });

  test('9', () => {
    const first = new ExponentNumber(2, 100);
    const second = new ExponentNumber(2, 100);
    first.minus(second);
    expect(first.toString()).toBe('0');
  });

  test('10', () => {
    const first = new ExponentNumber(1, 100);
    const second = new ExponentNumber(0, 9.999e99);
    first.minus(second);
    expect(first.toString()).toBe('1e96');
  });

  test('11', () => {
    const first = new ExponentNumber(2, 100);
    const second = new ExponentNumber(3, 100);
    first.minus(second);
    expect(first.toString()).toBe('0');
  });
});

describe('Multiply test', () => {
  test('1', () => {
    const first = new ExponentNumber(0, 10);
    const second = new ExponentNumber(0, 10);
    first.multiply(second);
    expect(first.toString()).toBe('100');
  });

  test('2', () => {
    const first = new ExponentNumber(0, 1);
    const second = new ExponentNumber(0, 1);
    first.multiply(second);
    expect(first.toString()).toBe('1');
  });

  test('3', () => {
    const first = new ExponentNumber(0, 100);
    const second = new ExponentNumber(0, 0);
    first.multiply(second);
    expect(first.toString()).toBe('0');
  });

  test('4', () => {
    const first = new ExponentNumber(0, 10);
    const second = new ExponentNumber(0, 0.01);
    first.multiply(second);
    expect(first.toString()).toBe('0.1');
  });

  test('5', () => {
    const first = new ExponentNumber(0, 1000000);
    const second = new ExponentNumber(0, 1000000);
    first.multiply(second);
    expect(first.toString()).toBe('1e12');
  });

  test('6', () => {
    const first = new ExponentNumber(0, 1e50);
    const second = new ExponentNumber(0, 1e50);
    first.multiply(second);
    expect(first.toString()).toBe('e100');
  });

  test('7', () => {
    const first = new ExponentNumber(1, 100);
    const second = new ExponentNumber(1, 100);
    first.multiply(second);
    expect(first.toString()).toBe('e200');
  });

  test('8', () => {
    const first = new ExponentNumber(1, 100);
    const second = new ExponentNumber(0, 100);
    first.multiply(second);
    expect(first.toString()).toBe('e102');
  });

  test('9', () => {
    const first = new ExponentNumber(0, 100);
    const second = new ExponentNumber(1, 100);
    first.multiply(second);
    expect(first.toString()).toBe('e102');
  });

  test('10', () => {
    const first = new ExponentNumber(2, 100);
    const second = new ExponentNumber(1, 100);
    first.multiply(second);
    expect(first.toString()).toBe('ee100');
  });

  test('11', () => {
    const first = new ExponentNumber(2, 100);
    const second = new ExponentNumber(2, 100);
    first.multiply(second);
    expect(first.toString()).toBe('ee100.3');
  });

  test('12', () => {
    const first = new ExponentNumber(2, 100);
    const second = new ExponentNumber(1, 9.999e99);
    first.multiply(second);
    expect(first.toString()).toBe('ee100.3');
  });
});

describe('Divide test', () => {
  test('1', () => {
    const first = new ExponentNumber(0, 100);
    const second = new ExponentNumber(0, 10);
    first.divide(second);
    expect(first.toString()).toBe('10');
  });

  test('2', () => {
    const first = new ExponentNumber(0, 1);
    const second = new ExponentNumber(0, 1);
    first.divide(second);
    expect(first.toString()).toBe('1');
  });

  test('3', () => {
    const first = new ExponentNumber(0, 0);
    const second = new ExponentNumber(0, 100);
    first.divide(second);
    expect(first.toString()).toBe('0');
  });

  test('4', () => {
    const first = new ExponentNumber(0, 1);
    const second = new ExponentNumber(0, 0.01);
    first.divide(second);
    expect(first.toString()).toBe('100');
  });

  test('5', () => {
    const first = new ExponentNumber(0, 0.01);
    const second = new ExponentNumber(0, 1);
    first.divide(second);
    expect(first.toString()).toBe('0.01');
  });

  test('6', () => {
    const first = new ExponentNumber(0, 1e12);
    const second = new ExponentNumber(0, 1000000);
    first.divide(second);
    expect(first.toString()).toBe('1000000');
  });

  test('7', () => {
    const first = new ExponentNumber(1, 100);
    const second = new ExponentNumber(0, 1e50);
    first.divide(second);
    expect(first.toString()).toBe('1e50');
  });

  test('8', () => {
    const first = new ExponentNumber(1, 200);
    const second = new ExponentNumber(1, 100);
    first.divide(second);
    expect(first.toString()).toBe('e100');
  });

  test('9', () => {
    const first = new ExponentNumber(1, 103);
    const second = new ExponentNumber(0, 100);
    first.divide(second);
    expect(first.toString()).toBe('e101');
  });

  test('10', () => {
    const first = new ExponentNumber(2, 100);
    const second = new ExponentNumber(1, 100);
    first.divide(second);
    expect(first.toString()).toBe('ee100');
  });

  test('11', () => {
    const first = new ExponentNumber(2, 101);
    const second = new ExponentNumber(2, 100);
    first.divide(second);
    expect(first.toString()).toBe('ee100.95');
  });

  test('12', () => {
    const first = new ExponentNumber(2, 100);
    const second = new ExponentNumber(1, 9.999e99);
    first.divide(second);
    expect(first.toString()).toBe('e1e96');
  });
});

describe('Power test', () => {
  test('1', () => {
    const first = new ExponentNumber(0, 3);
    const second = new ExponentNumber(0, 2);
    first.power(second);
    expect(first.toString()).toBe('9');
  });

  test('2', () => {
    const first = new ExponentNumber(0, 3);
    const second = new ExponentNumber(0, 4);
    first.power(second);
    expect(first.toString()).toBe('81');
  });

  test('3', () => {
    const first = new ExponentNumber(0, 10);
    const second = new ExponentNumber(0, 1.2);
    first.power(second);
    expect(first.toString()).toBe('15.849');
  });

  test('4', () => {
    const first = new ExponentNumber(1, 100);
    const second = new ExponentNumber(0, 1.2);
    first.power(second);
    expect(first.toString()).toBe('e120');
  });

  test('5', () => {
    const first = new ExponentNumber(1, 100);
    const second = new ExponentNumber(0, 10);
    first.power(second);
    expect(first.toString()).toBe('e1000');
  });

  test('6', () => {
    const first = new ExponentNumber(1, 100);
    const second = new ExponentNumber(1, 100);
    first.power(second);
    expect(first.toString()).toBe('ee102');
  });

  test('7', () => {
    const first = new ExponentNumber(2, 100);
    const second = new ExponentNumber(2, 100);
    first.power(second);
    expect(first.toString()).toBe('eee100');
  });

  test('8', () => {
    const first = new ExponentNumber(0, 9);
    const second = new ExponentNumber(0, 0.5);
    first.power(second);
    expect(first.toString()).toBe('3');
  });

  test('9', () => {
    const first = new ExponentNumber(0, 81);
    const second = new ExponentNumber(0, 0.25);
    first.power(second);
    expect(first.toString()).toBe('3');
  });

  test('10', () => {
    const first = new ExponentNumber(0, 100);
    const second = new ExponentNumber(0, 0.1);
    first.power(second);
    expect(first.toString()).toBe('1.5849');
  });

  test('11', () => {
    const first = new ExponentNumber(1, 1000);
    const second = new ExponentNumber(0, 0.1);
    first.power(second);
    expect(first.toString()).toBe('e100');
  });

  test('12', () => {
    const first = new ExponentNumber(0, 100);
    const second = new ExponentNumber(0, 0);
    first.power(second);
    expect(first.toString()).toBe('1');
  });

  test('13', () => {
    const first = new ExponentNumber(3, 100);
    const second = new ExponentNumber(3, 100);
    first.power(second);
    expect(first.toString()).toBe('eeee100');
  });

  test('14', () => {
    const first = new ExponentNumber(4, 100);
    const second = new ExponentNumber(4, 100);
    first.power(second);
    expect(first.toString()).toBe('eeeee100');
  });

  test('15', () => {
    const first = new ExponentNumber(1, 100);
    const second = new ExponentNumber(3, 100);
    first.power(second);
    expect(first.toString()).toBe('eeee100');
  });
});
describe('Root test', () => {
  test('1', () => {
    const first = new ExponentNumber(0, 9);
    const second = new ExponentNumber(0, 2);
    first.root(second);
    expect(first.toString()).toBe('3');
  });

  test('2', () => {
    const first = new ExponentNumber(0, 81);
    const second = new ExponentNumber(0, 4);
    first.root(second);
    expect(first.toString()).toBe('3');
  });

  test('3', () => {
    const first = new ExponentNumber(0, 15.849);
    const second = new ExponentNumber(0, 1.2);
    first.root(second);
    expect(first.toString()).toBe('10');
  });

  test('4', () => {
    const first = new ExponentNumber(1, 144);
    const second = new ExponentNumber(0, 1.2);
    first.root(second);
    expect(first.toString()).toBe('e120');
  });

  test('5', () => {
    const first = new ExponentNumber(1, 1000);
    const second = new ExponentNumber(0, 10);
    first.root(second);
    expect(first.toString()).toBe('e100');
  });

  test('6', () => {
    const first = new ExponentNumber(2, 103);
    const second = new ExponentNumber(1, 100);
    first.root(second);
    expect(first.toString()).toBe('e1000');
  });

  test('7', () => {
    const first = new ExponentNumber(3, 100);
    const second = new ExponentNumber(2, 100);
    first.root(second);
    expect(first.toString()).toBe('10');
  });

  test('8', () => {
    const first = new ExponentNumber(0, 3);
    const second = new ExponentNumber(0, 0.5);
    first.root(second);
    expect(first.toString()).toBe('9');
  });

  test('9', () => {
    const first = new ExponentNumber(0, 3);
    const second = new ExponentNumber(0, 0.25);
    first.root(second);
    expect(first.toString()).toBe('81');
  });

  test('10', () => {
    const first = new ExponentNumber(0, 1.5849);
    const second = new ExponentNumber(0, 0.1);
    first.root(second);
    expect(first.toString()).toBe('100');
  });

  test('11', () => {
    const first = new ExponentNumber(1, 100);
    const second = new ExponentNumber(0, 0.1);
    first.root(second);
    expect(first.toString()).toBe('e1000');
  });

  test('12', () => {
    const first = new ExponentNumber(3, 10);
    const second = new ExponentNumber(3, 10);
    first.root(second);
    expect(first.toString()).toBe('0');
  });

  test('13', () => {
    const first = new ExponentNumber(4, 100);
    const second = new ExponentNumber(3, 100);
    first.root(second);
    expect(first.toString()).toBe('10');
  });
});

describe('Log test', () => {
  test('1', () => {
    const first = new ExponentNumber(0, 8);
    const second = new ExponentNumber(0, 2);
    first.log(second);
    expect(first.toString()).toBe('3');
  });

  test('2', () => {
    const first = new ExponentNumber(0, 1000);
    const second = new ExponentNumber(0, 10);
    first.log(second);
    expect(first.toString()).toBe('3');
  });

  test('3', () => {
    const first = new ExponentNumber(1, 100);
    const second = new ExponentNumber(0, 10);
    first.log(second);
    expect(first.toString()).toBe('100');
  });

  test('4', () => {
    const first = new ExponentNumber(1, 6400);
    const second = new ExponentNumber(1, 80);
    first.log(second);
    expect(first.toString()).toBe('80');
  });

  test('5', () => {
    const first = new ExponentNumber(1, 10000);
    const second = new ExponentNumber(0, 100);
    first.log(second);
    expect(first.toString()).toBe('5000');
  });

  test('6', () => {
    const first = new ExponentNumber(0, 100);
    const second = new ExponentNumber(0, 100);
    first.log(second);
    expect(first.toString()).toBe('1');
  });

  test('7', () => {
    const first = new ExponentNumber(0, 10);
    const second = new ExponentNumber(0, 100);
    first.log(second);
    expect(first.toString()).toBe('0.5');
  });

  test('8', () => {
    const first = new ExponentNumber(0, 5);
    const second = new ExponentNumber(0, 1.2);
    first.log(second);
    expect(first.toString()).toBe('8.8275');
  });

  test('9', () => {
    const first = new ExponentNumber(1, 100);
    const second = new ExponentNumber(1, 200);
    first.log(second);
    expect(first.toString()).toBe('0.5');
  });

  test('10', () => {
    const first = new ExponentNumber(2, 100);
    const second = new ExponentNumber(2, 201);
    first.log(second);
    expect(first.toString()).toBe('0');
  });
});

describe('More than test', () => {
  test('1', () => {
    const first = new ExponentNumber(0, 1);
    const second = new ExponentNumber(0, 1);
    expect(first.isMoreThanValue(second)).toBe(false);
  });

  test('2', () => {
    const first = new ExponentNumber(0, 1);
    const second = new ExponentNumber(0, 2);
    expect(first.isMoreThanValue(second)).toBe(false);
  });

  test('3', () => {
    const first = new ExponentNumber(0, 2);
    const second = new ExponentNumber(0, 1);
    expect(first.isMoreThanValue(second)).toBe(true);
  });

  test('4', () => {
    const first = new ExponentNumber(1, 1);
    const second = new ExponentNumber(0, 1);
    expect(first.isMoreThanValue(second)).toBe(true);
  });

  test('5', () => {
    const first = new ExponentNumber(1, 1);
    const second = new ExponentNumber(1, 1);
    expect(first.isMoreThanValue(second)).toBe(false);
  });

  test('6', () => {
    const first = new ExponentNumber(1, 2);
    const second = new ExponentNumber(1, 1);
    expect(first.isMoreThanValue(second)).toBe(true);
  });

  test('7', () => {
    const first = new ExponentNumber(1, 1);
    const second = new ExponentNumber(2, 1);
    expect(first.isMoreThanValue(second)).toBe(false);
  });

  test('8', () => {
    const first = new ExponentNumber(1, 1);
    const second = new ExponentNumber(1, 2);
    expect(first.isMoreThanValue(second)).toBe(false);
  });

  test('9', () => {
    const first = new ExponentNumber(100, 100);
    const second = new ExponentNumber(99, 101);
    expect(first.isMoreThanValue(second)).toBe(true);
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
    expect(first.isMoreThanOrEqualValue(second)).toBe(true);
  });

  test('2', () => {
    const first = new ExponentNumber(0, 1);
    const second = new ExponentNumber(0, 2);
    expect(first.isMoreThanOrEqualValue(second)).toBe(false);
  });

  test('3', () => {
    const first = new ExponentNumber(0, 2);
    const second = new ExponentNumber(0, 1);
    expect(first.isMoreThanOrEqualValue(second)).toBe(true);
  });

  test('4', () => {
    const first = new ExponentNumber(1, 1);
    const second = new ExponentNumber(0, 1);
    expect(first.isMoreThanOrEqualValue(second)).toBe(true);
  });

  test('5', () => {
    const first = new ExponentNumber(1, 1);
    const second = new ExponentNumber(1, 1);
    expect(first.isMoreThanOrEqualValue(second)).toBe(true);
  });

  test('6', () => {
    const first = new ExponentNumber(1, 2);
    const second = new ExponentNumber(1, 1);
    expect(first.isMoreThanOrEqualValue(second)).toBe(true);
  });

  test('7', () => {
    const first = new ExponentNumber(1, 1);
    const second = new ExponentNumber(2, 1);
    expect(first.isMoreThanOrEqualValue(second)).toBe(false);
  });

  test('8', () => {
    const first = new ExponentNumber(1, 1);
    const second = new ExponentNumber(1, 2);
    expect(first.isMoreThanOrEqualValue(second)).toBe(false);
  });

  test('9', () => {
    const first = new ExponentNumber(100, 100);
    const second = new ExponentNumber(99, 101);
    expect(first.isMoreThanOrEqualValue(second)).toBe(true);
  });
});
