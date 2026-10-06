export interface Notation {
  /**
   * Formats number lower than 1e100.
   * Bigger numbers are always shown as `e...e<value>` with scientific notation of the value.
   */
  format(value: number, digits: number): string;
}

export interface FormatOptions {
  /** Notation for numbers lower than 1e100, scientific by default */
  notation?: Notation;
  /** Count of significant digits, 5 by default */
  digits?: number;
  /** Max count of `e` shown in a row before switching to `e(count)` form, 5 by default */
  exponentCountLimit?: number;
}
