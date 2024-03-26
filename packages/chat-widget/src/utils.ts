export const groupWhile = <T>(
  list: T[],
  breakGroup: (prev: T, current: T) => boolean
): T[][] => groupWhileHelper([], list, breakGroup);

const groupWhileHelper = <T>(
  currentGroup: T[],
  list: T[],
  breakGroup: (prev: T, current: T) => boolean
): T[][] => {
  if (list.length === 0) {
    return [currentGroup];
  }
  const [head, ...tail] = list;
  const newGroup = (() => {
    const lastInGroup = currentGroup[currentGroup.length - 1];
    // initial eslint integration
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!lastInGroup) {
      return false;
    }
    return breakGroup(lastInGroup, head);
  })();
  if (newGroup) {
    return [currentGroup, ...groupWhileHelper([head], tail, breakGroup)];
  }
  return groupWhileHelper([...currentGroup, head], tail, breakGroup);
};
