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
import { Layout } from "@/organisms/layout";
import { Stage } from "@/organisms/stage";
import type { ParentPage } from "~/sanity/lib/types";

export function ParentPageTemplate({ page }: { page: ParentPage }) {
	const { t } = useTranslation(["button"]);

	return (
		<Layout
			seo={page.seo}
			sx={{ py: { xs: 4, md: 12, lg: 20 } }}
			stage={page.stage && <Stage stage={page.stage} />}
		>
			<Typography level="h1" mb={3}>
				{page.headline}
			</Typography>
			<Grid container spacing={2} columns={{ xs: 1, md: 3 }}>
				{page.items
					.map(({ slug, ...items }) => ({
						...items,
						href: `/${page.route.current}/${slug}`,
					}))
					.map(item => (
						<Grid key={item.id} xs={1} sx={{ display: "flex" }}>
							<Card sx={{ flex: 1 }}>
								<Typography
									level="title-lg"
									component="h2"
									sx={{
										minHeight: `calc(${getCssVariable(
											"lineHeight-xs"
										)} * 2 *  1em)`,
									}}
								>
									{item.headline}
								</Typography>
								<AspectRatio ratio={16 / 9}>
									<SanityNextImage image={item.mainImage} />
								</AspectRatio>
								<Box sx={{ flex: 1 }}>
									<ClampTypography maxLines={4}>{item.excerpt}</ClampTypography>
								</Box>
								<CardActions>
									<LinkButton href={item.href}>
										{t("button:readMore")}{" "}
										<ScreenReaderOnly>{item.href}</ScreenReaderOnly>
									</LinkButton>
								</CardActions>
							</Card>
						</Grid>
					))}
			</Grid>
		</Layout>
	);
}
