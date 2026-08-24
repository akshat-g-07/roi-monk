// Formats monetary amounts using the digit-grouping convention of the given
// currency. Extend CURRENCY_LOCALE_MAP to support new grouping styles later.

// Currencies whose grouping differs from the default. Add entries as needed.
const CURRENCY_LOCALE_MAP = {
  INR: "en-IN", // Indian grouping, e.g. 3,00,000
};

// Standard thousands grouping used for USD and every unmapped currency.
const DEFAULT_LOCALE = "en-US"; // e.g. 3,000,000

export function formatAmount(amount, currencyCode) {
  const number = Number(amount);
  if (!Number.isFinite(number)) return amount ?? "";

  const locale = CURRENCY_LOCALE_MAP[currencyCode] ?? DEFAULT_LOCALE;

  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(number);
}
