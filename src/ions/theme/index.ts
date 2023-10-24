import { extendTheme } from "@mui/joy/styles";

import { body, display } from "@/ions/fonts";
import { CSS_VARIABLE_PREFIX } from "@/ions/theme/constants";
import { palette } from "@/ions/theme/palette";
import { getCssVariable } from "@/ions/theme/utils";
import { hexToRGB } from "@/ions/utils/color";

export const theme = extendTheme({
	cssVarPrefix: CSS_VARIABLE_PREFIX,
	colorSchemes: {
		light: {
			palette: {
				primary: {
					...palette.teal,
					plainColor: getCssVariable("palette-primary-600"),
					outlinedColor: getCssVariable("palette-primary-600"),
				},
				secondary: {
					...palette.pink,
					plainColor: getCssVariable("palette-secondary-600"),
					plainHoverBg: getCssVariable("palette-secondary-100"),
					plainActiveBg: getCssVariable("palette-secondary-200"),
					plainDisabledColor: getCssVariable("palette-neutral-400"),
					outlinedColor: getCssVariable("palette-secondary-600"),
					outlinedBorder: getCssVariable("palette-secondary-300"),
					outlinedHoverBg: getCssVariable("palette-secondary-100"),
					outlinedActiveBg: getCssVariable("palette-secondary-200"),
					outlinedDisabledColor: getCssVariable("palette-neutral-400"),
					outlinedDisabledBorder: getCssVariable("palette-neutral-200"),
					softColor: getCssVariable("palette-secondary-700"),
					softBg: getCssVariable("palette-secondary-100"),
					softHoverBg: getCssVariable("palette-secondary-200"),
					softActiveColor: getCssVariable("palette-secondary-800"),
					softActiveBg: getCssVariable("palette-secondary-300"),
					softDisabledColor: getCssVariable("palette-neutral-400"),
					softDisabledBg: getCssVariable("palette-neutral-50"),
					solidColor: getCssVariable("palette-common-white, #FFF"),
					solidBg: getCssVariable("palette-secondary-500"),
					solidHoverBg: getCssVariable("palette-secondary-600"),
					solidActiveBg: getCssVariable("palette-secondary-700"),
					solidDisabledColor: getCssVariable("palette-neutral-400"),
					solidDisabledBg: getCssVariable("palette-neutral-100"),
					mainChannel: hexToRGB(palette.pink["500"]).join(" "),
					lightChannel: hexToRGB(palette.pink["200"]).join(" "),
					darkChannel: hexToRGB(palette.pink["700"]).join(" "),
				},
				neutral: {
					...palette.grey,
					plainColor: getCssVariable("palette-neutral-600"),
					outlinedColor: getCssVariable("palette-neutral-600"),
				},
				danger: {
					...palette.red,
					plainColor: getCssVariable("palette-danger-600"),
					outlinedColor: getCssVariable("palette-danger-600"),
				},
				success: {
					...palette.green,
					plainColor: getCssVariable("palette-success-600"),
					outlinedColor: getCssVariable("palette-success-600"),
				},
				warning: {
					...palette.yellow,
					plainColor: getCssVariable("palette-warning-600"),
					outlinedColor: getCssVariable("palette-warning-600"),
				},
			},
		},
		dark: {
			palette: {
				primary: {
					...palette.teal,
					plainColor: getCssVariable("palette-primary-300"),
					outlinedColor: getCssVariable("palette-primary-300"),
				},
				secondary: {
					...palette.pink,
					plainColor: getCssVariable("palette-secondary-300"),
					plainHoverBg: getCssVariable("palette-secondary-800"),
					plainActiveBg: getCssVariable("palette-secondary-700"),
					plainDisabledColor: getCssVariable("palette-neutral-500"),
					outlinedColor: getCssVariable("palette-secondary-200"),
					outlinedBorder: getCssVariable("palette-secondary-700"),
					outlinedHoverBg: getCssVariable("palette-secondary-800"),
					outlinedActiveBg: getCssVariable("palette-secondary-700"),
					outlinedDisabledColor: getCssVariable("palette-neutral-500"),
					outlinedDisabledBorder: getCssVariable("palette-neutral-800"),
					softColor: getCssVariable("palette-secondary-200"),
					softBg: getCssVariable("palette-secondary-800"),
					softHoverBg: getCssVariable("palette-secondary-700"),
					softActiveColor: getCssVariable("palette-secondary-100"),
					softActiveBg: getCssVariable("palette-secondary-600"),
					softDisabledColor: getCssVariable("palette-neutral-500"),
					softDisabledBg: getCssVariable("palette-neutral-800"),
					solidColor: getCssVariable("palette-common-white, #FFF"),
					solidBg: getCssVariable("palette-secondary-500"),
					solidHoverBg: getCssVariable("palette-secondary-600"),
					solidDisabledColor: getCssVariable("palette-neutral-500, #636B74"),
					solidDisabledBg: getCssVariable("palette-neutral-800, #171A1C"),
					mainChannel: hexToRGB(palette.pink["400"]).join(" "),
					lightChannel: hexToRGB(palette.pink["200"]).join(" "),
					darkChannel: hexToRGB(palette.pink["700"]).join(" "),
				},
				neutral: {
					...palette.grey,
					plainColor: getCssVariable("palette-neutral-300"),
					outlinedColor: getCssVariable("palette-neutral-300"),
				},
				danger: {
					...palette.red,
					plainColor: getCssVariable("palette-danger-300"),
					outlinedColor: getCssVariable("palette-danger-300"),
				},
				success: {
					...palette.green,
					plainColor: getCssVariable("palette-success-300"),
					outlinedColor: getCssVariable("palette-success-300"),
				},
				warning: {
					...palette.yellow,
					plainColor: getCssVariable("palette-warning-300"),
					outlinedColor: getCssVariable("palette-warning-300"),
				},
			},
		},
	},
	components: {
		JoyLink: {
			styleOverrides: {
				root: {
					"[data-joy-color-scheme=light] &": {
						"&.MuiLink-colorNeutral": {
							color: getCssVariable("palette-neutral-600"),
						},
						"&.MuiLink-colorPrimary": {
							color: getCssVariable("palette-primary-600"),
						},
						"&.MuiLink-colorSecondary": {
							color: getCssVariable("palette-secondary-600"),
						},
						"&.MuiLink-colorDanger": {
							color: getCssVariable("palette-danger-600"),
						},
						"&.MuiLink-colorSuccess": {
							color: getCssVariable("palette-success-600"),
						},
						"&.MuiLink-colorWarning": {
							color: getCssVariable("palette-warning-600"),
						},
					},
					"[data-joy-color-scheme=dark] &": {
						"&.MuiLink-colorNeutral": {
							color: getCssVariable("palette-neutral-300"),
						},
						"&.MuiLink-colorPrimary": {
							color: getCssVariable("palette-primary-300"),
						},
						"&.MuiLink-colorSecondary": {
							color: getCssVariable("palette-secondary-300"),
						},
						"&.MuiLink-colorDanger": {
							color: getCssVariable("palette-danger-300"),
						},
						"&.MuiLink-colorSuccess": {
							color: getCssVariable("palette-success-300"),
						},
						"&.MuiLink-colorWarning": {
							color: getCssVariable("palette-warning-300"),
						},
					},
				},
			},
		},
	},
	fontFamily: {
		display: display.style.fontFamily,
		body: body.style.fontFamily,
	},
});
