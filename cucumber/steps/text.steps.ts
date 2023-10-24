import { Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";

import type { ICustomWorld } from "../support/custom-world";

Then("I see {string}", async function (this: ICustomWorld, text: string) {
	const page = this.page!;
	const locator = page.getByText(text);
	await expect(locator).toBeAttached();
});
