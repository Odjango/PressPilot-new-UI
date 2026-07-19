export type TextDirection = "ltr" | "rtl";

export interface StudioStep {
  id: "details" | "layout" | "customize" | "review" | "download";
  label: string;
  status: "complete" | "current" | "upcoming";
}

export interface PaletteOption {
  id: string;
  name: string;
  swatches: [string, string, string, string];
}

export interface TypographyOption {
  id: string;
  name: string;
  family: string;
}

export interface StudioProjectSample {
  id: string;
  name: string;
  description: string;
  status: "draft";
  language: string;
  direction: TextDirection;
  steps: StudioStep[];
  layout: { id: string; name: string; description: string };
  typography: TypographyOption;
  palette: PaletteOption;
  headline: string;
  heroAsset: string;
}
