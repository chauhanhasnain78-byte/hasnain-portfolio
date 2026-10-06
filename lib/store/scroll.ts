// lib/store/scroll.ts
// Lightweight shared scroll-progress store.
// Both DOM animations and the 3D camera read from this single source.
// No Zustand dependency — uses useSyncExternalStore pattern.

type Listener = () => void;

let scrollProgress = 0;
let scrollVelocity = 0;
const listeners = new Set<Listener>();

export function getScrollProgress(): number {
  return scrollProgress;
}

export function getScrollVelocity(): number {
  return scrollVelocity;
}

export function setScrollProgress(value: number): void {
  scrollProgress = value;
  emitChange();
}

export function setScrollVelocity(value: number): void {
  scrollVelocity = value;
}

function emitChange() {
  for (const listener of listeners) {
    listener();
  }
}

export function subscribeScroll(listener: Listener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

// For use with React's useSyncExternalStore
export function getScrollSnapshot(): number {
  return scrollProgress;
}

// Server snapshot (always 0)
export function getScrollServerSnapshot(): number {
  return 0;
}
