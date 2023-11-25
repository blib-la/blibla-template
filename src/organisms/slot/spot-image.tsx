import Grid from "@mui/joy/Grid";
import { styled } from "@mui/joy/styles";
import Image from "next/image";

import { getImageSize, urlForImage } from "~/sanity/lib/image";
import type { SpotimageSlot } from "~/sanity/lib/types";

const StyledImage = styled(Image)({
	width: "100%",
	height: "auto",
});

export function SpotImage({ slot }: { slot: SpotimageSlot }) {
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