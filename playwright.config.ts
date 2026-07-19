import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  timeout: 30_000,
  expect: { timeout: 5_000 },
  use: {
    baseURL: "http://127.0.0.1:4182",
    headless: true,
    colorScheme: "dark",
  },
  webServer: {
    command: "npm run dev -- --port=4182",
    url: "http://127.0.0.1:4182",
    reuseExistingServer: true,
    timeout: 30_000,
  },
});
