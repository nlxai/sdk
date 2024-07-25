import { type UrlCondition, matchesUrlCondition } from "./UrlCondition";
import type { Triggers } from "./trigger";
import { filterMap } from "./utils/filterMap";

/**
 * Digression detection
 * - if all triggers have a URL constraint set and none match the current URL, fire a digression callback
 * - notable exception: if the step is used as escalation or end as well, missing URL constraint is ok.
 * @param triggers - The triggers to check for digression
 * @param onDigression - The callback to fire when a digression is detected (but only once per digression)
 * @returns digression function
 */
export default (triggers: Triggers, onDigression: () => void) => {
  const urlConditions: UrlCondition[] = filterMap(
    Object.values(triggers),
    (trigger) => trigger.urlCondition,
  );

  // If there are any steps for which there is no URL condition while also not being used for escalation or end,
  // the package assumes that a digression cannot be reliably detected.
  const isDigressionDetectable = Object.values(triggers).every(
    (trigger) => trigger.urlCondition != null,
  );

  let digressionCallbackCalled = false;

  return (location: Location | URL): boolean => {
    if (isDigressionDetectable) {
      const userHasDigressed = !urlConditions.some((cond) =>
        matchesUrlCondition(location, cond),
      );
      if (userHasDigressed) {
        // Avoid calling the digression callback multiple times after a digression has been detected
        if (!digressionCallbackCalled) {
          onDigression();
        }
        digressionCallbackCalled = true;
        return true;
      } else {
        digressionCallbackCalled = false;
        return false;
      }
    }
    return false;
  };
};
