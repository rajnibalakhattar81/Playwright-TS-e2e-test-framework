import { test, expect } from "@playwright/test";
import { log } from "../helpers/logger";
import HomePage from "../page-objects/nopcommerce.home.page";
import pwHelper from "../helpers/pw-helper";

test("Login functionality of nopcommerce application", async ({
  page,
}, testInfo) => {
  //get details from Env Config

  const envConfig = testInfo.project.use as any;

  console.log(`=================== ${envConfig.nopCommerceWeb}`);
  console.log(`=================== ${process.env.NOPE_COMMERCE_TEST_USERNAME}`);
  console.log(`=================== ${process.env.NOPE_COMMERCE_TEST_PASSWORD}`);

  //create an object

  const homePage = new HomePage(page);
  await homePage.loginToNopeCommerceApp(
    envConfig.nopCommerceWeb,    
    process.env.NOPE_COMMERCE_TEST_USERNAME,
    process.env.NOPE_COMMERCE_TEST_PASSWORD,
  );

  pwHelper.takeFullPageScreenshot(page,'login page')

  
});
