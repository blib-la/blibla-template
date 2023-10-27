import type { PortableTextBlock } from "@portabletext/types";
import type { ImageAsset, Slug } from "@sanity/types";
import groq from "groq";
import type { SanityClient } from "next-sanity";

export const postsQuery = groq`*[_type == "post" && defined(slug.current)] | order(_createdAt desc)`;

export async function getPosts(client: SanityClient): Promise<Post[]> {
	return client.fetch(postsQuery);
}

export const postBySlugQuery = groq`*[_type == "post" && slug.current == $slug][0]`;

export async function getPost(client: SanityClient, slug: string): Promise<Post> {
	return client.fetch(postBySlugQuery, {
		slug,
	});
}

export const pageByRouteQuery = groq`
*[
	_type == "page" &&
	route.current == $route
][0]{
	headline[_key == $locale]{
		value
	},
	seo[_key == $locale]{
		value
	},
	body[_key == $locale]{
		value
	}
}
`;

export async function getPage(
	client: SanityClient,
	route: string,
	locale: string
): Promise<Page | null> {
	return client.fetch(pageByRouteQuery, {
		route,
		locale,
	});
}

export const postSlugsQuery = groq`
*[_type == "post" && defined(slug.current)][].slug.current
`;

export const pageRouteQuery = groq`
*[_type == "page" &&
	route.current match $route
	&& defined(route.current)
][].route.current
`;

export const navigationQuery = groq`
*[
_type == "navigation" &&
section.current == $section
][0]{
  title,
  "links": links[]{
    "page": *[_type == "page" && _id == ^._ref][0]{
      "route": route.current,
      "label": label[_key == $locale][0].value
    }
  }
}
`;

export async function getNavigation(client: SanityClient, section: string, locale: string) {
	return client
		.fetch<NavigationDocument>(navigationQuery, {
			section,
			locale,
		})
		.then(
			navigation =>
				navigation?.links.map(({ page }) => ({ href: `/${page.route}`, label: page.label }))
		);
}

export const addressQuery = groq`
*[
  _type == "address" &&
  section.current == $section
][0]{
  title,
  section,
  streetName,
  houseNumber,
  addressExtra,
  zip,
  city,
  province,
  country,
  notes,
  email,
  phone
}
`;

export async function getAddress(client: SanityClient, section: string) {
	return client.fetch<AddressDocument>(addressQuery, {
		section,
	});
}

export interface Post {
	_type: "post";
	_id: string;
	_createdAt: string;
	title?: string;
	slug: Slug;
	excerpt?: string;
	mainImage?: ImageAsset;
	body: PortableTextBlock[];
}

export interface NavigationDocument {
	_type: "navigation";
	_id: string;
	_createdAt: string;
	title?: string;
	links: { page: Page }[];
}

export interface AddressDocument {
	_type: "address";
	_id: string;
	_createdAt: string;
	title?: string;
	section: {
		current: string;
	};
	streetName?: string;
	houseNumber?: string;
	addressExtra?: string;
	zip?: string;
	city?: string;
	province?: string;
	country?: string;
	notes?: string;
	email?: string;
	phone?: string;
}

export interface Page {
	_type: "post";
	_id: string;
	_createdAt: string;
	title?: string;
	route: Slug;
	label?: { _key: string; _type: string; value: string }[];
	headline?: { _key: string; _type: string; value: string }[];
	seo?: {
		_key: string;
		_type: string;
		value: { noIndex?: boolean; title?: string; description?: string };
	}[];
	body?: {
		_key: string;
		_type: string;
		value: PortableTextBlock[];
	}[];
}
