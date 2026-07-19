import { render, screen } from "@testing-library/react";
import { PricingPage } from "./PricingPage";
import { ProjectsPage } from "./ProjectsPage";
import { SignInPage } from "./SignInPage";

test("presents all credit packs with only Single Site available at launch", () => {
  render(<PricingPage />);
  expect(screen.getByRole("heading", { name: "Simple, transparent pricing" })).toBeInTheDocument();
  for (const tier of ["Single Site", "Freelancer", "Agency", "Studio"]) {
    expect(screen.getByRole("heading", { name: tier })).toBeInTheDocument();
  }
  for (const price of ["$29.99", "$74.99", "$199.99", "$449.99"]) {
    expect(screen.getByText(price)).toBeInTheDocument();
  }

  expect(screen.getByRole("link", { name: "Get 1 credit" })).toHaveAttribute("href", "/studio?step=details");
  for (const label of ["Get 3 credits", "Get 10 credits", "Get 25 credits"]) {
    expect(screen.getByRole("button", { name: label })).toBeDisabled();
  }
  expect(screen.getAllByText("Coming soon")).toHaveLength(3);
  expect(screen.getByText("Most popular")).toBeInTheDocument();
  expect(screen.getByText(/Credits never expire, and there's no subscription\./)).toBeInTheDocument();
  expect(screen.getByText("Is the output really a standards-compliant FSE site?")).toBeInTheDocument();
  expect(screen.getAllByRole("link", { name: /Start in Studio/ }).some((link) => link.getAttribute("href") === "/studio?step=details")).toBe(true);
});

test("gives returning users an accessible sign-in form", () => {
  render(<SignInPage />);
  expect(screen.getByRole("heading", { name: "Welcome back" })).toBeInTheDocument();
  expect(screen.getByLabelText("Email address")).toHaveAttribute("type", "email");
  expect(screen.getByLabelText("Password")).toHaveAttribute("type", "password");
  expect(screen.getByRole("link", { name: "Forgot password?" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Sign in" })).toBeInTheDocument();
});

test("shows contextual next actions on the project dashboard", () => {
  render(<ProjectsPage />);
  expect(screen.getByRole("heading", { name: "Your websites" })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /Start a new website/ })).toHaveAttribute("href", "/studio?step=details");
  expect(screen.getByRole("link", { name: "Continue in Studio" })).toHaveAttribute("href", "/studio?step=customize");
  expect(screen.getByRole("link", { name: "Review website" })).toHaveAttribute("href", "/studio?step=review");
  expect(screen.getByRole("link", { name: "Download website" })).toHaveAttribute("href", "/studio?step=download");
});
