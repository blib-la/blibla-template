import { defineField } from "sanity";

export default defineField({
	name: "seo",
	title: "SEO",
	type: "object",
	fields: [
		defineField({ name: "noIndex", title: "No Index", type: "boolean" }),
		defineField({
			name: "title",
			title: "Title",
			type: "string",
			hidden: ({ parent }) => parent?.noIndex,
		}),
		defineField({
			name: "description",
			title: "Description",
			type: "string",
			hidden: ({ parent }) => parent?.noIndex,
		}),
	],
});
