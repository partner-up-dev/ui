import type { PropType } from "vue";
import {
  makeArrayProp,
  makeBooleanProp,
  makeNumberProp,
  makeStringProp,
} from "../../utils/props";
import type {
  PuSnackbarCloseReason,
  PuSnackbarTone,
} from "./puSnackbar";

export const puSnackbarHostPositions = [
  "bottom",
  "bottom-start",
  "bottom-end",
  "top",
  "top-start",
  "top-end",
] as const;

export type PuSnackbarHostPosition =
  (typeof puSnackbarHostPositions)[number];

export type PuSnackbarId = string | number;

export interface PuSnackbarItem {
  id: PuSnackbarId;
  message: string;
  tone?: PuSnackbarTone;
  actionLabel?: string;
  dismissible?: boolean;
  closeLabel?: string;
  duration?: number;
}

export interface PuSnackbarClosePayload {
  item: PuSnackbarItem;
  reason: PuSnackbarCloseReason;
}

export interface PuSnackbarActionPayload {
  item: PuSnackbarItem;
  event: MouseEvent;
}

export const puSnackbarHostProps = {
  items: makeArrayProp<PuSnackbarItem>(),
  position: {
    type: String as PropType<PuSnackbarHostPosition>,
    default: "bottom",
    validator: (value: string) =>
      puSnackbarHostPositions.includes(value as PuSnackbarHostPosition),
  },
  maxVisible: makeNumberProp(3),
  defaultDuration: makeNumberProp(6000),
  pauseOnHover: makeBooleanProp(true),
  ariaLabel: makeStringProp("Notifications"),
};

export const puSnackbarHostEmits = {
  "update:items": (_items: PuSnackbarItem[]) => true,
  close: (_payload: PuSnackbarClosePayload) => true,
  action: (_payload: PuSnackbarActionPayload) => true,
};
