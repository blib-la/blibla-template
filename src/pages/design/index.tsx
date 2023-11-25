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
import { styled } from "@mui/joy/styles";
import type { TypographySystem } from "@mui/joy/styles/types";
import Switch from "@mui/joy/Switch";
import Typography from "@mui/joy/Typography";
import humanizeString from "humanize-string";
import type { GetStaticPropsContext } from "next";
import { upperCaseFirst } from "upper-case-first";

import { getStaticProperties } from "@/ions/ssr/get-properties";
import type { ColorShades, Palette } from "@/ions/theme/palette";
import { palette } from "@/ions/theme/palette";
import { getContrastColor } from "@/ions/utils/color";
import { Layout } from "@/organisms/layout";

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

export function PaletteDisplay({ palette: palette_ }: PaletteProperties) {
	return (
		<Grid container spacing={2} columns={{ xs: 1, sm: 2, md: 4, lg: 5 }} sx={{ my: 4 }}>
			{Object.keys(palette_).map(colorName => (
				<Grid key={colorName} xs={1}>
					<Card
						variant="solid"
						sx={{ bgcolor: palette_[colorName as keyof Palette]["500"] }}
					>
						<Typography
							level="title-lg"
							sx={{ py: 4, color: "#ffffff", textAlign: "center" }}
						>
							{upperCaseFirst(colorName)}
						</Typography>
						<CardContent sx={{ gap: 0 }}>
							{Object.keys(palette_[colorName as keyof Palette]).map(shade => {
								const color =
									palette_[colorName as keyof Palette][
										shade as keyof ColorShades
									];
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

const StyledBox = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	gap: theme.spacing(2),
	padding: theme.spacing(1),
	marginTop: theme.spacing(4),
	marginBottom: theme.spacing(4),
	flexWrap: "wrap",
}));
export default function Page() {
	return (
		<Layout seo={{ noIndex: true, title: "Design System" }}>
			{typeLevels.map(typeLevel => (
				<Typography key={typeLevel} level={typeLevel} component="div">
					Typography Level: {typeLevel}
				</Typography>
			))}
			<Grid container spacing={2} columns={{ xs: 1, md: 2 }} sx={{ my: 4 }}>
				<Grid xs={1}>
					<Typography level="h2" mb={2}>
						Harmonized Color for Enhanced User Experience
					</Typography>
					<Typography>
						At the heart of our public design system lies a commitment to crafting
						exceptional user experiences, and our latest initiative embodies this ethos
						- a meticulously curated, homogeneous color palette. This isn&apos;t merely
						an aesthetic upgrade; it&apos;s a strategic enhancement to our user
						interfaces, making them more intuitive and robust. Our comprehensive range
						of 500-shade colors isn’t just pleasing to the eye; it&apos;s AA compliant
						against both black and white, ensuring that accessibility is not an
						afterthought but a core consideration. By optimizing these shades to pair
						flawlessly with white text, we enhance text visibility, creating a more
						user-friendly interface. This unified approach does not only add visual
						appeal but also fosters better user understanding, setting the stage for a
						seamless and engaging user journey through our digital landscape.
					</Typography>
				</Grid>
				<Grid xs={1}>
					<Typography level="h2" mb={2}>
						Intuitive Design with Strategic Color Integration
					</Typography>
					<Typography>
						Embracing a palette that works as hard as our designers and developers do,
						we&apos;re integrating strategy with aesthetics. Our palette has been
						crafted with component compatibility in mind, ensuring that colors
						seamlessly fit across all design elements. The intuitive gradients and broad
						hue range, including 9 distinct hues and a neutral grey, offer our designers
						the diversity needed to make bold and innovative design choices without
						compromising on inter-hue harmony. This thoughtful curation guarantees that
						our UI remains harmonious, regardless of the complexity or simplicity of the
						design. Moreover, the wide compatibility of our color system means that it
						blends effortlessly with various UI elements and layouts, embodying a fusion
						of design intuition with top-tier development practices. By leveraging this
						strategic color integration, we&apos;re dedicated to delivering a cohesive,
						user-centric product that stands out in the digital realm.
					</Typography>
				</Grid>
			</Grid>

			<PaletteDisplay palette={palette} />
			<Typography level="h2">Button</Typography>
			{variants.map(variant => (
				<StyledBox key={variant}>
					{colors.map(color => (
						<Button key={color} variant={variant} color={color}>
							{humanizeString(color)}
						</Button>
					))}
				</StyledBox>
			))}
			<Typography level="h2">Chip</Typography>
			{variants.map(variant => (
				<StyledBox key={variant}>
					{colors.map(color => (
						<Chip key={color} variant={variant} color={color}>
							{humanizeString(color)}
						</Chip>
					))}
				</StyledBox>
			))}
			<Typography level="h2">Checkbox</Typography>
			{variants.map(variant => (
				<StyledBox key={variant}>
					{colors.map(color => (
						<Checkbox
							key={color}
							label={humanizeString(color)}
							variant={variant}
							color={color}
						/>
					))}
				</StyledBox>
			))}
			<Typography level="h2">Radio</Typography>
			{variants.map(variant => (
				<StyledBox key={variant}>
					{colors.map(color => (
						<Radio
							key={color}
							name={variant}
							label={humanizeString(color)}
							variant={variant}
							color={color}
						/>
					))}
				</StyledBox>
			))}
			<Typography level="h2">Switch</Typography>
			{variants.map(variant => (
				<StyledBox key={variant}>
					{colors.map(color => (
						<Switch
							key={color}
							component="label"
							aria-label={humanizeString(color)}
							endDecorator={humanizeString(color)}
							variant={variant}
							color={color}
						/>
					))}
				</StyledBox>
			))}
			<Typography level="h2">Slider</Typography>
			{variants.map(variant => (
				<StyledBox key={variant}>
					{colors.map(color => (
						<Slider
							key={color}
							aria-label={humanizeString(color)}
							variant={variant}
							color={color}
							sx={{ flex: 1 }}
						/>
					))}
				</StyledBox>
			))}
			<Typography level="h2">Input</Typography>
			{variants.map(variant => (
				<StyledBox key={variant}>
					{colors.map(color => (
						<Input
							key={color}
							defaultValue={color}
							aria-label={humanizeString(color)}
							variant={variant}
							color={color}
							sx={{ flex: 1 }}
						/>
					))}
				</StyledBox>
			))}
			<Typography level="h2">Sheet</Typography>
			{variants.map(variant => (
				<StyledBox key={variant}>
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
							{humanizeString(color)}
						</Sheet>
					))}
				</StyledBox>
			))}
		</Layout>
	);
}

export async function getStaticProps(context: GetStaticPropsContext) {
	return getStaticProperties(context);
}
