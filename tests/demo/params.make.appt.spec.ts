import { test, expect } from "@playwright/test";
import TestData from "../../data/test-data";

const makeApptTestData = TestData.makeApptTestData();

for (const appData of makeApptTestData) {
  test.describe("Login Functionality", () => {
    test.beforeEach("Go to Login Page", async ({ page }) => {
      // Open the URl and assert the title and header
      await page.goto("https://katalon-demo-cura.herokuapp.com/");
      await expect(page).toHaveTitle("CURA Healthcare Service");
      await expect(page.locator("//h1")).toHaveText("CURA Healthcare Service");

      // Click on Make appointment and assert the text on page
      await page.getByRole("link", { name: "Make Appointment" }).click();
      await expect(page.locator("#login")).toContainText(
        "Please login to make appointment.",
      );
      await page.getByLabel("Username").fill("John Doe");
      await page.getByLabel("Username").press("Tab");
      await page.getByLabel("Password").fill("ThisIsNotAPassword");
      await page.getByRole("button", { name: "Login" }).click();

      // get login cookies
      const loginCookies= await page.context().cookies()
      process.env.LOGIN_COOKIES=JSON.stringify(loginCookies);

      // assert the appointment text
      await expect(page.locator("h2")).toContainText("Make Appointment");
    });

    test(`${appData.testId} : should make an appointment successfully`, async ({ page }) => {


      // access login cookies

      console.log(`>> Login Cookies: ${process.env.LOGIN_COOKIES}`);
      // select an option from facility
      await page
        .getByLabel("Facility")
        .selectOption(appData.facility);
      // select the checkbox for apply Hospital
      await page.getByText("Apply for hospital readmission").click();
      // select radio button for healthcare program
      await page.getByText(appData.hcp).click();
      // select future date
      // await page.locator("span").click();
      // await page.getByRole("cell", { name: "29" }).nth(1).click();
      // await page.locator("form").click();
       // Date input box
      await page
        .getByRole("textbox", { name: "Visit Date (Required)" })
        .click();
      await page
        .getByRole("textbox", { name: "Visit Date (Required)" })
        .fill(appData.visitDt);
      await page
        .getByRole("textbox", { name: "Visit Date (Required)" })
        .press("Enter");
      // add comments
      await page.getByRole("textbox", { name: "Comment" }).click();
      await page
        .getByRole("textbox", { name: "Comment" })
        .fill("This is multiline  comments section");

      //Click appointment button
      await page.getByRole("button", { name: "Book Appointment" }).click();

      // assert the appointment confirmation
      await expect(
        page.getByRole("heading", { name: "Appointment Confirmation" }),
      ).toBeVisible();
      await expect(
        page.getByRole("link", { name: "Go to Homepage" }),
      ).toBeVisible();
    });
  });
}
