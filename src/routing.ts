import type { StudioFlowState } from "./types/studio";

export type AppRoute = "home" | "pricing" | "signin" | "projects" | "studio";

const appRoutes: Record<string, AppRoute> = {
  "/": "home",
  "/pricing": "pricing",
  "/signin": "signin",
  "/projects": "projects",
  "/studio": "studio",
};

const studioSteps: StudioFlowState[] = ["details", "layout", "customize", "review", "building", "download"];

export function resolveAppRoute(pathname: string): AppRoute {
  return appRoutes[pathname] ?? "home";
}

export function resolveStudioStep(search: string): StudioFlowState {
  const value = new URLSearchParams(search).get("step") as StudioFlowState | null;
  return value && studioSteps.includes(value) ? value : "customize";
}
