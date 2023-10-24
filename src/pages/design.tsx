import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Checkbox from "@mui/joy/Checkbox";
import Chip from "@mui/joy/Chip";
import Grid from "@mui/joy/Grid";
import Input from "@mui/joy/Input";
import Radio from "@mui/joy/Radio";
import Sheet from "@mui/joy/Sheet";
import Slider from "@mui/joy/Slider";
import type { ColorPaletteProp, VariantProp } from "@mui/joy/styles";
import type { TypographySystem } from "@mui/joy/styles/types";
import Switch from "@mui/joy/Switch";
import Typography from "@mui/joy/Typography";
import type { GetStaticPropsContext } from "next";
import { upperCaseFirst } from "upper-case-first";

import { getStaticProperties } from "@/ions/ssr/get-properties";
import type { ColorShades, Palette } from "@/ions/theme/palette";
import { palette } from "@/ions/theme/palette";
import { getContrastColor } from "@/ions/utils/color";
import { capitalizeFirstLetter } from "@/ions/utils/string";
import { Layout } from "@/templates/layout";

/**
 * This file encompasses various local functions and other declarations, primarily serving demonstrative purposes.
 * The organization of content within facilitates easy removal of the entire page, should that be necessary.
 * Essentially, the contained elements reflect the design system, acting as a valuable aid while setting up or exploring
 * our template. This structured approach ensures a hassle-free experience whether you're acquainting with the template
 * or intending to customize it further.
 */

export const variants: VariantProp[] = ["solid", "soft", "outlined", "plain"];
export const colors: ColorPaletteProp[] = [
	"primary",
	"secondary",
	"neutral",
	"success",
	"warning",
	"danger",
];

export type PaletteProperties = {
	palette: Palette;
};

export const typeLevels: (keyof TypographySystem)[] = [
	"h1",
	"h2",
	"h3",
	"h4",
	"title-lg",
	"title-md",
	"title-sm",
	"body-lg",
	"body-md",
	"body-sm",
	"body-xs",
];

export function PaletteDisplay({ palette }: PaletteProperties) {
	return (
		<Grid container spacing={2} columns={{ xs: 1, sm: 2, md: 4, lg: 5 }} sx={{ my: 4 }}>
			{Object.keys(palette).map(colorName => (
				<Grid key={colorName} xs={1}>
					<Card
						variant="solid"
						sx={{ bgcolor: palette[colorName as keyof Palette]["500"] }}
					>
						<Typography
							level="title-lg"
							sx={{ py: 4, color: "#ffffff", textAlign: "center" }}
						>
							{upperCaseFirst(colorName)}
						</Typography>
						<CardContent sx={{ gap: 0 }}>
							{Object.keys(palette[colorName as keyof Palette]).map(shade => {
								const color =
									palette[colorName as keyof Palette][shade as keyof ColorShades];
								const textColor = getContrastColor(color);

								return (
									<Sheet
										key={`${colorName}-${shade}`}
										sx={{ p: 1, bgcolor: color }}
									>
										<Typography
											level="body-xs"
											sx={{
												color: textColor,
												display: "flex",
												justifyContent: "space-between",
											}}
										>
											<span>{shade}</span> <span>{color}</span>
										</Typography>
									</Sheet>
								);
							})}
						</CardContent>
					</Card>
				</Grid>
			))}
		</Grid>
	);
}

