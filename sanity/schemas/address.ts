import { getCodeList } from "country-list";
import { PhoneNumberUtil } from "google-libphonenumber";
import { defineField, defineType } from "sanity";

// Create an instance of PhoneNumberUtil
const phoneUtil = PhoneNumberUtil.getInstance();

export function validatePhoneNumber(phone?: string, country?: string) {
	if (!phone) {
		return true;
	} // Allow empty

	try {
		const phoneNumber = phoneUtil.parseAndKeepRawInput(phone, country);
		return phoneUtil.isValidNumber(phoneNumber) ? true : "Invalid phone number format";
	} catch {
		return "Invalid phone number format";
	}
}

const countries = getCodeList();

export default defineType({
	name: "address",
	title: "Address",
	type: "document",
	fields: [
		defineField({
			name: "title",
			title: "Title",
			type: "string",
			description: "Title for internal use.",
			validation: Rule => Rule.required(),
		}),
		defineField({
			name: "section",
			title: "Section",
			type: "slug",
			description: "The section where this content is used.",
			validation: Rule => Rule.required(),
			options: {
				source: "title",
				maxLength: 96,
			},
		}),
		defineField({
			name: "streetName",
			title: "Street Name",
			type: "string",
			description: "The name of the street.",
		}),
		defineField({
			name: "houseNumber",
			title: "House Number",
			type: "string",
			description: "The house number.",
		}),
		defineField({
			name: "addressExtra",
			title: "Address Extra",
			type: "string",
			description: "Any additional address information.",
		}),
		defineField({
			name: "zip",
			title: "Zip Code",
			type: "string",
			description: "The zip code of the area.",
		}),
		defineField({
			name: "city",
			title: "City",
			type: "string",
			description: "The city where the address is located.",
		}),
		defineField({
			name: "province",
			title: "Province",
			type: "string",
			description: "The province of the address.",
		}),
		defineField({
			name: "country",
			title: "Country",
			type: "string",
			description: "The country of the address.",
			options: {
				list: Object.entries(countries).map(([value, title]) => ({ title, value })),
			},
		}),
		defineField({
			name: "notes",
			title: "Additional Notes",
			type: "text",
			description: "Any additional notes regarding the address.",
		}),
		defineField({
			name: "email",
			title: "Email",
			type: "string",
			description: "The email address for contact.",
			validation: Rule => Rule.email(),
		}),
		defineField({
			name: "phone",
			title: "Phone",
			type: "string",
			description: "The phone number for contact.",
			validation: Rule =>
				Rule.custom((phone, context) => {
					const country = (context.parent as { country?: string })?.country;
					return validatePhoneNumber(phone, country ?? "US");
				}),
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
