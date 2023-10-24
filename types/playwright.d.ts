import { ChromiumBrowser, FirefoxBrowser, WebKitBrowser } from "@playwright/test";

declare global {
	var browser: ChromiumBrowser | FirefoxBrowser | WebKitBrowser;
}
