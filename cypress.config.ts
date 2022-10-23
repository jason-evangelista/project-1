/* eslint-disable @typescript-eslint/no-unused-vars */
import { defineConfig } from "cypress";
import tasks from "./cypress/plugins/";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      tasks(on, config);
    },
    baseUrl: "http://localhost:3000",
  },
});
