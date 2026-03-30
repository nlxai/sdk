import { describe, it, expect } from "vitest";
import { extractPropertyCSS } from "../src/adoptPropertyDeclarations";

const sampleCSS = `
  .foo { color: red; }
  @property --tw-translate-x { syntax: "*"; inherits: false; initial-value: 0 }
  .bar { display: flex; }
  @property --glow-opacity { syntax: "<percentage>"; inherits: false; initial-value: 0% }
`;

describe("extractPropertyCSS", () => {
  it("extracts only @property declarations from the CSS", () => {
    const result = extractPropertyCSS(sampleCSS);
    expect(result).toContain("@property --tw-translate-x");
    expect(result).toContain("@property --glow-opacity");
    expect(result).not.toContain(".foo");
    expect(result).not.toContain(".bar");
  });

  it("returns null when no @property declarations are present", () => {
    expect(extractPropertyCSS(".foo { color: red; }")).toBeNull();
  });

  it("returns null for an empty string", () => {
    expect(extractPropertyCSS("")).toBeNull();
  });
});
