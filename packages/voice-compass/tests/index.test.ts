import { stepIdRegex } from "../src";
import fc from "fast-check";

describe("voice compass library", () => {
  describe("stepIdRegex", () => {
    it("should not match non-uuid-like strings", () => {
      [
        "", // empty string
        "not-a-step-id", // nonsense
        "bce9c313-3673-4939-9f1b-b97ccbb291eee", // too long
        "a77e817d-9e55-4e79-b92c-9be4d3ab28c", // too short
        "Q77e817d-9e55-4e79-b92c-9be4d3ab28c", // character out of range
      ].forEach((notAStepId) => {
        expect(notAStepId).not.toMatch(stepIdRegex);
      });
    });

    it("should match test ids", () => {
      [
        "bce9c313-3673-4939-9f1b-b97ccbb291ee",
        "a77e817d-9e55-4e79-b92c-9be4d3ab28ce",
        "24c9eb53-6ba4-44ae-ae4e-05f9654f5115",
      ].forEach((stepId) => {
        expect(stepId).toMatch(stepIdRegex);
      });
    });

    it("should match valid step ids", () => {
      fc.assert(
        fc.property(fc.uuid(), (uuid) => {
          // This test will pass if the regex matches the generated UUID
          expect(uuid).toMatch(stepIdRegex);
        }),
      );
    });
  });
});
