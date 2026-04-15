import { defineConfig } from "cypress";

export default defineConfig({
  allowCypressEnv: false,
  e2e: {
    baseUrl: "http://localhost:5173",
    supportFile: false,
    setupNodeEvents(_on, _config) {
      // implement node event listeners here
    },
    viewportWidth: 1280,
    viewportHeight: 720,
    video: false,
  },
});
