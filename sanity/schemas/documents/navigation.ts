import { defineField, defineType } from "sanity";

export default defineType({
	name: "navigation",
	title: "Navigation",
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
			name: "section",
			title: "Navigation Section",
			type: "slug",
			description: "The section on the page, where the entry will be displayed.",
			options: {
				source: "title",
				maxLength: 96,
			},
		}),
		defineField({
			name: "parent",
			title: "Navigation Parent",
			type: "reference",
			to: [{ type: "page" }],
			description: "Select a page to add as a parent navigation link.",
		}),
		defineField({
			title: "Navigation Links",
			name: "links",
			type: "array",
			description:
				"Add and organize the links that will appear in this navigation section. You can reference existing pages to link to them directly.",
			of: [
				{
					title: "Page",
					name: "page",
					type: "reference",
					to: [{ type: "page" }],
					description: "Select a page to add as a navigation item.",
				},
				{
					title: "Navigation",
					name: "navigation",
					type: "reference",
					to: [{ type: "navigation" }],
					description: "Select a page to add as a navigation item.",
				},
				{
					title: "Link",
					name: "link",
					type: "reference",
					to: [{ type: "link" }],
					description: "Select a link to add as a navigation item.",
				},
			],
		}),
	],
	preview: {
		select: {
			title: "title",
		},
		prepare({ title }) {
			return { title, subtitle: "Navigation" };
		},
	},
});
