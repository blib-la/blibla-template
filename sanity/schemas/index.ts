import type { SchemaTypeDefinition } from "sanity";

import address from "./documents/address";
import navigation from "./documents/navigation";
import page from "./documents/page";
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
	simpleText,
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
