/* eslint-disable jsdoc/require-jsdoc */
/**
 * Waits for the DOMContentLoaded event to fire.
 * @returns A promise that resolves when the DOM is loaded.
 */

// eslint-disable-next-line @typescript-eslint/promise-function-async
export const contentLoaded = (): Promise<void> => {
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

let teardownIntersectionObserve: () => void = () => {};

/**
 * Abstracts a lot of the DOM minutiae of finding out if an element is in the viewport.
 * Including debouncing calls to this function.
 * @param callback - Callback to call when an element enters the viewport.
 * @returns teardown function
 */
export const observeViewportIntersections = (
  callback: () => {
    elements: HTMLElement[];
    onIntersection: (target: HTMLElement) => void;
  },
) => {
  let timer: NodeJS.Timeout | null = null;

  return () => {
    if (timer != null) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      teardownIntersectionObserve();
      const { elements, onIntersection } = callback();
      const onIntersectionCallback: IntersectionObserverCallback = (data) => {
        data.forEach((entry) => {
          if (entry.intersectionRatio < 0.99) {
            return;
          }
          const target: HTMLElement | null =
            entry.target instanceof HTMLElement ? entry.target : null;
          if (target == null) {
            return;
          }
          onIntersection(target);
        });
      };
      const observer = new IntersectionObserver(onIntersectionCallback, {
        threshold: 1,
      });
      elements.forEach((element) => {
        observer.observe(element);
      });
      teardownIntersectionObserve = () => {
        observer.disconnect();
      };
    }, 300);

    return () => {
      if (timer != null) {
        clearTimeout(timer);
      }
      teardownIntersectionObserve();
    };
  };
};

export const observeMutations = (callback: MutationCallback) => {
  const documentObserver = new MutationObserver(callback);

  documentObserver.observe(document, {
    childList: true,
    subtree: true,
    attributes: true,
  });

  return () => {
    documentObserver.disconnect();
  };
};

export const observeClickEvents = (
  callback: (element: HTMLElement) => void,
) => {
  const cb = (event: MouseEvent): void => {
    if (event.target != null && event.target instanceof HTMLElement)
      callback(event.target);
  };
  document.addEventListener("click", cb, true);
  return () => {
    document.removeEventListener("click", cb, true);
  };
};
