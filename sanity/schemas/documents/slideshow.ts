import { defineField, defineType } from "sanity";

export default defineType({
	title: "Slideshow",
	name: "slideshow",
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
			title: "Slides Content",
			name: "slides",
			type: "array",
			description: "A collection of slides to be displayed in the slideshow.",
			of: [
				{
					title: "Post",
					name: "post",
					type: "reference",
					to: [{ type: "post" }],
				},
				{
					title: "Stage",
					name: "stage",
					type: "reference",
					to: [{ type: "stage" }],
				},
			],
		}),
	],
	preview: {
		select: {
			title: "title",
		},
		prepare({ title }) {
			return { title, subtitle: "Slideshow" };
		},
	},
});
