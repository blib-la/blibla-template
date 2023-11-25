import { defineField, defineType } from "sanity";

import { hasValidI18N } from "~/sanity/lib/validations";

export default defineType({
	name: "post",
	title: "Post",
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
			name: "slug",
			title: "Slug",
			type: "slug",
			description: "The unique identifier for the post, used in the post's URL.",
			validation: Rule => Rule.required().error("A slug is required for SEO purposes."),
			options: {
				source: "title",
				maxLength: 96,
			},
		}),
		defineField({
			name: "seo",
			title: "SEO Metadata",
			type: "internationalizedArraySeo",
			description:
				"Search engine optimization settings for this post, including meta title, descriptions and OG.",
			validation: Rule => [
				Rule.required().error(
					"SEO metadata is essential for the post's visibility in search engines."
				),
				hasValidI18N(Rule),
			],
		}),
		defineField({
			name: "headline",
			title: "Headline",
			type: "internationalizedArrayString",
			description: "The primary heading for the post, usually more prominent than the title.",
			validation: Rule => [
				Rule.required().error("A headline is required for the post."),
				hasValidI18N(Rule),
			],
		}),
		defineField({
			name: "excerpt",
			title: "Excerpt",
			type: "internationalizedArrayText",
			description:
				"A brief summary of the post that entices readers and appears in listings or previews.",
			validation: Rule => [
				Rule.required().error("An excerpt is required to summarize the post."),
				hasValidI18N(Rule),
			],
		}),
		defineField({
			name: "mainImage",
			title: "Main Image",
			type: "image",
			description:
				"The leading image for the post. It's often shown at the top or used as a thumbnail.",
			validation: Rule =>
				Rule.required().error("A main image is required to visually represent the post."),
			options: {
				hotspot: true,
			},
		}),
		defineField({
			name: "body",
			title: "Body",
			type: "internationalizedArrayBlockContent",
			description: "The main content of the post. This is where the full story is told.",
			validation: Rule => [
				Rule.required().error("A body is required to represent the post."),
				hasValidI18N(Rule),
			],
		}),
	],
	preview: {
		select: {
			title: "title",
			media: "mainImage",
		},
		prepare({ title, media }) {
			return { title, media, subtitle: "Post" };
		},
	},
});
