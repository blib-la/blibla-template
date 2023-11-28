import { defineField, defineType } from "sanity";

import { hasValidI18N } from "~/sanity/lib/validations";

export default defineType({
	title: "Link",
	name: "link",
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
			title: "Label",
			name: "label",
			type: "internationalizedArrayString",
			description: "The label to be displayed.",
			validation: Rule => [
				Rule.required().error("The label cannot be empty."),
				hasValidI18N(Rule),
			],
		}),
		defineField({
			name: "href",
			title: "Href",
			type: "url",
			description: "The url of the link.",
			validation: Rule => Rule.required().error("An href is required."),
		}),
	],
	preview: {
		select: {
			title: "title",
		},
		prepare({ title }) {
			return { title, subtitle: "Link" };
		},
	},
});
