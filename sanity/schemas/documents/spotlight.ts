import { defineField, defineType } from "sanity";

import type { PostModel, SpotlightSlot } from "~/sanity/lib/types";

export default defineType({
	title: "Spotlight",
	name: "spotlight",
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
			name: "headline",
			title: "Headline",
			type: "internationalizedArrayString",
			description: "The main heading for the spotlight, visible to users.",
		}),
		defineField({
			name: "excerpt",
			title: "Excerpt",
			type: "internationalizedArrayText",
			description:
				"A short summary or teaser that provides a glimpse into the spotlight content.",
		}),
		defineField({
			name: "mainImage",
			title: "Main Image",
			type: "image",
			description: "The primary visual representation for the spotlight.",
			options: {
				hotspot: true,
			},
		}),
		defineField({
			title: "Call To Action",
			name: "cta",
			type: "reference",
			description:
				"Optional link to a page providing further details or actions for the user.",
			to: [{ type: "page" }],
			validation: Rule =>
				Rule.custom((cta, context) => {
					const { entry } = context.parent as { entry: PostModel };
					if (entry && cta) {
						return "A CTA to a page is not allowed when an entry is linked. Please remove the CTA or the entry reference.";
					}

					return true;
				}),
		}),
		defineField({
			title: "Linked Entry",
			name: "entry",
			type: "reference",
			description: "Direct reference to the main content item being spotlighted.",
			to: [{ type: "post" }],
			validation: Rule =>
				Rule.custom((entry, context) => {
					const { mainImage, excerpt, headline, cta } = context.parent as SpotlightSlot;
					if (entry && cta) {
						return "Ane entry is not allowed when a cta is set. Please remove the CTA or the entry reference.";
					}

					if (!mainImage && !excerpt && !headline && !entry) {
						return "An entry reference is required unless a main image, excerpt, or headline is provided.";
					}

					return true;
				}),
		}),
	],
	preview: {
		select: {
			title: "title",
		},
		prepare({ title }) {
			return { title, subtitle: "Spotlight" };
		},
	},
});
