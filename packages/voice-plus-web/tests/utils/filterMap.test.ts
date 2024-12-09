import { filterMap } from "../../src/utils/filterMap";

describe("filterMap", () => {
  it("filters array on null", () => {
    expect(
      filterMap([1, 2, 3, 4, 5], (value) => {
        if (value % 2 === 0) {
          return null;
        }
        return value;
      }),
    ).toEqual([1, 3, 5]);
  });
});
