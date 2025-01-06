/* eslint-disable jsdoc/require-jsdoc */
import { useMediaQuery } from "@react-hookz/web";

export const useTailwindMediaQuery = (
  queryPrefix: "sm" | "md" | "lg",
): boolean | undefined => {
  if (queryPrefix === "sm") {
    return useMediaQuery("(min-width: 640px)");
  }
  if (queryPrefix === "md") {
    return useMediaQuery("(min-width: 768px)");
  }
  if (queryPrefix === "lg") {
    return useMediaQuery("(min-width: 1024px)");
  }
};
