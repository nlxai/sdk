// eslint-disable-next-line jsdoc/require-returns, jsdoc/require-param
/** @hidden @internal */
export const groupWhile = <T>(
  list: T[],
  breakGroup: (prev: T, current: T) => boolean,
): T[][] => groupWhileHelper([], list, breakGroup);

const groupWhileHelper = <T>(
  currentGroup: T[],
  list: T[],
  breakGroup: (prev: T, current: T) => boolean,
): T[][] => {
  if (list.length === 0) {
    return [currentGroup];
  }
  const [head, ...tail] = list;
  const newGroup = (() => {
    const lastInGroup = currentGroup[currentGroup.length - 1];
    if (lastInGroup == null) {
      return false;
    }
    return breakGroup(lastInGroup, head);
  })();
  if (newGroup) {
    return [currentGroup, ...groupWhileHelper([head], tail, breakGroup)];
  }
  return groupWhileHelper([...currentGroup, head], tail, breakGroup);
};
