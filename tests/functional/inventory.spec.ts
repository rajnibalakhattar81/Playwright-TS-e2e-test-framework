import { test, expect } from "@playwright/test";
/**
 * Scenario:
 * 1. ✅ Login as standard user
 * 2. ✅ Get a list of products with its price
 * 3. ✅ Assert that all products have non-zero dollar value
 *
 * @locators
 * 1. .inventory_item -> all products
 * 2. .inventory_item_name -> products
 * 3. .inventory_item_price -> prices
 */

test.describe("inventory feature", () => {
  test.beforeEach("login with valid creds", async ({ page }) => {
    // Launch the URL
    await page.goto("https://www.saucedemo.com/");
    // Login
    await page.locator('[data-test="username"]').fill("standard_user");
    await page.locator('[data-test="username"]').press("Tab");
    await page.locator('[data-test="password"]').fill("secret_sauce");
    await page.locator('[data-test="login-button"]').click();

    // assert the URL
    //await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await expect(page).toHaveURL(/.*\/inventory/);

    //await expect(page.getByText('Products')).toBeVisible();

    //await expect(page.locator('[data-test="inventory-list"]')).toContainText('$29.99');
  });

  test("Should confirm all prices are non-zero values", async ({ page }) => {
    // Get List of Products

    let productElements = page.locator(".inventory_item");
    await expect(productElements).toHaveCount(6);

    // Get Product names and prices

    let totalProducts = await productElements.count();

    let priceArr = [];
    for (let i = 0; i < totalProducts; i++) {
      let eleNode = productElements.nth(i);

      // Product name
      let productName = await eleNode
        .locator(".inventory_item_name")
        .innerText();

      // Price
      let price = await eleNode.locator(".inventory_item_price").innerText();
      // Print the results
      console.log(`Product: ${productName}, price: ${price}`);

      priceArr.push(price);
    }

    console.log(`Original Price Array: ${priceArr}`);

    /**
     * [$29.99,$9.99,$15.99,$49.99,$7.99,$15.99]
     * 1. Replace all $ with ""
     * 2. Compare the price which should be > 0
     *
     * [29.99,9.99,15.99,49.99,7.99,15.99]
     */

    let priceArrNum = priceArr.map((item) => parseFloat(item.replace("$", "")));
    console.log(`>> Modified arr: ${priceArrNum}`);

    let priceArrWithInvalidVals = priceArrNum.filter((item) => item <= 0);

    if (priceArrWithInvalidVals.length > 0)
      console.log(
        `Error : Zero Price Value Found:  ${priceArrWithInvalidVals}`,
      );
    else console.log(`Info : All prices are non-zero values`);

    expect(priceArrWithInvalidVals).toHaveLength(0);
  });

  test("Should be able to checkout successfully", async ({ page }) => {
    /**
     * 1. select first product
     * 2. click Add to Cart
     * 3. click on Cartbutton on the top
     * 4. Assert the right product
     * 5.Click on Checkout
     * 6.Fill the form
     * 7.Click Continue
     * 8.Assert the Checkout confirmation
     *
     *
     *
     */

    //await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

    let selectedElement = await page
      .locator(".inventory_item_name")
      .first()
      .innerText();

    await page.locator(".inventory_item_name").first().click();
    let selectedProduct = await page
      .locator(".inventory_details_name.large_size")
      .innerText();
    // assertion
    expect(selectedProduct).toEqual(selectedElement);
    await page.getByRole("button", { name: "Add to cart" }).click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('[data-test="checkout"]').click();
    await page.locator('[data-test="firstName"]').fill("Rajni");
    await page.locator('[data-test="lastName"]').fill("Khattar");
    await page.locator('[data-test="postalCode"]').fill("201014");
    await page.locator('[data-test="continue"]').click();
    await expect(page.locator('[data-test="title"]')).toBeVisible();
    await page.locator('[data-test="finish"]').dblclick();
    await expect(page.locator('[data-test="complete-header"]')).toBeVisible();
    await page.locator('[data-test="complete-header"]').click();
    await expect(page.locator('[data-test="back-to-products"]')).toContainText(
      "Back Home",
    );

    //await page.waitForTimeout(20000);
    // await page.locator('[data-test="shopping-cart-link"]').click();
    // await expect(page.locator('[data-test="item-4-title-link"]')).toBeVisible();
    // await expect(page.locator('[data-test="item-4-title-link"]')).toBeVisible();
    // await page.locator('[data-test="item-4-title-link"]').click();
    // await page.locator('[data-test="shopping-cart-link"]').click();
    // await page.locator('[data-test="checkout"]').click();
    // await page.locator('[data-test="firstName"]').click();
    // await page.locator('[data-test="firstName"]').click();
    // await page.locator('[data-test="firstName"]').fill("Rajni");
    // await page.locator('[data-test="firstName"]').press("Tab");
    // await page.locator('[data-test="lastName"]').fill("Khattar");
    // await page.locator('[data-test="lastName"]').press("Tab");
    // await page.locator('[data-test="postalCode"]').fill("201014");
    // await page.locator('[data-test="continue"]').click();
    // await expect(page.locator('[data-test="title"]')).toBeVisible();
    // await page.locator('[data-test="secondary-header"]').click();
    // await page.locator('[data-test="finish"]').dblclick();
    // await expect(page.locator('[data-test="complete-header"]')).toBeVisible();
    // await page.locator('[data-test="complete-header"]').click();
    // await expect(page.locator('[data-test="back-to-products"]')).toContainText(
    //   "Back Home",
    // );
  });
});
