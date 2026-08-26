// Whole-currency amount → integer minor units (cents/paise). Only needed if you
// ever charge a dynamic amount; the $9/mo price lives on the Dodo product.
export function toMinorUnits(amount) {
  return Math.round(Number(amount) * 100);
}

export function fromMinorUnits(minor) {
  return Number(minor) / 100;
}

// Overlay / client checkout SDK mode.
export function dodoClientMode() {
  return process.env.NEXT_PUBLIC_DODO_MODE === "live" ? "live" : "test";
}

// Basic phone sanity check shared by the client form and the server action.
export function isValidPhone(phone) {
  return (
    typeof phone === "string" && /^\+?[0-9][0-9\s()-]{6,19}$/.test(phone.trim())
  );
}
