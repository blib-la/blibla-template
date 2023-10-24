import { Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";

import type { ICustomWorld } from "../support/custom-world";

Then(
	"{string} cookies should be {string}",
	async function (this: ICustomWorld, scope: string, state: string) {
		const context = this.context!;
		const cookies = await context.cookies();
		const consent = cookies.find(cookie => cookie.name === "USE_COOKIE_CONSENT_STATE");
		const value = JSON.parse(decodeURIComponent(consent!.value));
		let pass: boolean;
		const state_ = state === "enabled";
		switch (scope) {
			case "all": {
				pass = Object.values(value).every(Boolean);
				break;
			}

			default: {
				pass = Object.entries(value).some(([key, value]) => key === scope && value);
				break;
			}
		}

		expect(pass).toBe(state_);
	}
);
