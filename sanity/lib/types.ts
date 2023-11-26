import type { DefaultColorPalette } from "@mui/joy/styles/types/colorSystem";
import type { DefaultVariantProp } from "@mui/joy/styles/types/variants";
import type { TypographyProps } from "@mui/joy/Typography";
import type { PortableTextBlock } from "@portabletext/types";
import type { Image as SanityImage, ImageAsset, Slug } from "@sanity/types";

export interface PostDocument {
	_type: "post";
	_id: string;
	_createdAt: string;
	title: string;
	id: string;
	seo: Seo;
	headline: string;
	slug: Slug;
	excerpt: string;
	mainImage: ImageAsset;
	body: PortableTextBlock[];
}

export interface NavigationDocument {
	_type: "navigation";
	_id: string;
	_createdAt: string;
	title?: string;
	parent?: PageDocument;
	route?: Slug;
	label?: string;
	links: { page?: PageDocument; navigation?: NavigationDocument }[];
	children: { page?: PageDocument };
}

export interface AddressDocument {
	_type: "address";
	_id: string;
	_createdAt: string;
	name: string;
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

// Common fields across all page types
export interface BasePage {
	route: Slug;
	label: string;
	seo: Seo;
	template: string;
}

// SEO object structure
export interface Seo {
	title: string;
	description?: string;
	noIndex?: boolean;
	ogTitle?: string;
	ogDescription?: string;
	ogImage?: SanityImage;
}

export interface StageModel {
	_type: "stage";
	darkImage: SanityImage;
	lightImage?: SanityImage;
	headline?: string;
	subtitle?: string;
	fit: string;
	bgcolor?: string;
	aboveTheFold?: boolean;
	cta?: {
		href: string;
		label: string;
		noFollow?: boolean;
	};
}

export interface PostModel {
	_type: "post";
	id: string;
	headline: string;
	mainImage: SanityImage;
	slug: string;
	excerpt: string;
}

export type SlideEntry = StageModel | PostModel;

export function isStage(model: SlideEntry): model is StageModel {
	return model._type === "stage";
}

export function isPost(model: SlideEntry): model is PostModel {
	return model._type === "post";
}

export interface SlideshowSlot {
	_type: "slideshow";
	id: string;
	title: string;
	controls: "none" | "dots" | "arrows" | "full";
	visibleItems: number;
	transitionEffect: "fade" | "slide";
	autoplay: boolean;
	loop: boolean;
	slides: SlideEntry[];
}

export interface TilesSlot {
	_type: "tiles";
	id: string;
	columns: number;
	color?: DefaultColorPalette;
	variant?: DefaultVariantProp;
	items: RichTextSlot[];
}

// Slots definition
export type Slot =
	| RichTextSlot
	| SimpleTextSlot
	| SpotImageSlot
	| LinkSlot
	| TilesSlot
	| PromotedSlot
	| SpotlightSlot
	| SlideshowSlot
	| PersonSlot;

export interface SimpleTextSlot {
	_type: "simpleText";
	id: string;
	text: string;
	level: TypographyProps["level"];
	component: "h2" | "h3" | "p";
	alignment: "left" | "right" | "center";
}

export interface RichTextSlot {
	_type: "richText";
	id: string;
	body: PortableTextBlock;
}

export interface LinkSlot {
	_type: "link";
	id: string;
	route: Slug;
	label: string;
}

export interface PromotedSlot {
	_type: "promoted";
	id: string;
	type: string;
	headline?: string;
	entries: Entry[];
}

export interface Entry {
	id: string;
	headline: string;
	mainImage: SanityImage;
	excerpt: string;
	slug: Slug;
}

export interface SpotlightSlot {
	_type: "spotlight";
	id: string;
	entryType: string;
	headline: string;
	mainImage: SanityImage;
	excerpt: string;
	slug?: string;
	cta?: string;
}

export interface PersonSlot {
	_type: "person";
	id: string;
	firstName: string;
	lastName: string;
	pronouns: string;
	position: string;
	linkedin: string;
	github: string;
	mainImage: SanityImage;
	biography: string;
}

export interface SpotImageSlot {
	_type: "spotImage";
	id: string;
	mainImage: SanityImage;
	excerpt?: string;
}

export interface TextPage extends BasePage {
	template: "0";
	headline: string;
	body: PortableTextBlock;
}

export interface LandingPage extends BasePage {
	template: "1";
	stage?: StageModel;
	slots: Slot[];
}
export interface ParentPage extends BasePage {
	template: "2";
	stage?: StageModel;
	headline: string;
	items: PostModel[];
}

export type PageDocument = TextPage | LandingPage | ParentPage;
