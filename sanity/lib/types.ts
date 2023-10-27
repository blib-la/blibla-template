import type { PortableTextBlock } from "@portabletext/types/src";
import type { ImageAsset, Slug } from "@sanity/types";

export interface PostDocument {
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
	links: { page: PageDocument }[];
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

export interface PageDocument {
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
