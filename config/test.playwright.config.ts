import { defineConfig, devices } from "@playwright/test";
import { baseConfig } from "../playwright.config";
import { EnvConfig } from "../tests/helpers/config-fixtures";
import path from "path";

console.log(">>>> Running in TEST Environment......");

export default defineConfig<EnvConfig>({
  ...baseConfig, // load all existing config values
  testDir: path.resolve(process.cwd(), "./tests"),
  use: {
    ...baseConfig.use,
    envName: "test",
    //appURL: "www.google.com",
    appURL: "https://katalon-demo-cura.herokuapp.com/",
    nopCommerceWeb: "https://admin-demo.nopcommerce.com",
    //nopCommerceWeb: "https://admin-demo.nopcommerce.com/login?returnUrl=%2Fadmin%2F",
    apiURL: "https://reqres.in/api",
    dbConfig: {
      server: "",
      dbname: "",
      connnectionStr: "",
    },
  },
});
