import type { SanityClient } from "next-sanity";

import {
	addressQuery,
	navigationQuery,
	pageByRouteQuery,
	postBySlugQuery,
	postsQuery,
} from "./queries";
import type { AddressDocument, NavigationDocument, PageDocument, PostDocument } from "./types";

export async function getPosts(client: SanityClient, locale: string): Promise<PostDocument[]> {
	return client.fetch(postsQuery, { locale });
}

export async function getPost(
	client: SanityClient,
	slug: string,
	locale: string
): Promise<PostDocument> {
	return client.fetch(postBySlugQuery, {
		slug,
		locale,
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
	/* eslint-disable unicorn/no-null */
	return client
		.fetch<NavigationDocument>(navigationQuery, {
			section,
			locale,
		})
		.then(
			navigation =>
				navigation?.links.map(({ page, navigation }) => ({
					href: `/${page?.route ?? navigation?.route}`,
					label: page?.label ?? navigation?.label ?? null,
					children:
						navigation?.links.map(({ page }) => ({
							href: `/${page?.route}`,
							label: page?.label ?? null,
						})) ?? null,
				}))
		);
	/* eslint-enable unicorn/no-null */
}

export async function getAddress(client: SanityClient, section: string) {
	return client.fetch<AddressDocument>(addressQuery, {
		section,
	});
}
