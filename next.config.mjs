import path from "node:path";

import mdx from "@next/mdx";
import { globby } from "globby";
import remarkGfm from "remark-gfm";

import index18Next from "./next-i18next.config.js";

const withMDX = mdx({
	extension: /\.mdx?$/,
	options: {
		// If you use remark-gfm, you'll need to use next.config.mjs
		// as the package is ESM only
		// https://github.com/remarkjs/remark-gfm#install
		remarkPlugins: [remarkGfm],
		rehypePlugins: [],
		// If you use `MDXProvider`, uncomment the following line.
		providerImportSource: "@mdx-js/react",
	},
});

const { i18n } = index18Next;

const { defaultLocale, locales } = i18n;
const extraLocales = locales.filter(locale => locale !== defaultLocale);

// Define an array of routes that need rewrites and redirects
const mdxFiles = await globby(`src/pages/**/index.mdx`);
const routes = mdxFiles.map(filePath => {
	const relativePath = path.relative("src/pages", filePath).replaceAll("\\", "/");
	return path.dirname(relativePath);
});

const nextConfig = {
	i18n,
	reactStrictMode: true,
	pageExtensions: ["ts", "tsx", "mdx"],
	swcMinify: true,
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "images.unsplash.com",
			},
		],
		formats: ["image/webp"],
	},
	async rewrites() {
		const rewrites = [];

		// Generate rewrites for all extraLocales
		for (const route of routes) {
			for (const locale of extraLocales) {
				rewrites.push({
					source: `/${locale}/${route}`,
					destination: `/${route}/${locale}`,
					locale: false,
				});
			}
		}

		return {
			beforeFiles: rewrites,
		};
	},
	async redirects() {
		const redirects = [];

		// Generate redirects for all extraLocales
		for (const route of routes) {
			for (const locale of extraLocales) {
				redirects.push({
					source: `/${route}/${locale}`,
					destination: `/${locale}/${route}`,
					permanent: true,
				});
			}
		}

		return redirects;
	},
};
export default withMDX(nextConfig);
