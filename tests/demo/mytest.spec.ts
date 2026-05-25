import{test,expect,devices} from '@playwright/test';
import constants from "../../data/constants.json";

test("should load  homepage with correct title", async({page})=> {

// go to page

await page.goto("https://katalon-demo-cura.herokuapp.com/");

// assert if  the title is correct
await expect(page).toHaveTitle("CURA Healthcare Service");

// assert the header text
await expect(page.locator('//h1')).toHaveText('CURA Healthcare Service');

})
test("Should demo config file", async ({ page }, testInfo) => {
    console.log(`>> Config at run-time: ${JSON.stringify(testInfo.config)}`);
});

test("Should demo fixtures", async ({ request }, testInfo) => {
    // console.log(`>> The test runs on ${browserName}`);
});

test("Should demo devices", async ({ page }, testInfo) => {
    console.log(`>> The list of devies: ${Object.keys(devices)}`);
});

test("Should demo parallel run 1", { tag: "@demo" }, async ({ page }, testInfo) => {
    await page.goto("https://www.google.com");
});

test("Should demo parallel run 2", { tag: "@demo" }, async ({ page }, testInfo) => {
    await page.goto("https://www.google.com");
});

test.only("Should demo constants data", async ({ page }, testInfo) => {
    console.log(`>> Constants data: ${JSON.stringify(constants.STATUSCODES)}`);
});

test("Should demo a click action", async ({ page }, testInfo) => {
    // Default action
   //  await page.goto("https://katalon-demo-cura.herokuapp.com/");
    let ele = page.getByRole("link", { name: "Make-Appointment" });
    // await ele.click();

    // Base page action
    await page.goto("https://katalon-demo-cura.herokuapp.com/");
    
    try {
        await expect(ele).toBeVisible({ timeout: 10_000 }); // Custom timeout: Default - 5 seconds
        await ele.click();
    } catch (error) {
        //await log("error", `Failed to click element: ${ele.toString()}, original error: ${error}`);
        throw error;
    }
});
