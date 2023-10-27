import type { SchemaTypeDefinition } from "sanity";

import address from "./address";
import blockContent from "./block-content";
import navigation from "./navigation";
import page from "./page";
import post from "./post";
import seo from "./type-seo";

export const schemaTypes = [page, post, navigation, address, blockContent, seo];
export const schema: { types: SchemaTypeDefinition[] } = {
	types: schemaTypes,
};
