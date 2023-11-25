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

export function getImageSize(id: string) {
	const dimensions = /^image-([\da-f]+)-(\d+x\d+)-(\w+)$/.exec(id)![2];
	const [width, height] = dimensions.split("x").map(parts => Number.parseInt(parts, 10));

	return { width, height };
}
