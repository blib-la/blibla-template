import { defineField, defineType } from "sanity";

export default defineType({
	title: "Tiles",
	name: "tiles",
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
			name: "columns",
			title: "Columns",
			type: "number",
			description: "Number of columns.",
			initialValue: 2,
			validation: Rule => Rule.required().error("Columns are required."),
			options: {
				list: [2, 4],
				layout: "radio",
			},
		}),
		defineField({
			name: "color",
			title: "Background Color",
			type: "string",
			description: "Background color of the Tiles.",
			initialValue: "neutral",
			options: {
				list: [
					{ title: "Primary", value: "primary" },
					{ title: "Secondary", value: "secondary" },
					{ title: "Danger", value: "danger" },
					{ title: "Warning", value: "warning" },
					{ title: "Success", value: "success" },
					{ title: "Neutral", value: "neutral" },
				],
			},
		}),
		defineField({
			name: "variant",
			title: "Background Variant",
			type: "string",
			description: "Variant of the Tiles.",
			initialValue: "transparent",
			options: {
				list: [
					{ title: "Plain", value: "plain" },
					{ title: "Outlined", value: "outlined" },
					{ title: "Soft", value: "soft" },
				],
			},
		}),
		defineField({
			title: "Items",
			name: "items",
			type: "array",
			description: "A collection of items to be displayed as tiles.",
			of: [
				{
					title: "Rich Text",
					name: "richText",
					type: "reference",
					to: [{ type: "richText" }],
				},
			],
		}),
	],
	preview: {
		select: {
			title: "title",
		},
		prepare({ title }) {
			return { title, subtitle: "Tiles" };
		},
	},
});
