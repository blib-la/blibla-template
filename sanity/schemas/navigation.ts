import { defineField, defineType } from "sanity";

import page from "./page";

export default defineType({
	name: "navigation",
	title: "Navigation",
	type: "document",
	fields: [
		defineField({
			name: "title",
			title: "Title",
			type: "string",
			validation: Rule => Rule.required(),
		}),
		defineField({
			name: "section",
			title: "Section",
			type: "slug",
			validation: Rule => Rule.required(),
			options: {
				source: "title",
				maxLength: 96,
			},
		}),
		defineField({
			title: "Links",
			name: "links",
			type: "array",
			of: [
				{
					type: "reference",
					to: [{ type: page.name }],
				},
			],
		}),
	],
	preview: {
		select: {
			title: "title",
			author: "author.name",
			media: "mainImage",
		},
		prepare(selection) {
			const { author } = selection;
			return { ...selection, subtitle: author && `by ${author}` };
		},
	},
});
