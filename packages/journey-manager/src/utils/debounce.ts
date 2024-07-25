/**
 * Debounces a function.
 * @param func - The function to debounce.
 * @param timeout - The debounce timeout in milliseconds.
 * @returns A debounced function.
 */
export const debounce = (func: () => void, timeout = 300): (() => void) => {
  let timer: NodeJS.Timer | null = null;
  return () => {
    if (timer != null) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      func();
    }, timeout);
  };
};
