import Grid from "@mui/joy/Grid";
import Typography from "@mui/joy/Typography";
import { useTranslation } from "next-i18next";

import { LinkButton } from "@/atoms/link/button";
import { ScreenReaderOnly } from "@/atoms/screen-reader-only";
import { Box } from "@/molecules/box";
import { SanityNextImage } from "@/molecules/image";
import { StyledImageMask } from "@/molecules/image/styled";
import { RichTextBlock } from "@/organisms/rich-text";
import type { SpotlightSlot } from "~/sanity/lib/types";

export function Spotlight({ slot, even }: { slot: SpotlightSlot; even?: boolean }) {
	const { t } = useTranslation(["button"]);
	return (
		<Grid container columnSpacing={2} columns={{ xs: 1, md: 2 }}>
			<Grid xs={1} sx={{ display: "flex", alignItems: { md: "center" } }}>
				<Box sx={{ px: 2 }}>
					<Typography level="h2" mt={2} mb={3}>
						{slot.headline}
					</Typography>
					<RichTextBlock value={slot.body} />
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
				<StyledImageMask
					sx={{
						height: { xs: 320, md: "auto" },
						maskImage: { md: "url(/images/mask.svg)" },
					}}
				>
					<SanityNextImage image={slot.mainImage} alt="" />
				</StyledImageMask>
			</Grid>
		</Grid>
	);
}
