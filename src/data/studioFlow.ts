import type { StudioFlowState, StudioStep } from "../types/studio";

const STEP_DEFINITIONS: Array<Pick<StudioStep, "id" | "label">> = [
  { id: "details", label: "Business details" },
  { id: "layout", label: "Choose layout" },
  { id: "customize", label: "Customize" },
  { id: "review", label: "Review" },
  { id: "download", label: "Download & install" },
];

const FLOW_INDEX: Record<StudioFlowState, number> = {
  customize: 2,
  review: 3,
  building: 3,
  download: 4,
};

export function getStepsForFlow(flow: StudioFlowState): StudioStep[] {
  const currentIndex = FLOW_INDEX[flow];
  return STEP_DEFINITIONS.map((step, index) => ({
    ...step,
    status: index < currentIndex ? "complete" : index === currentIndex ? "current" : "upcoming",
  }));
}
