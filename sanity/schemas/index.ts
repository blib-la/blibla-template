import type { SchemaTypeDefinition } from "sanity";

import address from "./documents/address";
import link from "./documents/link";
import navigation from "./documents/navigation";
import page from "./documents/page";
import person from "./documents/person";
import post from "./documents/post";
import promoted from "./documents/promoted";
import richText from "./documents/rich-text";
import simpleText from "./documents/simple-text";
import slideshow from "./documents/slideshow";
import spotImage from "./documents/spot-image";
import spotlight from "./documents/spotlight";
import stage from "./documents/stage";
import tiles from "./documents/tiles";
import blockContent from "./fields/block-content";
import seo from "./fields/type-seo";

export const schemaTypes = [
	seo,
	blockContent,
	richText,
	link,
	simpleText,
	person,
	promoted,
	slideshow,
	spotlight,
	spotImage,
	stage,
	tiles,
	navigation,
	address,
	page,
	post,
];
export const schema: { types: SchemaTypeDefinition[] } = {
	types: schemaTypes,
};
