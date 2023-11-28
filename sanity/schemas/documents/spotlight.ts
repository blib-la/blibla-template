import { defineField, defineType } from "sanity";

import type { PostModel, SpotlightSlot } from "~/sanity/lib/types";
import { hasValidI18N } from "~/sanity/lib/validations";

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
					const { mainImage, body, headline, cta } = context.parent as SpotlightSlot;
					if (entry && cta) {
						return "Ane entry is not allowed when a cta is set. Please remove the CTA or the entry reference.";
					}

					if (!mainImage && !body && !headline && !entry) {
						return "An entry reference is required unless a main image, body, or headline is provided.";
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
