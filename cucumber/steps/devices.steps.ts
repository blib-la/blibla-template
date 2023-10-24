import { Given } from "@cucumber/cucumber";

import type { ICustomWorld } from "../support/custom-world";

Given("I am using a {string}", async function (this: ICustomWorld, device: string) {
	const page = this.page!;
	switch (device) {
		case "iPhone SE": {
			await page.setViewportSize({ width: 375, height: 667 });
			break;
		}

		case "Samsung Galaxy S8+": {
			await page.setViewportSize({ width: 360, height: 740 });
			break;
		}

		case "iPad Air": {
			await page.setViewportSize({ width: 820, height: 1080 });
			break;
		}

		default: {
			break;
		}
	}
});