export default function Page() {
	return (
		<Layout
			title="Next.js PWA Template - Design System and Coperate Identity"
			description="Our design system embodies your Corporate Identity (CI), ensuring a coherent brand presentation while optimizing performance for an enhanced user experience."
		>
			{typeLevels.map(typeLevel => (
				<Typography key={typeLevel} level={typeLevel} component="div">
					Typography Level: {typeLevel}
				</Typography>
			))}
			<Grid container spacing={1} columns={{ xs: 1, md: 2 }} sx={{ my: 4 }}>
				<Grid xs={1}>
					<Typography level="h2" mb={2}>
						AI Revolutionizes Traditional Design Landscape
					</Typography>
					<Typography>
						Artificial intelligence is significantly impacting design, introducing
						automated tools that enhance creativity. AI’s data analysis capabilities
						inform better design decisions, making insights from user interactions
						easily accessible. Furthermore, AI expedites iterative processes, allowing
						designers more time for innovative thinking. This synergy of AI and design
						is forging a trail towards more intuitive, user-centered design solutions.
					</Typography>
				</Grid>
				<Grid xs={1}>
					<Typography level="h2" mb={2}>
						AI Drives Innovation in Web Development
					</Typography>
					<Typography>
						Artificial Intelligence is transforming web development by automating
						routine tasks, thus allowing developers to focus on more complex issues.
						AI-powered tools offer personalized web experiences, enhancing user
						engagement. Moreover, AI&apos;s predictive analysis helps in anticipating
						user behavior, ensuring a more intuitive user interface. The infusion of AI
						in web development is fostering a new era of smart, user-centric, and
						dynamic web solutions.
					</Typography>
				</Grid>
			</Grid>

			<PaletteDisplay palette={palette} />
			<Typography level="h2">Button</Typography>
			{variants.map(variant => (
				<Box
					key={variant}
					sx={{
						display: "flex",
						alignItems: "center",
						gap: 2,
						p: 1,
						my: 4,
						flexWrap: "wrap",
					}}
				>
					{colors.map(color => (
						<Button key={color} variant={variant} color={color}>
							{capitalizeFirstLetter(color)}
						</Button>
					))}
				</Box>
			))}
			<Typography level="h2">Chip</Typography>
			{variants.map(variant => (
				<Box
					key={variant}
					sx={{
						display: "flex",
						alignItems: "center",
						gap: 2,
						p: 1,
						my: 4,
						flexWrap: "wrap",
					}}
				>
					{colors.map(color => (
						<Chip key={color} variant={variant} color={color}>
							{capitalizeFirstLetter(color)}
						</Chip>
					))}
				</Box>
			))}
			<Typography level="h2">Checkbox</Typography>
			{variants.map(variant => (
				<Box
					key={variant}
					sx={{
						display: "flex",
						alignItems: "center",
						gap: 2,
						p: 1,
						my: 4,
						flexWrap: "wrap",
					}}
				>
					{colors.map(color => (
						<Checkbox
							key={color}
							label={capitalizeFirstLetter(color)}
							variant={variant}
							color={color}
						/>
					))}
				</Box>
			))}
			<Typography level="h2">Radio</Typography>
			{variants.map(variant => (
				<Box
					key={variant}
					sx={{
						display: "flex",
						alignItems: "center",
						gap: 2,
						p: 1,
						my: 4,
						flexWrap: "wrap",
					}}
				>
					{colors.map(color => (
						<Radio
							key={color}
							name={variant}
							label={capitalizeFirstLetter(color)}
							variant={variant}
							color={color}
						/>
					))}
				</Box>
			))}
			<Typography level="h2">Switch</Typography>
			{variants.map(variant => (
				<Box
					key={variant}
					sx={{
						display: "flex",
						alignItems: "center",
						gap: 2,
						p: 1,
						my: 4,
						flexWrap: "wrap",
					}}
				>
					{colors.map(color => (
						<Switch
							key={color}
							component="label"
							aria-label={capitalizeFirstLetter(color)}
							endDecorator={capitalizeFirstLetter(color)}
							variant={variant}
							color={color}
						/>
					))}
				</Box>
			))}
			<Typography level="h2">Slider</Typography>
			{variants.map(variant => (
				<Box
					key={variant}
					sx={{
						display: "flex",
						alignItems: "center",
						gap: 2,
						p: 1,
						my: 4,
						flexWrap: "wrap",
					}}
				>
					{colors.map(color => (
						<Slider
							key={color}
							aria-label={capitalizeFirstLetter(color)}
							variant={variant}
							color={color}
							sx={{ flex: 1 }}
						/>
					))}
				</Box>
			))}
			<Typography level="h2">Input</Typography>
			{variants.map(variant => (
				<Box
					key={variant}
					sx={{
						display: "flex",
						alignItems: "center",
						gap: 2,
						p: 1,
						my: 4,
						flexWrap: "wrap",
					}}
				>
					{colors.map(color => (
						<Input
							key={color}
							defaultValue={color}
							aria-label={capitalizeFirstLetter(color)}
							variant={variant}
							color={color}
							sx={{ flex: 1 }}
						/>
					))}
				</Box>
			))}
			<Typography level="h2">Sheet</Typography>
			{variants.map(variant => (
				<Box
					key={variant}
					sx={{
						display: "flex",
						alignItems: "center",
						gap: 2,
						my: 4,
						flexWrap: "wrap",
					}}
				>
					{colors.map(color => (
						<Sheet
							key={color}
							variant={variant}
							color={color}
							sx={{
								display: "flex",
								alignItems: "center",
								gap: 2,
								p: 4,
								flex: 1,
								flexWrap: "wrap",
							}}
						>
							{capitalizeFirstLetter(color)}
						</Sheet>
					))}
				</Box>
			))}
		</Layout>
	);
}

export async function getStaticProps(context: GetStaticPropsContext) {
	return getStaticProperties(context);
}
