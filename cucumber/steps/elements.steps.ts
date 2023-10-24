import { Given, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";

import type { ICustomWorld } from "../support/custom-world";

Given(
	"the {string} is {string}",
	async function (this: ICustomWorld, element: string, state: string) {
		const context = this.context!;
		const page = this.page!;
		switch (element) {
			case "cookie-banner": {
				switch (state) {
					case "visible": {
						await context.clearCookies();
						break;
					}

					case "hidden": {
						await context.addCookies([
							{
								name: "USE_COOKIE_CONSENT_STATE",
								value: '{"necessary":true}',
								domain: "localhost",
								path: "/",
								httpOnly: false,
								expires: Math.floor(Date.now() / 1000) + 3600,
							},
						]);
						await page.reload();
						break;
					}

					default: {
						throw new Error("Cucumber Step not implemented");
					}
				}

				break;
			}

			default: {
				throw new Error("Cucumber Step not implemented");
			}
		}
	}
);

Then("I should see the {string}", async function (this: ICustomWorld, element: string) {
	const page = this.page!;
	const element_ = page.getByTestId(element);
	await expect(element_).toBeVisible();
});

Then(
	"the {string} should display the {string}",
	async function (this: ICustomWorld, wrapper: string, element: string) {
		const page = this.page!;
		const wrapper_ = page.getByTestId(wrapper);
		const element_ = wrapper_.getByTestId(element);
		await expect(element_).toBeVisible();
	}
);

Then(
	"the {string} should display {string}",
	async function (this: ICustomWorld, element: string, text: string) {
		const page = this.page!;
		const element_ = page.getByTestId(element);
		await expect(element_).toHaveText(text);
	}
);

Then(
	"{string} in {string} should be {string}",
	async function (this: ICustomWorld, text: string, element: string, state: string) {
		const page = this.page!;
		const element_ = page.getByTestId(element);
		const text_ = element_.getByText(text);
		switch (state) {
			case "selected": {
				await expect(text_).toHaveClass(/MuiLink-variantSoft/);
				break;
			}

			case "disabled": {
				await expect(text_).toBeDisabled();
				break;
			}

			default: {
				throw new Error("Cucumber Step not implemented");
			}
		}
	}
);

Then(
	"the {string} should be {string}",
	async function (this: ICustomWorld, element: string, state: string) {
		const page = this.page!;

		const element_ = page.getByTestId(element);
		switch (state) {
			case "checked": {
				await expect(element_).toBeChecked();
				break;
			}

			case "unchecked": {
				await expect(element_).not.toBeChecked();
				break;
			}

			case "disabled": {
				await expect(element_).toBeDisabled();
				break;
			}

			case "hidden": {
				await expect(element_).not.toBeVisible();
				break;
			}

			case "visible": {
				await element_.scrollIntoViewIfNeeded();
				await expect(element_).toBeVisible();
				await expect(element_).toBeInViewport();
				break;
			}

			case "existing": {
				await expect(element_).toBeVisible();
				break;
			}

			default: {
				throw Error;
			}
		}
	}
);
