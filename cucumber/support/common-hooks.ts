import { Before, After, BeforeAll, AfterAll, Status, setDefaultTimeout } from "@cucumber/cucumber";
import type { ITestCaseHookParameter } from "@cucumber/cucumber";
import type {
	ChromiumBrowser,
	FirefoxBrowser,
	WebKitBrowser,
	ConsoleMessage,
} from "@playwright/test";
import { chromium, firefox, webkit, request } from "@playwright/test";
import { ensureDir } from "fs-extra";

import { config } from "./config";
import type { ICustomWorld } from "./custom-world";

let browser: ChromiumBrowser | FirefoxBrowser | WebKitBrowser;
const tracesDirectory = "traces";

setDefaultTimeout(process.env.PWDEBUG ? -1 : 60 * 1000);

BeforeAll(async () => {
	switch (config.browser) {
		case "firefox": {
			browser = await firefox.launch(config.browserOptions);
			break;
		}

		case "webkit": {
			browser = await webkit.launch(config.browserOptions);
			break;
		}

		default: {
			browser = await chromium.launch(config.browserOptions);
		}
	}

	await ensureDir(tracesDirectory);
});

Before(
	{ tags: "@ignore" },
	async () =>
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		"skipped" as any
);

Before({ tags: "@debug" }, async function (this: ICustomWorld) {
	this.debug = true;
});

Before(async function (this: ICustomWorld, { pickle }: ITestCaseHookParameter) {
	this.startTime = new Date();
	this.testName = pickle.name.replaceAll(/\W/g, "-");
	// Customize the [browser context](https://playwright.dev/docs/next/api/class-browser#browsernewcontextoptions)
	this.context = await browser.newContext({
		acceptDownloads: true,
		recordVideo: process.env.PWVIDEO ? { dir: "screenshots" } : undefined,
		viewport: { width: 1200, height: 800 },
	});
	this.server = await request.newContext({
		// All requests we send go to this API endpoint.
		baseURL: config.BASE_API_URL,
	});

	await this.context.tracing.start({ screenshots: true, snapshots: true });
	this.page = await this.context.newPage();
	this.page.on("console", async (message: ConsoleMessage) => {
		if (message.type() === "log") {
			this.attach(message.text());
		}
	});
	this.feature = pickle;
});

After(async function (this: ICustomWorld, { result }: ITestCaseHookParameter) {
	if (result) {
		this.attach(`Status: ${result?.status}. Duration:${result.duration?.seconds}s`);

		if (result.status !== Status.PASSED) {
			const image = await this.page?.screenshot();

			// Replace : with _ because colons aren't allowed in Windows paths
			const timePart = this.startTime?.toISOString().split(".")[0].replaceAll(":", "_");
			if (image) {
				this.attach(image, "image/png");
			}

			await this.context?.tracing.stop({
				path: `${tracesDirectory}/${this.testName}-${timePart}trace.zip`,
			});
		}
	}

	await this.page?.close();
	await this.context?.close();
});

AfterAll(async () => {
	await browser.close();
});
