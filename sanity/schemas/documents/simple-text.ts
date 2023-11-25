import { defineField, defineType } from "sanity";

import { hasValidI18N } from "~/sanity/lib/validations";

export default defineType({
	title: "Simple Text",
	name: "simpleText",
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
			title: "Content Text",
			name: "text",
			type: "internationalizedArrayString",
			description: "The actual text content to be displayed.",
			validation: Rule => [
				Rule.required().error("The content text cannot be empty."),
				hasValidI18N(Rule),
			],
		}),
		defineField({
			title: "Typography Level",
			name: "level",
			type: "string",
			description:
				"The typographic style to apply, corresponding to the theme's typography levels.",
			initialValue: "title-lg",
			options: {
				list: [
					{ title: "Heading 1", value: "h1" },
					{ title: "Heading 2", value: "h2" },
					{ title: "Heading 3", value: "h3" },
					{ title: "Heading 4", value: "h4" },
					{ title: "Large Title", value: "title-lg" },
					{ title: "Medium Title", value: "title-md" },
					{ title: "Small Title", value: "title-sm" },
					{ title: "Large Body", value: "body-lg" },
					{ title: "Medium Body", value: "body-md" },
					{ title: "Small Body", value: "body-sm" },
					{ title: "Extra Small Body", value: "body-xs" },
				],
			},
		}),
		defineField({
			title: "HTML Element",
			name: "component",
			type: "string",
			description:
				"The HTML element or component to render, controlling the semantics and accessibility.",
			initialValue: "p",
			options: {
				list: [
					{ title: "Heading 1", value: "h1" },
					{ title: "Heading 2", value: "h2" },
					{ title: "Heading 3", value: "h3" },
					{ title: "Heading 4", value: "h4" },
					{ title: "Paragraph", value: "p" },
				],
			},
		}),
		defineField({
			name: "alignment",
			title: "Text Alignment",
			type: "string",
			description: "The horizontal alignment of the text within its container.",
			initialValue: "left",
			options: {
				list: [
					{ title: "Left", value: "left" },
					{ title: "Right", value: "right" },
					{ title: "Center", value: "center" },
				],
				layout: "radio",
			},
		}),
	],
	preview: {
		select: {
			title: "title",
			level: "level",
			component: "component",
		},
		prepare({ title, level, component }) {
			return { title, subtitle: `${component.toUpperCase()}: Simple Text (level: ${level})` };
		},
	},
});
