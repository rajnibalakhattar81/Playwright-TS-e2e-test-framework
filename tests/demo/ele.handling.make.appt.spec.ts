import { test, expect } from "@playwright/test";

test.describe("Login Functionality", () => {
  test.beforeEach("Go to Login Page", async ({ page }) => {
    // Open the URl and assert the title and header
    await page.goto("https://katalon-demo-cura.herokuapp.com/");
    await expect(page).toHaveTitle("CURA Healthcare Service");
    await expect(page.locator("//h1")).toHaveText("CURA Healthcare Service");

    /**
     * ELEMENT: Button, Link
     *
     * @actions
     * 1. ✅ Click
     * 2. ✅ Press
     * 3. ✅ Double click
     * 4. ✅ Right click
     * 5. ✅ Hover if link
     * 6. ✅ [Optional] timeout if slow
     */

    // 2. Click on the Make Appointment
    // await page.getByRole("link", { name: "Make Appointment" }).click();
    // await page.getByRole("link", { name: "Make Appointment" }).press("Enter")
    // await page.getByRole("link", { name: "Make Appointment" }).dblclick();
    // await page.getByRole("link", { name: "Make Appointment" }).click({ button: "right" });
    // await page.getByRole("link", { name: "Make Appointment" }).hover()
    await page
      .getByRole("link", { name: "Make Appointment" })
      .click({ timeout: 10_000 });

    await expect(page.getByText("Please login to make")).toBeVisible();

    /**
     * ELEMENT:Text Box
     *
     * @actions
     * 1. ✅ Clear/click before filling
     * 2. ✅ Fill
     * 3. ✅ pressSequentially (Slow typing)
     */

    // Successful login
    await page.getByLabel("Username").fill("John Doe");

    // Clears and enter

    // await page.getByLabel("Username").clear()
    // await page.getByLabel("Username").fill("John Doe");

    // pressSequentially
    // await page
    //   .getByLabel("Username")
    //   .pressSequentially("John Doe", { delay: 300 });

    await page.getByLabel("Password").fill("ThisIsNotAPassword");
    await page.getByRole("button", { name: "Login" }).click();

    // Assert a text
    await expect(page.locator("h2")).toContainText("Make Appointment");
  });

  test("should make an appointment with non-default values", async ({
    page,
  }) => {
    /**
     * ELEMENT: Dropdown
     *
     * @actions
     * 1. ✅ Assert default option
     * 2. ✅ Select by:
     *  - label
     *  - Index
     * 3. ✅ Assert the count
     * 4. ✅ Get all dropdown values
     *
     * @notes
     * - Selenium - Select class and 3 selectBy* methods
     * - WebdriverIO - 3 selectBy* methods
     */

    // 📍Dropdown

    // assert the default value
    await expect(page.getByLabel("Facility")).toHaveValue(
      "Tokyo CURA Healthcare Center",
    );
    await page
      .getByLabel("Facility")
      .selectOption("Hongkong CURA Healthcare Center");

    // select by label or index
    await page
      .getByLabel("Facility")
      .selectOption({ label: "Seoul CURA Healthcare Center" });
    await page.getByLabel("Facility").selectOption({ index: 0 });

    // assert the count

    let drpDwnOptions = page.getByLabel("Facility").locator("option");
    await expect(drpDwnOptions).toHaveCount(3);

    // Get all dropdown values
    let listOfDrpDwnElems = await page.getByLabel("Facility").all();

    // For ... of loop
    let listOfOptions = [];
    for (let ele of listOfDrpDwnElems) {
      let eleText = await ele.textContent();
      if (eleText) listOfOptions.push(eleText);
    }
    console.log(`>>> List Of Options ${listOfOptions}`);

    /**
     * ELEMENT: Checkbox/Radio button
     *
     * @actions
     * 1. ✅Assert the default option - to be checked/unchecked
     * 2. ✅ Check/uncheck
     *
     * @notes
     * - Radio button - Allows to select only one option
     * - Checkbox - Allows for multi-entry
     */

    // select the checkbox for apply Hospital
    // await page.getByText("Apply for hospital readmission").click();
    await page.getByText("Apply for hospital readmission").check();
    await page.getByText("Apply for hospital readmission").uncheck();
    //await expect(page.getByText("Apply for hospital readmission")).toBeChecked()
    await expect(page.getByText("Apply for hospital readmission")).not.toBeChecked()

    //await page.waitForTimeout(30000);

    // select radio button for healthcare program
     await page.getByText("Medicaid").click();
     await expect(page.getByText("Medicaid")).toBeChecked();
     await page.getByText("Medicare").check();

     // Assert the default option - to be checked/unchecked     
     await expect(page.getByText("Medicaid")).not.toBeChecked();
    
    
    // select future date
    await page.locator("span").click();
    await page.getByRole("cell", { name: "29" }).nth(1).click();
    await page.locator("form").click();
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
