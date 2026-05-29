import { test, expect } from "@playwright/test";

test.describe("Multiple Windows Handling", () => {
  test("should navigate through multiple windows and assert headers", async ({
    page,
    context,
  }) => {
    // Navigate to the-internet.herokuapp.com
    await page.goto("https://the-internet.herokuapp.com/windows");
    await expect(page).toHaveTitle("The Internet");

    // Assert the current window header
    await expect(page.locator("h3")).toHaveText("Opening a new window");

    // Click on the link to open a new window
    const newWindowPromise = context.waitForEvent("page");
    await page.getByRole("link", { name: "Click Here" }).click();
    const newWindow = await newWindowPromise;

    // Navigate to the newly opened window and assert the header
    await newWindow.waitForLoadState();
    await expect(newWindow.locator("h3")).toHaveText("New Window");

    // // Click the link on that window to open another new window
    // const anotherNewWindowPromise = context.waitForEvent("page");
    // await newWindow.getByRole("link", { name: "Click Here" }).click();
    // const anotherNewWindow = await anotherNewWindowPromise;

    // // Navigate to the next window that is opened and assert the header
    // await anotherNewWindow.waitForLoadState();
    // await expect(anotherNewWindow.locator("h3")).toHaveText("New Window");

    // // Come back to the parent window and assert
    // await expect(page.locator("h3")).toHaveText("Opening a new window");

    // Close the child windows
    await newWindow.close();
   // await anotherNewWindow.close();
  });
});
