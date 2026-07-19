import { render, screen, within } from "@testing-library/react";
import { MarketingHome } from "./MarketingHome";

test("presents the complete public homepage journey with approved product language", () => {
  const { container } = render(<MarketingHome />);

  const header = screen.getByRole("banner");
  for (const label of ["How it works", "Website examples", "Pricing", "Help", "Sign in"]) {
    expect(within(header).getByRole("link", { name: label })).toBeInTheDocument();
  }

  expect(screen.getByRole("heading", { name: "Your business, turned into a complete WordPress website." })).toBeInTheDocument();
  expect(screen.getByText("Ready in minutes · $29.99 once · No subscription")).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "Watch PressPilot build a website" })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "See what PressPilot builds" })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "From your brief to an install-ready website" })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "Everything required for a complete website" })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "One website. One clear price." })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "Turn your business into a website you own." })).toBeInTheDocument();
  expect(container).not.toHaveTextContent(/theme generator|build my site|get studio/i);
});

test("shows a real transformation preview and four complete website examples", () => {
  render(<MarketingHome />);

  expect(screen.getByRole("group", { name: "Business brief becomes a complete website" })).toBeInTheDocument();
  expect(screen.getAllByRole("img")).toHaveLength(4);
  for (const name of ["Ritual Clay", "Northline Advisory", "Sora House", "دار أميغو"]) {
    expect(screen.getByRole("img", { name: `${name} website preview` })).toBeInTheDocument();
  }

  const pricing = screen.getByRole("heading", { name: "One website. One clear price." }).closest("section")!;
  expect(within(pricing).getByRole("link", { name: "Start in Studio" })).toHaveAttribute("href", "/studio?step=details");
});
