import { makeBooleanProp, makeStringProp } from "../../utils/props";

export const puExpandableCardProps = {
  title: {
    type: String,
    required: true as const,
  },
  subtitle: makeStringProp<string | null>(null),
  defaultExpanded: makeBooleanProp(false),
};

