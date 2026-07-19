import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders the approved Studio step", () => {
  render(<App />);
  expect(screen.getByRole("banner")).toBeInTheDocument();
  expect(screen.getByLabelText("Ambient background")).toHaveAttribute("aria-hidden", "true");
  expect(screen.getByRole("heading", { name: /customize the website/i })).toBeInTheDocument();
  expect(screen.getAllByText(/step 3 of 5/i)).not.toHaveLength(0);
  expect(screen.getByRole("region", { name: "Website preview" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Review website" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Back to layout" })).toBeInTheDocument();
});
