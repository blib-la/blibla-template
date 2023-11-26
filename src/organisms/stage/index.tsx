import { css, Global } from "@emotion/react";
import Container from "@mui/joy/Container";
import Sheet from "@mui/joy/Sheet";
import { useTheme } from "@mui/joy/styles";
import Typography from "@mui/joy/Typography";

import { LinkButton } from "@/atoms/link/button";
import { Box } from "@/molecules/box";
import { StyledImage } from "@/molecules/image/styled";
import { HEADER_HEIGHT } from "@/organisms/header/constants";
import { urlForImage } from "~/sanity/lib/image";
import type { StageModel } from "~/sanity/lib/types";

export function StageBox({
	headline,
	subtitle,
	cta,
}: Pick<StageModel, "headline" | "subtitle" | "cta">) {
	return (
		<Container sx={{ position: "relative" }}>
			<Sheet
				invertedColors
				sx={{
					position: "absolute",
					left: 0,
					bottom: 0,
					m: 2,
					px: 4,
					py: 2,
					bgcolor: "primary.500",
					color: "common.white",
				}}
			>
				{headline && (
					<Typography
						level="h1"
						sx={{ my: 1, fontSize: { xs: "xl", sm: "xl4" }, color: "inherit" }}
					>
						{headline}
					</Typography>
				)}
				{subtitle && (
					<Typography
						level="h2"
						sx={{ my: 1, fontSize: { xs: "lg", sm: "xl2" }, color: "inherit" }}
					>
						{subtitle}
					</Typography>
				)}
				{cta && (
					<LinkButton
						href={cta.href}
						variant="solid"
						target={cta.href.startsWith("http") ? "_blank" : undefined}
						sx={{ color: "white" }}
						rel={cta.href.startsWith("http") ? "noindex nofollow" : undefined}
					>
						{cta.label}
					</LinkButton>
				)}
			</Sheet>
		</Container>
	);
}

export function Stage({ stage }: { stage: StageModel }) {
	const theme = useTheme();
	return (
		<div>
			<Global
				styles={css({
					":root": {
						"--stageHeight": "300px",
						[theme.breakpoints.up("md")]: {
							"--stageHeight": "400px",
						},
						[theme.breakpoints.up("lg")]: {
							"--stageHeight": stage.aboveTheFold
								? `calc( 100dvh - ${HEADER_HEIGHT}px)`
								: undefined,
						},
					},
				})}
			/>
			<Box
				sx={{
					position: "relative",
					minHeight: {
						xs: 300,
						md: 400,
						lg: stage.aboveTheFold ? `calc( 100dvh - ${HEADER_HEIGHT}px)` : undefined,
					},
					maxHeight: `calc( 100dvh - ${HEADER_HEIGHT}px)`,
					bgcolor: stage.bgcolor,
				}}
			>
				<StyledImage
					fill
					priority
					quality={100}
					sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
					src={urlForImage(stage.darkImage)!.url()}
					alt=""
					sx={{
						objectFit: stage.fit ?? "cover",
						p: stage.fit === "contain" ? 4 : 0,
						"[data-joy-color-scheme=light] &": {
							display: stage.lightImage && "none",
						},
					}}
					style={{
						objectPosition: `${(stage.darkImage.hotspot?.x ?? 0.5) * 100}% ${
							(stage.darkImage.hotspot?.y ?? 0.5) * 100
						}%`,
					}}
				/>
				{stage.lightImage && (
					<StyledImage
						fill
						priority
						quality={100}
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
						src={urlForImage(stage.lightImage)!.url()}
						alt=""
						sx={{
							objectFit: stage.fit ?? "cover",
							p: stage.fit === "contain" ? 4 : 0,
							"[data-joy-color-scheme=dark] &": {
								display: "none",
							},
						}}
						style={{
							objectPosition: `${(stage.lightImage.hotspot?.x ?? 0.5) * 100}% ${
								(stage.lightImage.hotspot?.y ?? 0.5) * 100
							}%`,
						}}
					/>
				)}
			</Box>
			{(stage.headline || stage.subtitle || stage.cta) && (
				<StageBox headline={stage.headline} subtitle={stage.subtitle} cta={stage.cta} />
			)}
		</div>
	);
}
