# exponential-number

Small TypeScript package to work with really big numbers — far beyond `Number.MAX_VALUE`.

Made for incremental games and other places where numbers like `1e500` or `10^10^10^100` are normal.

- No dependencies
- Immutable: every operation returns a new number
- Non-negative numbers only
- Maximum number size: `1e...(1.8e308)...e1e100`

## Install

```bash
npm install exponential-number
```

## Quick start

```ts
import { ExponentNumber, ExponentNumberFormat, standardNotation } from 'exponential-number';

const money = ExponentNumber.from(1500);
const income = ExponentNumber.from('2.5e120');

const total = money.plus(income).multiply(3).power(2);

total.toString(); // 'e241.75'
total.isGreaterThanValue(money); // true

const format = new ExponentNumberFormat({ notation: standardNotation });

format.format(money); // '1.5K'
```

## How a number is stored

A number is a pair of `exponentFactor` and `value`. `exponentFactor` is how many times `10^` is applied to `value`:

| `exponentFactor` | `value` | Number        | `toString()` |
| ---------------- | ------- | ------------- | ------------ |
| 0                | 1500    | 1500          | `1500`       |
| 1                | 150     | 10^150        | `e150`       |
| 2                | 100     | 10^10^100     | `ee100`      |
| 10               | 100     | 10^10^...^100 | `e(10)100`   |

Numbers are always kept in one form: lower than `1e100` they are stored as is (`exponentFactor` is 0), bigger ones
have `value` from `100` up to `1e100`. So `new ExponentNumber(0, 1e150)` and `new ExponentNumber(1, 150)` are the same number.

## Creating numbers

```ts
ExponentNumber.from(1500); // from number
ExponentNumber.from('1.5e10'); // from text
ExponentNumber.from('e150'); // 10^150
ExponentNumber.from('ee100'); // 10^10^100
ExponentNumber.from('e(10)100'); // 10 exponents in a row
new ExponentNumber(1, 150); // exponentFactor and value directly

ExponentNumber.ZERO;
ExponentNumber.ONE;
```

Every method takes the same kinds of values, so there is no need to wrap arguments:

```ts
number.plus(5);
number.multiply('e100');
number.power(new ExponentNumber(1, 150));
```

### Saving and loading

`JSON.stringify` works out of the box and keeps full precision. Use `from` to get the number back:

```ts
const text = JSON.stringify(number);
const loaded = ExponentNumber.from(JSON.parse(text));
```

`toString()` rounds the number, so do not use it for saves.

## Operations

All operations return a new number and never change the original one.

| Method                       | Result                                    |
| ---------------------------- | ----------------------------------------- |
| `plus(other)`                | `a + b`                                   |
| `minus(other)`               | `a - b`, `0` when `b` is bigger than `a`  |
| `multiply(other)`            | `a * b`                                   |
| `divide(other)`              | `a / b`                                   |
| `power(other)`               | `a ^ b`                                   |
| `root(other)`                | root of degree `b`                        |
| `sqrt()`                     | square root                               |
| `log(base)`                  | logarithm with the given base             |
| `log10()`                    | logarithm with base 10                    |
| `ln()`                       | natural logarithm                         |
| `pow10()`                    | `10 ^ a`                                  |
| `exp()`                      | `e ^ a`                                   |
| `floor()` `ceil()` `round()` | rounding, numbers from `1e100` stay as is |

```ts
const a = ExponentNumber.from(10);
const b = a.plus(5);

a.toString(); // '10'
b.toString(); // '15'
```

Things to know:

- There are no negative numbers. `minus` stops at `0`, a logarithm that would be negative is `0` too.
- Really big numbers swallow small ones: `ee100` plus or times `1000` is still `ee100`.
- A quotient lower than `1e-9` is `0` when a number from `1e100` takes part in the division.

## Comparison

| Method                             | Result                      |
| ---------------------------------- | --------------------------- |
| `isEqual(other)`                   | `a === b`                   |
| `isGreaterThanValue(other)`        | `a > b`                     |
| `isGreaterThanOrEqualValue(other)` | `a >= b`                    |
| `isLessThanValue(other)`           | `a < b`                     |
| `isLessThanOrEqualValue(other)`    | `a <= b`                    |
| `compare(other)`                   | `-1`, `0` or `1`, for sorts |
| `isZero()`                         | `a === 0`                   |
| `ExponentNumber.max(a, b)`         | bigger one                  |
| `ExponentNumber.min(a, b)`         | smaller one                 |

