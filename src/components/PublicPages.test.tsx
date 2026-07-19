import { render, screen } from "@testing-library/react";
import { PricingPage } from "./PricingPage";
import { ProjectsPage } from "./ProjectsPage";
import { SignInPage } from "./SignInPage";

test("presents the complete one-time website purchase", () => {
  render(<PricingPage />);
  expect(screen.getByRole("heading", { name: "One clear price. Your complete website." })).toBeInTheDocument();
  expect(screen.getByText("$29.99")).toBeInTheDocument();
  expect(screen.getByText("No subscription")).toBeInTheDocument();
  expect(screen.getByText("Seven website languages")).toBeInTheDocument();
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
