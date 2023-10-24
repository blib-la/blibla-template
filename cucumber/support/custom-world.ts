import { setWorldConstructor, World } from "@cucumber/cucumber";
import type * as messages from "@cucumber/messages";
import type {
	BrowserContext,
	Page,
	PlaywrightTestOptions,
	APIRequestContext,
} from "@playwright/test";

export interface ICustomWorld extends World {
	debug: boolean;
	feature?: messages.Pickle;
	context?: BrowserContext;
	page?: Page;

	testName?: string;
	startTime?: Date;

	server?: APIRequestContext;

	playwrightOptions?: PlaywrightTestOptions;
}

export class CustomWorld extends World implements ICustomWorld {
	debug = false;
}

setWorldConstructor(CustomWorld);
