import prepareDigression from "../src/digression";
import { Triggers } from "../src/trigger";
describe("digression detection", () => {
  it("should call the onDigression callback when all triggers have a URL constraint set and none match the current URL", () => {
    // set up
    const triggers: Triggers = {
      trigger1: {
        event: "pageLoad",
        once: false,
        urlCondition: {
          operator: "smart_match",
          value: "/foo",
        },
      },
      trigger2: {
        event: "pageLoad",
        once: true,
        urlCondition: {
          operator: "contains",
          value: "bbq",
        },
      },
    };
    const onDigression = jest.fn();
    const digression = prepareDigression(triggers, onDigression);

    // Shouldn't call the callback before we call the digression function
    expect(onDigression).toHaveBeenCalledTimes(0);

    // calls digression with a URL that doesn't match any of the triggers
    expect(digression(new URL("https://example.com"))).toBe(true);
    expect(onDigression).toHaveBeenCalledTimes(1);

    // calls digression with a URL that doesn't match any of the triggers again
    // the callback shouldn't get called
    expect(digression(new URL("https://example.com/redis"))).toBe(true);
    expect(onDigression).toHaveBeenCalledTimes(1);

    // now call the digression with a URL that matches one of the triggers
    expect(digression(new URL("https://example.com/foo"))).toBe(false);
    expect(onDigression).toHaveBeenCalledTimes(1);

    // now call it again with a URL that doesn't match any of the triggers
    expect(digression(new URL("https://example.com/redis"))).toBe(true);
    expect(onDigression).toHaveBeenCalledTimes(2);
  });

  it("never calls the callback when there are triggers without URL conditions", () => {
    // set up
    const triggers: Triggers = {
      trigger1: {
        event: "pageLoad",
        once: false,
        urlCondition: {
          operator: "smart_match",
          value: "/foo",
        },
      },
      trigger2: {
        event: "pageLoad",
        once: true,
      },
    };
    const onDigression = jest.fn();
    const digression = prepareDigression(triggers, onDigression);

    // Shouldn't call the callback before we call the digression function
    expect(onDigression).toHaveBeenCalledTimes(0);

    // calls digression with a URL that doesn't match any of the triggers
    expect(digression(new URL("https://example.com"))).toBe(false);
    expect(onDigression).toHaveBeenCalledTimes(0);

    // now call the digression with a URL that matches one of the triggers
    expect(digression(new URL("https://example.com/foo"))).toBe(false);
    expect(onDigression).toHaveBeenCalledTimes(0);

    // calls digression with a URL that doesn't match any of the triggers
    expect(digression(new URL("https://example.com"))).toBe(false);
    expect(onDigression).toHaveBeenCalledTimes(0);
  });
});
