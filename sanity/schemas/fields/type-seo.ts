import { defineField } from "sanity";

import type { Seo } from "~/sanity/lib/types";

export default defineField({
	name: "seo",
	title: "SEO",
	type: "object",
	fields: [
		defineField({
			name: "noIndex",
			title: "No Index",
			type: "boolean",
			description: "Prevent search engines from indexing this page.",
			initialValue: true,
			validation: Rule => Rule.required().error("A noIndex is required."),
		}),
		defineField({
			name: "title",
			title: "Meta Title",
			type: "string",
			description:
				"The title tag of the page, important for search engines and social sharing.",
			validation: Rule => [
				Rule.required().error("A title is required."),
				Rule.max(60).warning(
					"Titles are usually better when they are less than 60 characters."
				),
			],
		}),
		defineField({
			name: "description",
			title: "Meta Description",
			type: "string",
			description:
				"The meta description for the page, which can influence click-through rates from search engine results.",
			validation: Rule => [
				Rule.custom((description, context) => {
					if (!(context.parent as Seo).noIndex && !description) {
						return "Description is required when the page is indexed by search engines.";
					}

					return true; // If noIndex is true, then no error for missing description
				}).error(),
				Rule.max(160).warning(
					"Descriptions are usually better when they are less than 160 characters."
				),
			],
		}),
		defineField({
			name: "ogImage",
			title: "Open Graph Image",
			type: "image",
			description: "The image that represents your page on social media.",
			options: {
				hotspot: true,
			},
		}),
		defineField({
			name: "ogTitle",
			title: "Open Graph Title",
			type: "string",
			description: "The title used when sharing the page on social media platforms.",
		}),
		defineField({
			name: "ogDescription",
			title: "Open Graph Description",
			type: "string",
			description:
				"The description used for the page when sharing on social media platforms.",
		}),
	],
});
