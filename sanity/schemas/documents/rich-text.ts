import { defineField, defineType } from "sanity";

import { hasValidI18N } from "~/sanity/lib/validations";

export default defineType({
	title: "Rich Text",
	name: "richText",
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
			name: "body",
			title: "Content Body",
			type: "internationalizedArrayBlockContent",
			description:
				"This is the main content section. You can add and format text, and create links.",
			validation: Rule => [
				Rule.required().error("The content body cannot be empty."),
				hasValidI18N(Rule),
			],
		}),
	],
	preview: {
		select: {
			title: "title",
		},
		prepare({ title }) {
			return { title, subtitle: "Rich Text" };
		},
	},
});
