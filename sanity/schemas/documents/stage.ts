import { defineField, defineType } from "sanity";

export default defineType({
	name: "stage",
	title: "Stage",
	type: "document",
	fields: [
		defineField({
			name: "title",
			title: "Internal Title",
			type: "string",
			description: "Title for internal use.",
			validation: Rule => Rule.required().error("An internal title is required."),
		}),
		defineField({
			name: "darkImage",
			title: "Dark Mode Image",
			type: "image",
			description:
				"This image will be displayed when the site is in dark mode. It should offer good contrast with dark backgrounds. Recommended dimensions: 1920x1080 pixels.",
			validation: Rule => Rule.required().error("An image for dark mode is required."),
			options: {
				hotspot: true,
			},
		}),
		defineField({
			name: "lightImage",
			title: "Light Mode Image",
			type: "image",
			description:
				"Optional image for light mode. It will be used instead of the dark mode image when the site is in light mode. Recommended dimensions: 1920x1080 pixels.",
			options: {
				hotspot: true,
			},
		}),
		defineField({
			name: "headline",
			title: "Headline",
			type: "internationalizedArrayString",
			description:
				"The prominent text displayed on the stage, intended to attract attention.",
		}),
		defineField({
			name: "subtitle",
			title: "Subtitle",
			type: "internationalizedArrayString",
			description: "Additional text that provides more context to the headline.",
		}),
		defineField({
			name: "aboveTheFold",
			title: "Display Above the Fold",
			type: "boolean",
			description:
				"Indicates whether the stage content should cover the full viewport height.",
		}),
		defineField({
			name: "fit",
			title: "Fit the image",
			type: "string",
			description: "Allows setting the image to cover or contain.",
			initialValue: "cover",
			options: {
				list: ["cover", "contain"],
			},
		}),
		defineField({
			name: "bgcolor",
			title: "Background Color",
			type: "string",
			description: "Background color of the stage.",
			initialValue: "transparent",
			options: {
				list: [
					{ title: "Transparent", value: "transparent" },
					{ title: "Primary", value: "primary.500" },
					{ title: "Secondary", value: "secondary.500" },
					{ title: "Neutral", value: "neutral.500" },
				],
			},
		}),
		defineField({
			name: "cta",
			title: "Call to Action",
			type: "object",
			fields: [
				defineField({
					name: "href",
					title: "URL",
					type: "url",
					description: "The URL the CTA will link to.",
					validation: Rule =>
						Rule.required()
							.uri({
								allowRelative: true,
								scheme: ["https", "mailto", "tel"],
							})
							.warning("A valid URL is required for the CTA."),
				}),
				defineField({
					name: "label",
					title: "Label",
					type: "internationalizedArrayString",
					description: "The text on the CTA button or link.",
					validation: Rule => Rule.required().error("A label for the CTA is required."),
				}),
				defineField({
					name: "noFollow",
					title: "No Follow",
					type: "boolean",
					description:
						"Instructs search engines not to follow this link for SEO purposes.",
				}),
			],
			options: {
				collapsible: true,
			},
		}),
	],
});
