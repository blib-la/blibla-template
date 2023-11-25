import type { SxProps } from "@mui/joy/styles/types";
import type { Image as SanityImage } from "@sanity/types/src";
import type { ImageProps } from "next/image";
import type { Except } from "type-fest";

import { StyledImage } from "@/molecules/image/styled";
import { urlForImage } from "~/sanity/lib/image";

export function SanityNextImage({
	image,
	style,
	alt = "",
	...properties
}: { image: SanityImage; sx?: SxProps; alt?: string } & Except<ImageProps, "src" | "alt">) {
	return (
		<StyledImage
			fill
			src={urlForImage(image)!.url()}
			alt={alt}
			style={{
				objectPosition: `${(image.hotspot?.x ?? 0.5) * 100}% ${
					(image.hotspot?.y ?? 0.5) * 100
				}%`,
				...style,
			}}
			{...properties}
		/>
	);
}
