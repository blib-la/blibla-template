import { defineField, defineType } from "sanity";

import { hasValidI18N } from "~/sanity/lib/validations";
export default defineType({
	name: "page",
	title: "Page",
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
			name: "route",
			title: "Page URL Slug",
			type: "slug",
			description:
				"The route that identifies this page on the website. It can have slashes i.e. 'legal/imprint'.",
			validation: Rule => Rule.required().error("A route is required for routing purposes."),
			options: {
				source: "title",
				maxLength: 96,
			},
		}),
		defineField({
			name: "label",
			title: "Navigation Label",
			type: "internationalizedArrayString",
			description:
				"The text that will be used for this page in navigational elements and links.",
			validation: Rule => [
				Rule.required().error("Navigation label for the page is required."),
				hasValidI18N(Rule),
			],
		}),
		defineField({
			name: "seo",
			title: "SEO Metadata",
			type: "internationalizedArraySeo",
			description:
				"Search engine optimization settings for this page, including meta title, descriptions, and OG.",
			validation: Rule => [
				Rule.required().error(
					"SEO metadata is essential for the page's visibility in search engines."
				),
				hasValidI18N(Rule),
			],
		}),
		defineField({
			name: "template",
			title: "Page Template",
			type: "string",
			description:
				"The layout template that dictates how the page is structured and displayed.",
			validation: Rule => Rule.required().error("A page template must be selected."),
			initialValue: "0",
			options: {
				list: [
					{ value: "0", title: "Text Page" },
					{ value: "1", title: "Landing Page" },
					{ value: "2", title: "Parent Page" },
				],
			},
		}),
		defineField({
			name: "headline",
			title: "Page Headline",
			type: "internationalizedArrayString",
			description:
				"The main headline displayed on the page, used primarily for text page templates.",
			hidden: ({ parent }) => parent?.template !== "0",
			validation: Rule => hasValidI18N(Rule, { template: "0" }),
		}),
		defineField({
			name: "body",
			title: "Page Content Body",
			type: "internationalizedArrayBlockContent",
			description: "The main content of the page; can include text, images, and other media.",
			hidden: ({ parent }) => parent?.template !== "0",
		}),
		defineField({
			title: "Stage",
			name: "stage",
			type: "reference",
			description:
				"Reference to a 'Stage' document that defines the introductory section of the page, often including a headline, a subtitle, and a call to action.",
			to: [{ type: "stage" }],
			hidden: ({ parent }) => parent && !["1", "2"].includes(parent.template),
		}),
		defineField({
			name: "items",
			title: "Listed Items",
			type: "string",
			description: "The items to be listed on this page.",
			hidden: ({ parent }) => parent?.template !== "2",
			validation: Rule =>
				Rule.custom((items, context) => {
					const { template } = context.parent as { template: string };
					if (template === "2" && !items) {
						return "A parent page requires items to be listed.";
					}

					return true;
				}),
			options: {
				list: ["post"],
			},
		}),
		defineField({
			title: "Content Slots",
			name: "slots",
			type: "array",
			description:
				"Dynamic content slots that can be filled with various types of content references, available for certain templates.",
			of: [
				{
					title: "Link",
					name: "link",
					type: "reference",
					to: [{ type: "page" }, { type: "post" }],
				},
				{
					title: "Promoted",
					name: "promoted",
					type: "reference",
					to: [{ type: "promoted" }],
				},
				{
					title: "Rich Text",
					name: "richText",
					type: "reference",
					to: [{ type: "richText" }],
				},
				{
					title: "Simple Text",
					name: "simpleText",
					type: "reference",
					to: [{ type: "simpleText" }],
				},
				{
					title: "Slideshow",
					name: "slideshow",
					type: "reference",
					to: [{ type: "slideshow" }],
				},
				{
					title: "Spot Image",
					name: "spotImage",
					type: "reference",
					to: [{ type: "spotImage" }],
				},
				{
					title: "Spotlight",
					name: "spotlight",
					type: "reference",
					to: [{ type: "spotlight" }],
				},
				{
					title: "Tiles",
					name: "tiles",
					type: "reference",
					to: [{ type: "tiles" }],
				},
			],
			hidden: ({ parent }) => parent?.template !== "1",
		}),
	],
	preview: {
		select: {
			title: "title",
		},
		prepare({ title }) {
			return { title, subtitle: "Page" };
		},
	},
});
