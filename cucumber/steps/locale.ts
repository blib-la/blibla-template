import { Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";

import type { ICustomWorld } from "../support/custom-world";

Then(
	"the website language should be {string}",
	async function (this: ICustomWorld, locale: string) {
		const page = this.page!;
		await page.waitForSelector(`html[lang=${locale}]`);
		const langFromDOM = await page.getAttribute("html", "lang");
		expect(langFromDOM).toBe(locale);
	}
);
