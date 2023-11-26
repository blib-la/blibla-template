import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardActions from "@mui/joy/CardActions";
import Grid from "@mui/joy/Grid";
import Typography from "@mui/joy/Typography";
import { useTranslation } from "next-i18next";

import { LinkButton } from "@/atoms/link/button";
import { ScreenReaderOnly } from "@/atoms/screen-reader-only";
import { ClampTypography } from "@/atoms/typography/clamp";
import { getCssVariable } from "@/ions/theme/utils";
import { Box } from "@/molecules/box";
import { SanityNextImage } from "@/molecules/image";
import type { PromotedSlot } from "~/sanity/lib/types";

export function Promoted({ slot }: { slot: PromotedSlot }) {
	const { t } = useTranslation(["button"]);
	return (
		<Box>
			{slot.headline && (
				<Typography
					level="h2"
					component="h2"
					sx={{
						textAlign: "center",
						mb: { xs: 2, md: 4 },
					}}
				>
					{slot.headline}
				</Typography>
			)}
			<Grid container spacing={2} columns={{ xs: 1, md: 3 }}>
				{slot.entries.map(entry => (
					<Grid key={entry.id} xs={1} sx={{ display: "flex" }}>
						<Card sx={{ flex: 1 }}>
							<Typography
								level="title-lg"
								component="h3"
								sx={{
									minHeight: `calc(${getCssVariable(
										"lineHeight-xs"
									)} * 2 *  1em)`,
								}}
							>
								{entry.headline}
							</Typography>
							<AspectRatio ratio={16 / 9}>
								<SanityNextImage image={entry.mainImage} />
							</AspectRatio>
							<Box sx={{ flex: 1 }}>
								<ClampTypography maxLines={4}>{entry.excerpt}</ClampTypography>
							</Box>
							<CardActions>
								<LinkButton href={`/blog/${entry.slug}`}>
									{t("button:readMore")}{" "}
									<ScreenReaderOnly>{`/blog/${entry.slug}`}</ScreenReaderOnly>
								</LinkButton>
							</CardActions>
						</Card>
					</Grid>
				))}
			</Grid>
		</Box>
	);
}
