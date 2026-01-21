/* eslint-disable jsdoc/require-jsdoc */
import { useMediaQuery } from "@react-hookz/web";

export const useTailwindMediaQuery = (
  queryPrefix: "sm" | "md" | "lg",
): boolean | undefined => {
  let query;
  switch (queryPrefix) {
    case "sm":
      query = "(min-width: 640px)";
      break;
    case "md":
      query = "(min-width: 768px)";
      break;
    case "lg":
      query = "(min-width: 1024px)";
      break;
  }
  return useMediaQuery(query);
};
