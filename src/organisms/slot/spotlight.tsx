import Grid from "@mui/joy/Grid";
import { styled } from "@mui/joy/styles";
import Typography from "@mui/joy/Typography";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import type { ReactNode } from "react";

import { LinkButton } from "@/atoms/link/button";
import { ScreenReaderOnly } from "@/atoms/screen-reader-only";
import { Box } from "@/molecules/box";
import type { ImageInfo, LinkData } from "@/types/common";
import { urlForImage } from "~/sanity/lib/image";
import type { SpotlightSlot } from "~/sanity/lib/types";

export interface SpotlightProperties {
	children?: ReactNode;
	reversed?: boolean;
	image: ImageInfo;
	cta?: LinkData;
}

const StyledBox = styled("div")({
	width: "100%",
	aspectRatio: 1,
	maskRepeat: "no-repeat",
	maskSize: "contain",
	userSelect: "none",
	pointerEvents: "none",
});

const StyledImage = styled(Image)({
	width: "100%",
	height: "100%",
	objectFit: "cover",
	objectPosition: "center",
});

export function Spotlight({ slot, even }: { slot: SpotlightSlot; even?: boolean }) {
	const { t } = useTranslation(["button"]);
	return (
		<Grid container columnSpacing={2} columns={{ xs: 1, md: 2 }}>
			<Grid xs={1} sx={{ display: "flex", alignItems: { md: "center" } }}>
				<Box sx={{ px: 2 }}>
					<Typography level="h2" mt={2} mb={3}>
						{slot.headline}
					</Typography>
					{slot.excerpt
						.split("\n")
						.filter(Boolean)
						.map((paragraph, index) => (
							<Typography key={index} my={2}>
								{paragraph}
							</Typography>
						))}
					{slot.slug && (
						<LinkButton href={`/blog/${slot.slug}`}>
							{t("button:readMore")}{" "}
							<ScreenReaderOnly>{`/blog/${slot.slug}`}</ScreenReaderOnly>
						</LinkButton>
					)}
					{slot.cta && (
						<LinkButton href={`/${slot.cta}`}>
							{t("button:readMore")} <ScreenReaderOnly>{slot.cta}</ScreenReaderOnly>
						</LinkButton>
					)}
				</Box>
			</Grid>
			<Grid
				xs={1}
				order={{ xs: -1, md: even ? -1 : "unset" }}
				sx={{ display: "flex", alignItems: { md: "center" } }}
			>
				<StyledBox
					sx={{
						height: { xs: 320, md: "auto" },
						maskImage: { md: "url(/images/mask.svg)" },
					}}
				>
					<StyledImage
						src={urlForImage(slot.mainImage)!.url()}
						alt=""
						width={1024}
						height={1024}
					/>
				</StyledBox>
			</Grid>
		</Grid>
	);
}
