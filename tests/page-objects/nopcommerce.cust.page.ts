import { expect, type Page } from "@playwright/test";
import BasePage from "./base.page";
import { log } from "../helpers/logger.js";

export default class CustPage extends BasePage {
  // Constructor
  constructor(page: Page) {
    super(page);
  }
  /** Elements */
  get firstNameInputBox() {
    return this.page.locator("[id='SearchFirstName']");

    //return this.page.getByRole("textbox", { name: "SearchFirstName" });
    //return this.page.getByPlaceholder('admin@yourstore.com');
    //return this.page.locator('#Email');
  }
  get lastNameInputBox() {
    return this.page.locator("[id='SearchLastName']");

    //return this.page.getByRole("textbox", { name: "SearchLastName" });
  }
  get searchBtn() {
    return this.page.locator("[id='search-customers']");
  }

  get noResultsMesage() {
    return this.page.locator(".dt-empty");
  }
/* Page Actions */

async goToCustomerListPage(custListPage: string) {
        this.navigateTo(custListPage);
    }

    async searchNameAndConfirm(firstname: string, lastname: string): Promise<boolean> {
        await log("info", `Searching user: ${firstname} ${lastname}...`);
        let nameExist = false;
        try {
            await this.typeInto(this.firstNameInputBox, firstname);
            await this.typeInto(this.lastNameInputBox, lastname);
            await this.click(this.searchBtn);
            let isNotDisplayed = await this.noResultsMesage.isVisible();
            if (isNotDisplayed) nameExist = true;
            await log("info", `User: ${firstname} ${lastname} exist in the customer list`);
        } catch (err) {
            (err as Error).message = `Failed searching given firstname: ${firstname} and lastname: ${lastname} on customers page, ${
                (err as Error).message
            }`;
            throw err;
        }
        return nameExist;
    }
}
