export type PuNativeAction = {
  native?: "button" | "submit" | "reset";
};

export type PuHrefAction = {
  href: string;
  external?: boolean;
  target?: string;
  rel?: string;
};

export type PuRouteAction = {
  to: unknown;
};

export type PuAction = PuNativeAction | PuHrefAction | PuRouteAction;