```ts
numbers.sort((first, second) => first.compare(second));
```

Always compare with these methods, not with `===`: an operation may return either a new object or one of its operands.

## Converting

```ts
ExponentNumber.from('e150').toNumber(); // 1e150
ExponentNumber.from('e400').toNumber(); // Infinity
```

## Formatting

`toString()` uses scientific notation with 5 significant digits.

To show numbers in another way, create `ExponentNumberFormat` once and use it everywhere:

```ts
import { ExponentNumber, ExponentNumberFormat, standardNotation } from 'exponential-number';

const format = new ExponentNumberFormat({ notation: standardNotation, digits: 3 });

format.format(ExponentNumber.from(1234567)); // '1.23M'
format.format(money.plus(income)); // same settings, no need to pass them again
format.format(1500); // '1.5K', usual numbers and text work too
```

Make as many formats as you need, for example a short one for buttons and a detailed one for tooltips.

| Option               | Default              | Meaning                                                |
| -------------------- | -------------------- | ------------------------------------------------------ |
| `notation`           | `scientificNotation` | how numbers lower than `1e100` look                    |
| `digits`             | `5`                  | count of significant digits                            |
| `exponentCountLimit` | `5`                  | max count of `e` in a row, after it `e(count)` is used |

For a single call the settings or a ready format can be passed right to the number:

```ts
number.format({ notation: standardNotation }); // '1.2346M'
number.format(format); // '1.23M'
```

### Notations

| Notation              | 1234     | 1.23456e10  | 1.5e50    |
| --------------------- | -------- | ----------- | --------- |
| `scientificNotation`  | `1234`   | `1.2346e10` | `1.5e50`  |
| `engineeringNotation` | `1234`   | `12.346e9`  | `150e48`  |
| `standardNotation`    | `1.234K` | `12.346B`   | `150QiDc` |
| `lettersNotation`     | `1.234a` | `12.346c`   | `150p`    |
| `logarithmNotation`   | `1234`   | `e10.092`   | `e50.176` |

Scientific, engineering and logarithm notations show numbers lower than `1e9` as is.
Standard and letters notations start from `1000`.

A notation is used only for numbers lower than `1e100`. Bigger ones always look like `e150`, `ee100` or `e(10)100`,
because suffixes make no sense there.

### Custom notation

A notation is an object with one method, so it is easy to make your own:

```ts
import { ExponentNumberFormat, Notation } from 'exponential-number';

const myNotation: Notation = {
  format(value: number, digits: number): string {
    if (value < 1e6) {
      return value.toString();
    }

    return `${Number((value / 1e6).toPrecision(digits))} mln`;
  },
};

new ExponentNumberFormat({ notation: myNotation, digits: 3 }).format(1234567); // '1.23 mln'
```

`value` is always a usual number from `0` up to `1e100`.

## Errors

Wrong input throws `RangeError`:

- negative number, `NaN` or `Infinity`
- `exponentFactor` that is not an integer
- text that is not a number
- division by zero and root of degree `0`
- logarithm with base `0` or `1`

## Migration from 1.x

Version 2 has breaking changes.

- **Operations do not change the number anymore.** A call without using the result does nothing now:

  ```ts
  // 1.x
  money.plus(income);

  // 2.x
  money = money.plus(income);
  ```

- `exponentFactor` and `value` are read-only.
- `copy`, `normalize`, `applyNewValues` and `resetValue` are removed. They are not needed with immutable numbers.
- Negative numbers, `NaN` and `Infinity` throw `RangeError` instead of giving a broken number.
- Division by zero and logarithm with base `1` throw `RangeError` instead of hanging.
- `minus` gives `0` when the second number is bigger, on every level.
- A logarithm that would be negative gives `0`.
- `toString()` shows all integer digits of numbers lower than `1e9`: `123456789` instead of `123460000`.

## License

Apache-2.0
