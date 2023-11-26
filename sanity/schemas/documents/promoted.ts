import humanizeString from "humanize-string";
import { defineField, defineType } from "sanity";

export default defineType({
	title: "Promoted Content",
	name: "promoted",
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
			title: "Headline",
			name: "headline",
			type: "internationalizedArrayString",
			description: "A headline to be displayed above the content.",
		}),
		defineField({
			name: "type",
			title: "Content Type",
			type: "string",
			description:
				"Select the type of content to promote. Currently, only 'post' is supported.",
			validation: Rule => Rule.required().error("The content type must be specified."),
			options: {
				list: ["post"],
				layout: "radio",
			},
		}),
	],
	preview: {
		select: {
			title: "title",
			type: "type",
		},
		prepare({ title, type }) {
			return { title, subtitle: `Promoted ${humanizeString(type)}` };
		},
	},
});
