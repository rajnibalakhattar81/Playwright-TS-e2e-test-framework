import { expect, type Locator, type Page } from "@playwright/test";
import { log } from "../helpers/logger.js";
import { TIMEOUT } from "node:dns";

export default class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /* All reusable actions */
  async navigateToOld(path: string) {
    await log("info", `Navigating to the path: ${path}`);
    await this.page.goto(path, { timeout: 30_000 });
    //await expect(this.page.waitForURL("https://admin-demo.nopcommerce.com"));
  }

  async navigateTo(path: string) {
    await log("info", `Navigating to the path: ${path}`);

    await this.page.goto(path, {
      waitUntil: "domcontentloaded",
      timeout: 60000,
    });

    //await this.page.waitForLoadState("networkidle");
  }

  /** Click action */
  async click(ele: Locator) {
    try {
      await expect(ele).toBeVisible({ timeout: 40_000 }); // Custom timeout: Default - 5 seconds
      await ele.click();
    } catch (error) {
      await log(
        "error",
        `Failed to click element: ${ele.toString()}, original error: ${error}`,
      );
      throw error;
    }
  }

  /** Type action */
  async typeInto(ele: Locator, text: string) {
    try {
      await expect(ele).toBeVisible({ timeout: 40_000 });
      //await ele.waitFor({ state: 'visible', timeout: 40000 });

      //await this.page.pause()
      await ele.fill(text);
    } catch (error) {
      await log(
        "error",
        `Failed to type into element: ${ele.toString()}, original error: ${error}`,
      );
      throw error;
    }
  }
}
