import{test,expect} from '@playwright/test';

test("should load  homepage with correct title", async({page})=> {

// go to page

await page.goto("https://katalon-demo-cura.herokuapp.com/");

// assert if  the title is correct
await expect(page).toHaveTitle("CURA Healthcare Service");

// assert the header text
await expect(page.locator('//h1')).toHaveText('CURA Healthcare Service');

})
