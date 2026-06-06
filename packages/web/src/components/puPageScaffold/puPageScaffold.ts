import { makeBooleanProp, makeStringProp } from "../../utils/props";

export type PuPageScaffoldViewport = "document" | "screen";

export type PuPageScaffoldLayout = "single" | "aside";

export type PuPageScaffoldWidth = "page" | "wide" | "full";

export type PuPageScaffoldContentPlacement = "start" | "center";

export type PuPageScaffoldFooterPlacement = "auto" | "inside" | "reveal";

export const puPageScaffoldProps = {
  viewport: makeStringProp<PuPageScaffoldViewport>("document"),
  layout: makeStringProp<PuPageScaffoldLayout>("single"),
  width: makeStringProp<PuPageScaffoldWidth>("page"),
  contentPlacement: makeStringProp<PuPageScaffoldContentPlacement>("start"),
  footerPlacement: makeStringProp<PuPageScaffoldFooterPlacement>("auto"),
  stickyAside: makeBooleanProp(false),
};
