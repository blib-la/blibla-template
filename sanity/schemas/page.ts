import { defineField, defineType } from "sanity";

export default defineType({
	name: "page",
	title: "Page",
	type: "document",
	fields: [
		defineField({
			name: "title",
			title: "Title",
			type: "string",
			description: "Internal use",
			validation: Rule => Rule.required(),
		}),
		defineField({
			name: "route",
			title: "Route",
			type: "slug",
			description: "The relative url of the page",
			validation: Rule => Rule.required(),
			options: {
				source: "title",
				maxLength: 96,
			},
		}),
		defineField({
			name: "label",
			title: "Label",
			description: "This value will be used in links",
			type: "internationalizedArrayString",
			validation: Rule => Rule.required(),
		}),
		defineField({
			name: "seo",
			type: "internationalizedArraySeo",
			validation: Rule => Rule.required(),
		}),
		defineField({
			name: "headline",
			title: "Headline",
			type: "internationalizedArrayString",
		}),
		defineField({
			name: "body",
			title: "Body",
			type: "internationalizedArrayBlockContent",
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
