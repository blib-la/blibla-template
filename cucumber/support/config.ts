import path from "node:path";
import process from "node:process";

import type { LaunchOptions } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config({ path: path.join(process.cwd(), ".env.local") });

const browserOptions: LaunchOptions = {
	slowMo: Number.parseInt(process.env.PLAYWRIGHT_SLOMO || "0", 10),
	headless: process.env.PLAYWRIGHT_HEADLESS !== "false",
	args: ["--use-fake-ui-for-media-stream", "--use-fake-device-for-media-stream"],
	firefoxUserPrefs: {
		"media.navigator.streams.fake": true,
		"media.navigator.permission.disabled": true,
	},
};

export const config = {
	browser: process.env.PLAYWRIGHT_BROWSER || "chromium",
	browserOptions,
	BASE_URL: "http://localhost:3000",
	BASE_API_URL: "http://localhost:3000/api",
};
