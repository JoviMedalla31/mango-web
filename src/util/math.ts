export function modulo(val: number, mod: number) {
  return ((val % mod) + mod) % mod;
}

export function clamp(val: number, max: number, min: number) {
  return Math.max(Math.min(val, max), min);
}
