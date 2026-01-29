export function modulo(val: number, mod: number) {
  return ((val % mod) + mod) % mod;
}

export function moduloOffset(val: number, mod: number, offset: number) {
  return modulo(val - offset, mod) + offset;
}

export function clamp(val: number, max: number, min: number) {
  return Math.max(Math.min(val, max), min);
}
