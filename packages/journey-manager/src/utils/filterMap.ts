/**
 * Filters and maps an array using a provided function.
 * @param arr - The array to filter and map.
 * @param fn - The function to apply to each element of the array. Return null or undefined to filter the value.
 * @returns An array of mapped values.
 */
export function filterMap<X, Y>(
  arr: X[],
  fn: (value: X) => Y | null | undefined,
): Y[] {
  return arr.reduce<Y[]>((prev, curr) => {
    const val = fn(curr);
    if (val != null) {
      prev.push(val);
    }
    return prev;
  }, []);
}
