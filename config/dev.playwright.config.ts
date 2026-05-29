import { defineConfig, devices } from "@playwright/test";
import { baseConfig } from "../playwright.config";
import { EnvConfig } from "../tests/helpers/config-fixtures";
import path from "path";

console.log(">>>> Running in DEV Environment......");

export default defineConfig<EnvConfig>({
  ...baseConfig, // load all existing config values
  testDir: path.resolve(process.cwd(), "./tests"),
  use: {
    ...baseConfig.use,
    envName: "dev",
    appURL: "www.google.com",
    //appURL: "https://katalon-demo-cura.herokuapp.com/",
    dbConfig: {
      server: "",
      dbname: "",
      connnectionStr: "",
    },
  },
});
