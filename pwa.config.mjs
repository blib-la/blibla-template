import { readFile } from "node:fs/promises";

const { version } = JSON.parse(await readFile("./package.json", "utf8"));

/* eslint-disable camelcase */
const config = {
	key: "blibla",
	version,
	path: "/pwa/",
	appName: "Blibla",
	appShortName: "Blibla",
	appTitle: "Blibla",
	appDescription: "Blibla template with Next.js",
	developerName: "Gregor Adams",
	developerURL: "https://github.com/pixelass",
	dir: "auto",
	lang: "en",
	background: "#000000",
	theme_color: "#20827c",
	appleStatusBarStyle: "black",
	display: "standalone",
	orientation: "portrait",
	scope: "/",
	start_url: "/?homescreen=1",
	pixel_art: false,
	loadManifestWithCredentials: false,
	manifestMaskable: true,
	preferRelatedApplications: true,
	relatedApplications: undefined,
	icons: {
		// Platform Options:
		// - offset - offset in percentage
		// - background:
		//   * false - use default
		//   * true - force use default, e.g. set background for Android icons
		//   * color - set background for the specified icons
		//
		android: true,
		appleIcon: true,
		appleStartup: true,
		favicons: true,
		windows: true,
		yandex: false,
	},
	shortcuts: [],
};
/* eslint-enable camelcase */

export default config;
