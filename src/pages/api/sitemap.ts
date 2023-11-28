import process from "node:process";

import { LRUCache } from "lru-cache";
import type { NextApiRequest, NextApiResponse } from "next";
import { SitemapStream, streamToPromise } from "sitemap";

import i18next from "~/next-i18next.config";
import { getClient } from "~/sanity/lib/client";
import { pageRoutesSeoQuery, postRoutesSeoQuery } from "~/sanity/lib/queries";

const { locales, defaultLocale } = i18next.i18n;

const cache = new LRUCache<string, any>({ max: 1000 });

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
	try {
		const smStream = new SitemapStream({
			hostname: `https://${process.env.NEXT_PUBLIC_DOMAIN}`,
		});
		const cacheKey = "sitemap-data";
		let entries = cache.get(cacheKey);
		if (!entries) {
			const client = getClient();
			const posts =
				await client.fetch<
					{ seo: { noIndex?: boolean }[]; slug: string; _updatedAt: string }[]
				>(postRoutesSeoQuery);
			const pages =
				await client.fetch<
					{ seo: { noIndex?: boolean }[]; route: string; _updatedAt: string }[]
				>(pageRoutesSeoQuery);

			const blogPosts = posts.map(post => ({ ...post, route: `blog/${post.slug}` }));
			entries = [...pages, ...blogPosts].filter(entry =>
				entry.seo.every(seo => !seo.noIndex)
			);
			cache.set(cacheKey, entries);
		}

		for (const entry of entries) {
			const route = entry.route === "home" ? "/" : `/${entry.route}`;
			smStream.write({
				url: route.replace(/\/$/, ""),
				changefreq: "daily",
				lastmod: entry._updatedAt,
				links: locales.map(locale => ({
					url: (locale === defaultLocale ? route : `/${locale}${route}`).replace(
						/\/$/,
						""
					),
					lang: locale,
				})),
				priority: 0.9,
			});
		}

		// End sitemap stream
		smStream.end();

		// XML sitemap string
		const sitemapOutput = await streamToPromise(smStream);

		// Change headers
		response.writeHead(200, {
			"Content-Type": "application/xml",
		});

		// Display output to user
		response.end(sitemapOutput.toString());
	} catch (error_: unknown) {
		console.log(error_);
		response.send((error_ as Error).message);
	}
}
