import { defineField, defineType } from "sanity";

export default defineType({
	title: "Spot Image",
	name: "spotImage",
	type: "document",
	fields: [
		defineField({
			name: "title",
			title: "Title",
			type: "string",
			description: "Title for internal use.",
			validation: Rule => Rule.required().error("An internal title is required."),
		}),
		defineField({
			name: "excerpt",
			title: "Excerpt",
			type: "internationalizedArrayText",
			description:
				"A short summary or teaser that provides a glimpse into the image content.",
		}),
		defineField({
			name: "mainImage",
			title: "Main Image",
			type: "image",
			description: "The primary visual representation for the image.",
			options: {
				hotspot: true,
			},
		}),
	],
	preview: {
		select: {
			title: "title",
		},
		prepare({ title }) {
			return { title, subtitle: "Spot Image" };
		},
	},
});
