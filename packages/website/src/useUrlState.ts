import { equals } from "ramda";
import { type Dispatch, type SetStateAction, useEffect, useState } from "react";

/**
 * Just like useState, but the value is stored in the URL.
 * @param key The key to store the value in the URL
 * @param defaultValue The default value to use if the key is not found in the URL
 * @returns
 */
const useUrlState = <T>(
  key: string,
  defaultValue: T,
): [T, Dispatch<SetStateAction<T>>] => {
  const [value, setValue] = useState<T>(() => {
    const params = new URLSearchParams(
      globalThis.location?.search as string | undefined,
    );
    const val = params.get(key);
    if (val != null) {
      if (typeof defaultValue !== "string") {
        try {
          return JSON.parse(val);
        } catch {}
      } else {
        return val;
      }
    }
    return defaultValue;
  });

  useEffect(() => {
    const params = new URLSearchParams(
      globalThis.location?.search as string | undefined,
    );
    if (equals(value, defaultValue)) {
      params.delete(key);
    } else {
      params.set(
        key,
        typeof defaultValue === "string"
          ? (value as string)
          : JSON.stringify(value),
      );
    }
    window.history.replaceState({}, "", `?${params.toString()}`);
  }, [key, value, defaultValue]);

  return [value, setValue] as const;
};

export default useUrlState;
