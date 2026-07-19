import type { PaletteOption, StudioProjectSample, TypographyOption } from "../types/studio";

export const typographyOptions: TypographyOption[] = [
  { id: "clean", name: "Clean Sans", family: "Host Grotesk" },
  { id: "editorial", name: "Editorial Serif", family: "Georgia" },
  { id: "bold", name: "Bold Impact", family: "Arial Black" },
  { id: "friendly", name: "Friendly Round", family: "Trebuchet MS" },
];

export const paletteOptions: PaletteOption[] = [
  { id: "brand", name: "Brand Kit", swatches: ["#f5f2ea", "#151515", "#dfbe43", "#ece7db"] },
  { id: "gallery", name: "Gallery Warm", swatches: ["#f4efe7", "#44291d", "#bb7550", "#d8b987"] },
  { id: "modern", name: "Modern Moss", swatches: ["#eef1e7", "#20342b", "#789575", "#c1c9b5"] },
];

export const defaultProject: StudioProjectSample = {
  id: "9de98e21",
  name: "Amigo Store",
  description: "A curated menswear shop for timeless essentials, independent labels, and considered everyday style.",
  status: "draft",
  language: "English",
  direction: "ltr",
  steps: [
    { id: "details", label: "Business details", status: "complete" },
    { id: "layout", label: "Choose layout", status: "complete" },
    { id: "customize", label: "Customize", status: "current" },
    { id: "review", label: "Review", status: "upcoming" },
    { id: "download", label: "Download", status: "upcoming" },
  ],
  layout: { id: "split", name: "Split Hero", description: "Editorial copy and imagery side by side" },
  typography: typographyOptions[0],
  palette: paletteOptions[0],
  headline: "Style that stays with you.",
  heroAsset: "/samples/amigo-store/hero-placeholder.svg",
};
