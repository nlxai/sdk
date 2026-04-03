import { type CustomModalityComponent } from "../../interface";
import { DefaultDateInput } from "./DefaultDateInput";
import { DefaultCard } from "./DefaultCard";
import { DefaultCarousel } from "./DefaultCarousel";

export const defaultModalities: Record<
  string,
  CustomModalityComponent<unknown>
> = {
  DefaultDateInput: DefaultDateInput as CustomModalityComponent<unknown>,
  DefaultCard: DefaultCard as CustomModalityComponent<unknown>,
  DefaultCarousel: DefaultCarousel as CustomModalityComponent<unknown>,
};
