import { VALUE_EXPONENT_DIFFERENCE_LIMIT } from '../const';
import { Notation } from '../interfaces/notation.interface';

const GROUP_SIZE = 3;
const LETTERS_COUNT = 26;
const FIRST_LETTER_CODE = 97;

const STANDARD_SUFFIXES = [
  '',
  'K',
  'M',
  'B',
  'T',
  'Qa',
  'Qi',
  'Sx',
  'Sp',
  'Oc',
  'No',
  'Dc',
  'UDc',
  'DDc',
  'TDc',
  'QaDc',
  'QiDc',
  'SxDc',
  'SpDc',
  'OcDc',
  'NoDc',
  'Vg',
  'UVg',
  'DVg',
  'TVg',
  'QaVg',
  'QiVg',
  'SxVg',
  'SpVg',
  'OcVg',
  'NoVg',
  'Tg',
  'UTg',
  'DTg',
];

function splitNumber(value: number, digits: number): { mantissa: number; exponent: number } {
  const [mantissa, exponent] = value.toExponential(digits - 1).split('e');

  return { mantissa: Number(mantissa), exponent: Number(exponent) };
}

function formatPlainNumber(value: number, digits: number): string {
  const cutNumber = Number(value.toPrecision(digits));

  return (cutNumber >= Math.pow(10, digits) ? Math.round(value) : cutNumber).toString();
}

function formatGroupedNumber(
  value: number,
  digits: number,
  getGroupText: (groupIndex: number) => string,
): string {
  const { mantissa, exponent } = splitNumber(value, digits);

  if (exponent < GROUP_SIZE) {
    return formatPlainNumber(value, digits);
  }

  const groupMantissa = Number(
    (mantissa * Math.pow(10, exponent % GROUP_SIZE)).toPrecision(digits),
  );

  return `${groupMantissa}${getGroupText(Math.floor(exponent / GROUP_SIZE))}`;
}

function getLetters(groupIndex: number): string {
  let letters = '';

  while (groupIndex > 0) {
    groupIndex -= 1;
    letters = String.fromCharCode(FIRST_LETTER_CODE + (groupIndex % LETTERS_COUNT)) + letters;
    groupIndex = Math.floor(groupIndex / LETTERS_COUNT);
  }

  return letters;
}

/** 1.2346e10 */
export const scientificNotation: Notation = {
  format(value: number, digits: number): string {
    const { mantissa, exponent } = splitNumber(value, digits);

    if (exponent < VALUE_EXPONENT_DIFFERENCE_LIMIT) {
      return formatPlainNumber(value, digits);
    }

    return `${mantissa}e${exponent}`;
  },
};

/** 12.346e9, exponent is always a multiple of 3 */
export const engineeringNotation: Notation = {
  format(value: number, digits: number): string {
    if (splitNumber(value, digits).exponent < VALUE_EXPONENT_DIFFERENCE_LIMIT) {
      return formatPlainNumber(value, digits);
    }

    return formatGroupedNumber(value, digits, (groupIndex) => `e${groupIndex * GROUP_SIZE}`);
  },
};

/** 12.346B, short scale names up to 1e99 */
export const standardNotation: Notation = {
  format(value: number, digits: number): string {
    return formatGroupedNumber(value, digits, (groupIndex) => STANDARD_SUFFIXES[groupIndex]);
  },
};

/** 12.346c, letters go like a, b, ..., z, aa, ab */
export const lettersNotation: Notation = {
  format(value: number, digits: number): string {
    return formatGroupedNumber(value, digits, getLetters);
  },
};

/** e10.092 */
export const logarithmNotation: Notation = {
  format(value: number, digits: number): string {
    if (splitNumber(value, digits).exponent < VALUE_EXPONENT_DIFFERENCE_LIMIT) {
      return formatPlainNumber(value, digits);
    }

    return `e${Number(Math.log10(value).toPrecision(digits))}`;
  },
};
