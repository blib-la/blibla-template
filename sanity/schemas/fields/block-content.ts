import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
	title: "Block Content",
	name: "blockContent",
	type: "array",
	of: [
		defineArrayMember({
			title: "Block",
			type: "block",
			// Styles let you set what your user can mark up blocks with. These
			// correspond with HTML tags, but you can set any title or value
			// you want and decide how you want to deal with it where you want to
			// use your content.
			styles: [
				{ title: "Normal", value: "normal" },
				{ title: "H2", value: "h2" },
				{ title: "H3", value: "h3" },
				{ title: "H4", value: "h4" },
			],
			lists: [{ title: "Bullet", value: "bullet" }],
			// Marks let you mark up inline text in the block editor.
			marks: {
				// Decorators usually describe a single property – e.g. a typographic
				// preference or highlighting by editors.
				decorators: [
					{ title: "Strong", value: "strong" },
					{ title: "Emphasis", value: "em" },
				],
				// Annotations can be any object structure – e.g. a link or a footnote.
				annotations: [
					{
						title: "URL",
						name: "link",
						type: "object",
						fields: [
							{
								title: "URL",
								name: "href",
								type: "url",
								validation: Rule =>
									Rule.uri({
										scheme: ["https", "mailto"],
									}),
							},
						],
					},
					{ name: "page", title: "Page", type: "reference", to: { type: "page" } },
					{ name: "post", title: "Post", type: "reference", to: { type: "post" } },
				],
			},
		}),
		defineArrayMember({
			title: "Image",
			type: "image",
			fields: [
				{
					title: "Alt Text",
					name: "alt",
					type: "string",
				},
				{
					title: "Caption",
					name: "caption",
					type: "text",
				},
				defineField({
					title: "Float",
					name: "float",
					type: "string",
					initialValue: "none",
					options: {
						list: ["none", "left", "right"],
					},
				}),
			],
			options: {
				hotspot: true, // Enables image cropping
			},
		}),
		defineArrayMember({
			title: "Reference",
			type: "reference",
			to: [{ type: "person" }],
		}),
	],
});
