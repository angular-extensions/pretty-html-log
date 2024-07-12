import { phl } from './phl';

export function setupPhl() {
  (globalThis as any).phl = phl;
}
