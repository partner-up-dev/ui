import { makeStringProp } from "../../utils/props";

export type PuFooterRevealPageScaffoldContentPlacement = "start" | "center";

export const puFooterRevealPageScaffoldProps = {
  contentPlacement: makeStringProp<PuFooterRevealPageScaffoldContentPlacement>("start"),
};

