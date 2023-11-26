import Grid from "@mui/joy/Grid";

import { StyledImage } from "@/molecules/image/styled";
import { getImageSize, urlForImage } from "~/sanity/lib/image";
import type { SpotImageSlot } from "~/sanity/lib/types";

export function SpotImage({ slot }: { slot: SpotImageSlot }) {
	const { width, height } = getImageSize(slot.mainImage!.asset!._ref);
	return (
		<Grid container columnSpacing={2} columns={{ xs: 1 }}>
			<Grid xs={1} order={{ xs: -1 }} sx={{ display: "flex", alignItems: { md: "center" } }}>
				<StyledImage
					src={urlForImage(slot.mainImage)!.url()}
					alt=""
					width={width}
					height={height}
				/>
			</Grid>
		</Grid>
	);
}
