import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import favicons from "favicons";
import prettier from "prettier";

import pwaConfig from "../pwa.config.mjs";

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

async function generatePWAFile(html) {
	const contents = `
	import Head from "next/head";
	export function PWAConfig() {
		return (
			<Head>
				${html.join("\n\t\t\t")}
			</Head>
		);
	}`;

	const options = await prettier.resolveConfig(__dirname, { editorconfig: true });
	return prettier.format(contents, { ...options, parser: "babel" });
}

// eslint-disable-next-line unused-imports/no-unused-vars
const { key, ...config } = pwaConfig;

const source = path.resolve(__dirname, "../resources/", `logo.png`);
console.log("Generating Icons and screens...");
try {
	const response = await favicons(source, config);
	const html = response.html.map(tag => tag.replace(">", " />"));
	const pwaFileContents = await generatePWAFile(html);
	const pwaDirectory = path.join(__dirname, "../src/molecules/pwa-config/");
	const directory = path.join(__dirname, "../public", config.path);
	await mkdir(pwaDirectory, { recursive: true });
	await mkdir(directory, { recursive: true });
	await writeFile(path.join(pwaDirectory, `index.tsx`), pwaFileContents);
	await Promise.all(
		response.images.map(async file => {
			await writeFile(path.join(directory, file.name), file.contents);
		})
	);
	await Promise.all(
		response.files.map(async file => {
			await writeFile(path.join(directory, file.name), file.contents);
			await writeFile(path.join(directory, file.name), file.contents);
		})
	);
	console.log("Icons and screens generated!");
} catch (error) {
	console.log(error.message);
}
