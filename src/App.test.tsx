import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders the approved Studio step", () => {
  render(<App />);
  expect(screen.getByRole("heading", { name: /customize the website/i })).toBeInTheDocument();
  expect(screen.getByText(/step 3 of 5/i)).toBeInTheDocument();
});
