import createImageUrlBuilder from "@sanity/image-url";
import type { Image } from "sanity";

import { dataset, projectId } from "./api";

const imageBuilder = createImageUrlBuilder({
	projectId: projectId || "",
	dataset: dataset || "",
});

export function urlForImage(source: Image) {
	// Ensure that source image contains a valid reference
	if (!source?.asset?._ref) {
		return;
	}

	return imageBuilder.image(source).auto("format");
}
