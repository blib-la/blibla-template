import { Given, Then, When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";

import { config } from "../support/config";
import type { ICustomWorld } from "../support/custom-world";

Given("I am on the {string} page", async function (this: ICustomWorld, route: string) {
	const page = this.page!;
	await page.goto(`${config.BASE_URL}${route}`);
});

When("I visit {string}", async function (this: ICustomWorld, route: string) {
	const page = this.page!;
	await page.goto(`${config.BASE_URL}${route}`);
});

When("I reload the page", async function (this: ICustomWorld) {
	const page = this.page!;
	await page.reload();
});

Then("I should be on the {string} page", async function (this: ICustomWorld, route: string) {
	const page = this.page!;
	await page.waitForURL(`${config.BASE_URL}${route}**`);
	expect(page.url()).toContain(`${config.BASE_URL}${route}`);
});
