import { test, expect } from "@playwright/test";
import { log } from "../helpers/logger";
import HomePage from "../page-objects/nopcommerce.home.page";
import pwHelper from "../helpers/pw-helper";
import CustPage from "../page-objects/nopcommerce.cust.page.js";
import constants from "../../data/constants.json";
import fileHelper from "../helpers/file-helper";
import APITestData from "../../data/api/reqres-test-data";


//const envConfig=undefined;

test.describe("E2E Customer Search", () => {
  test("E2E_TC001: Search the external customers in customer portal", async ({
    page,
    request,
  }, testInfo) => {
    //get details from Env Config

 let  envConfig = testInfo.project.use as any;

    // Make a GET call
    await log("info", `Making a GET call using ${envConfig.apiURL}`);

    const res = await request.get(`${envConfig.apiURL}${constants.REQ_RES_ENDPOINTS.POST_USER}`, {
      headers: {
        "x-api-key": process.env.REQ_RES_API_KEY,
      },
    });
    // assert the response
    expect(res.status()).toBe(200);
    await log("info", `The GET call is succesfull with ${res.status()}`);
    // Get list of users
    const userData = await res.json();
    await log("info", `>> The list of Users: ==> ${JSON.stringify(userData)}`);
    /**2. Login to web */
    //create an object

    console.log(`=================== ${envConfig.nopCommerceWeb}`);
    console.log(`=================== ${process.env.NOPE_COMMERCE_TEST_USERNAME}`,);
    console.log(`=================== ${process.env.NOPE_COMMERCE_TEST_PASSWORD}`,);

    const homePage = new HomePage(page);

    await homePage.loginToNopeCommerceApp(
      envConfig.nopCommerceWeb,
      process.env.NOPE_COMMERCE_TEST_USERNAME,
      process.env.NOPE_COMMERCE_TEST_PASSWORD,
    );

    /** 3. Customer search */
    const USER_DATA1 = userData.data;

    //const USER_DATA=fileHelper.readFile(`process.cwd()/data/api/reqres-test-DataTransfer.ts`)


      const USER_DATA=APITestData.listOfUserApiTestData()

    const customerListPage = new CustPage(page);
    await customerListPage.goToCustomerListPage(
      `${envConfig.nopCommerceWeb}/Admin/Customer/List`,
    );
    // Iterate over the list of users
    for (const user of USER_DATA) {
      let customerNotFound = await customerListPage.searchNameAndConfirm(
        user.first_name,
        user.last_name,
      );

      if (customerNotFound) {
        await log(
          "warn",
          `The giver user: ${user.first_name} ${user.last_name} could not found in the portal`,
        );
      } else {
        await log(
          "info",
          `The giver user: ${user.first_name} ${user.first_name} found in the portal`,
        );
      }
    }

    pwHelper.takeFullPageScreenshot(page, "login page");
  });
});
