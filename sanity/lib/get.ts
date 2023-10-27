import type { SanityClient } from "next-sanity";

import {
	addressQuery,
	navigationQuery,
	pageByRouteQuery,
	postBySlugQuery,
	postsQuery,
} from "./queries";
import type { AddressDocument, NavigationDocument, PageDocument, PostDocument } from "./types";

export async function getPosts(client: SanityClient): Promise<PostDocument[]> {
	return client.fetch(postsQuery);
}

export async function getPost(client: SanityClient, slug: string): Promise<PostDocument> {
	return client.fetch(postBySlugQuery, {
		slug,
	});
}

export async function getPage(
	client: SanityClient,
	route: string,
	locale: string
): Promise<PageDocument | null> {
	return client.fetch(pageByRouteQuery, {
		route,
		locale,
	});
}

export async function getNavigation(client: SanityClient, section: string, locale: string) {
	return client
		.fetch<NavigationDocument>(navigationQuery, {
			section,
			locale,
		})
		.then(
			navigation =>
				navigation?.links.map(({ page }) => ({
					href: `/${page.route}`,
					label: page.label,
				}))
		);
}

export async function getAddress(client: SanityClient, section: string) {
	return client.fetch<AddressDocument>(addressQuery, {
		section,
	});
}
