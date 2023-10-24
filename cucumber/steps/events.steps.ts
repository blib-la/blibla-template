import { Then, When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";

import type { ICustomWorld } from "../support/custom-world";

When(
	"I click on {string} in {string}",
	async function (this: ICustomWorld, text: string, element: string) {
		const page = this.page!;
		const element_ = page.getByTestId(element);
		await element_.getByText(text).click();
	}
);

When(
	"I click on the {string} in {string}",
	async function (this: ICustomWorld, element: string, wrapper: string) {
		const page = this.page!;
		const wrapper_ = page.getByTestId(wrapper);
		await wrapper_.getByTestId(element).scrollIntoViewIfNeeded();
		await wrapper_.getByTestId(element).click();
	}
);

When("I click on the {string}", async function (this: ICustomWorld, element: string) {
	const page = this.page!;
	await page.getByTestId(element).click({ force: true });
});

When("I switch to language {string}", async function (this: ICustomWorld, language: string) {
	const page = this.page!;
	await page.getByTestId("language-selector").click({ force: true });
	const listbox = page.getByTestId("language-selector-listbox");
	await expect(listbox).toBeVisible();
	await listbox.getByText(language).click({ force: true });
});

When(
	"I fill in {string} with {string}",
	async function (this: ICustomWorld, element: string, value: string) {
		const page = this.page!;
		const element_ = page.getByTestId(element);
		await element_.fill(value);
		const name = await element_.getAttribute("name");
		await page.route("**/api/user/profile", async route => {
			await route.fulfill({ json: { [name!]: value } });
		});
	}
);

When(
	"I set the {string} to {string}",
	async function (this: ICustomWorld, element: string, value: string) {
		const page = this.page!;
		const element_ = page.getByTestId(element);
		await element_.fill(value);
	}
);

Then(
	"the {string} should have {string} {string}",
	async function (this: ICustomWorld, element: string, property: string, value: string) {
		const page = this.page!;

		// Function to check the computed style of an element
		async function checkElementStyle(
			elementTestId: string,
			cssProperty: string,
			expectedValue: string
		) {
			const actualValue = await page.$eval(
				`[data-testid="${elementTestId}"]`,
				(element_, property_) => {
					const computedStyle = window.getComputedStyle(element_);
					return computedStyle[property_ as keyof CSSStyleDeclaration];
				},
				cssProperty
			);

			expect(actualValue).toEqual(expectedValue);
		}

		await checkElementStyle(element, property, value);
	}
);

Then(
	"the {string} should have {string} with {string}",
	async function (this: ICustomWorld, element: string, property: string, value: string) {
		const page = this.page!;

		// Function to check the computed style of an element
		async function checkElementStyle(
			elementTestId: string,
			cssProperty: string,
			expectedValue: string
		) {
			const actualValue = await page.$eval(
				`[data-testid="${elementTestId}"]`,
				(element_, property_) => {
					const computedStyle = window.getComputedStyle(element_);
					return computedStyle[property_ as keyof CSSStyleDeclaration];
				},
				cssProperty
			);

			expect(actualValue).toContain(expectedValue);
		}

		await checkElementStyle(element, property, value);
	}
);

Then(
	"the {string} should have attribute {string} {string}",
	async function (this: ICustomWorld, element: string, attribute: string, value: string) {
		const page = this.page!;
		await page.waitForSelector(`[data-testid="${element}"]`, { state: "attached" });
		const element_ = page.getByTestId(element);
		const value_ = await element_.getAttribute(attribute);
		expect(value_).toBe(value);
	}
);
