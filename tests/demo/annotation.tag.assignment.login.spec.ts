import { test, expect } from "@playwright/test";

test.describe("Login Functionality",{annotation: {type:"test annotation" , description: "learning annotation" }, tag:'@regression' },() => {
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
  });

  test("should login successfully with valid creds",{tag: '@smoke'}, async ({ page,browserName  },testinfo) => {

    //test.skip(browserName==="firefox", "skip on firefox browser")
    // Login with valid credentials and assert the text after successful login
    await page.getByLabel("Username").fill("John Doe");
    await page.getByLabel("Username").press("Tab");
    await page.getByLabel("Password").fill("ThisIsNotAPassword");
    await page.getByRole("button", { name: "Login" }).click();

    let fullpagescreenshot= await page.screenshot({ fullPage: true });
    await testinfo.attach('login',{
      body: fullpagescreenshot,
      contentType: 'image/png'

    })


    // assert the appointment text
    await expect(page.locator("h2")).toContainText("Make Appointment");
  });

  test("should prevent login with invalid creds", {tag: '@smoke'},async ({ page }) => {
    // Login with valid credentials and assert the text after successful login
    await page.getByLabel("Username").fill("John Doe");
    await page.getByLabel("Username").press("Tab");
    await page.getByLabel("Password").fill("ThisIsNotAPassword");
    await page.getByRole("button", { name: "Login" }).click();

    // Assert the error text
    await expect(page.locator("#login")).toContainText(
      "Login failed! Please ensure the username and password are valid.",
    );
  });
});
