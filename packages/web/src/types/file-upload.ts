export const puFileUploadModes = ["file", "url", "both"] as const;
export const puFileUploadLayouts = ["inline", "panel"] as const;

export type PuFileUploadMode = (typeof puFileUploadModes)[number];
export type PuFileUploadLayout = (typeof puFileUploadLayouts)[number];

export type PuFileUploadItemSource = "file" | "url";

export type PuFileUploadItemStatus =
  | "idle"
  | "ready"
  | "uploading"
  | "success"
  | "error";

export type PuFileUploadItem = {
  id: string;
  source: PuFileUploadItemSource;
  name: string;
  url?: string;
  file?: File;
  size?: number;
  type?: string;
  status?: PuFileUploadItemStatus;
  message?: string;
};

export type PuFileUploadRejectionCode =
  | "too-many-files"
  | "file-too-large"
  | "file-type-not-accepted"
  | "invalid-url"
  | "duplicate"
  | "disabled"
  | "readonly";

export type PuFileUploadRejection = {
  code: PuFileUploadRejectionCode;
  message: string;
  file?: File;
  url?: string;
};
