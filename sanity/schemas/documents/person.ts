import { defineField, defineType } from "sanity";

import { hasValidI18N } from "~/sanity/lib/validations";

export default defineType({
	title: "Person",
	name: "person",
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
			name: "firstName",
			title: "First Name",
			type: "string",
			description: "The person's first name.",
		}),
		defineField({
			name: "lastName",
			title: "Last Name",
			type: "string",
			description: "The person's last name.",
		}),
		defineField({
			name: "pronouns",
			title: "Pronouns",
			type: "internationalizedArrayString",
			description: "The person's pronouns.",
		}),
		defineField({
			name: "linkedin",
			title: "LinkedIn",
			type: "url",
			description: "LinkedIn url of the person.",
		}),
		defineField({
			name: "position",
			title: "Position",
			type: "string",
			description: "The position in the company.",
		}),
		defineField({
			name: "github",
			title: "GitHub",
			type: "string",
			description: "The person's GitHub handle.",
		}),
		defineField({
			name: "mainImage",
			title: "Main Image",
			type: "image",
			description: "The primary visual representation for the person.",
			validation: Rule =>
				Rule.required().error("A main image is required to visually represent the person."),
			options: {
				hotspot: true,
			},
		}),
		defineField({
			name: "biography",
			title: "Biography",
			type: "internationalizedArrayText",
			description: "A brief biography of the person.",
			validation: Rule => [
				Rule.required().error("An biography is required."),
				hasValidI18N(Rule),
			],
		}),
	],
	preview: {
		select: {
			title: "title",
		},
		prepare({ title }) {
			return { title, subtitle: "Person" };
		},
	},
});
