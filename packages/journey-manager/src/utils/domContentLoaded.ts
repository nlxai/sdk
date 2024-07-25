/**
 * Waits for the DOMContentLoaded event to fire.
 * @returns A promise that resolves when the DOM is loaded.
 */
// eslint-disable-next-line @typescript-eslint/promise-function-async
export const domContentLoaded = (): Promise<void> => {
  if (document.readyState === "loading") {
    return new Promise((resolve) => {
      window.addEventListener("DOMContentLoaded", () => {
        resolve();
      });
    });
  } else {
    return Promise.resolve();
  }
};
