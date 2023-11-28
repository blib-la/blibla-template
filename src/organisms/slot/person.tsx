import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Grid from "@mui/joy/Grid";
import JoyLink from "@mui/joy/Link";
import Typography from "@mui/joy/Typography";

import { Box } from "@/molecules/box";
import { SanityNextImage } from "@/molecules/image";
import { StyledImageMask } from "@/molecules/image/styled";
import { RichTextBlock } from "@/organisms/rich-text";
import type { PersonSlot } from "~/sanity/lib/types";

export function Person({ slot, even }: { slot: PersonSlot; even?: boolean }) {
	return (
		<Grid container columnSpacing={2} columns={{ xs: 1, md: 2 }}>
			<Grid xs={1} sx={{ display: "flex", alignItems: { md: "center" } }}>
				<Box sx={{ px: 2 }}>
					<Typography level="h3" mt={2} mb={1}>
						{slot.firstName} {slot.lastName}
					</Typography>
					<Typography level="title-md" mt={1} mb={1}>
						{slot.pronouns}
					</Typography>
					<Typography level="title-lg" component="h4" mt={1} mb={3}>
						{slot.position}
					</Typography>
					<RichTextBlock value={slot.bio} />
					<Box sx={{ display: "flex", flexDirection: "column" }}>
						{slot.linkedin && (
							<JoyLink
								href={slot.linkedin}
								target="_blank"
								rel="noindex nofollow"
								startDecorator={<LinkedInIcon />}
							>
								LinkedIn
							</JoyLink>
						)}
						{slot.github && (
							<JoyLink
								href={`https://github.com/${slot.github}`}
								target="_blank"
								rel="noindex nofollow"
								startDecorator={<GitHubIcon />}
							>
								@{slot.github}
							</JoyLink>
						)}
					</Box>
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
