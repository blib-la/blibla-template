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
			validation: Rule => Rule.required().error("An internal title is required."),
		}),
		defineField({
			name: "section",
			title: "Content Section",
			type: "slug",
			description: "The section on the page, where the entry will be displayed.",
			options: {
				source: "title",
				maxLength: 96,
			},
		}),
		defineField({
			name: "name",
			title: "Name",
			type: "string",
			description: "The name of the address owner.",
			validation: Rule => Rule.required().error("The name is required."),
		}),
		defineField({
			name: "streetName",
			title: "Street Name",
			type: "string",
			description:
				"The name of the street, excluding house number and additional descriptors.",
			validation: Rule => Rule.required().error("The street name is required."),
		}),
		defineField({
			name: "houseNumber",
			title: "House/Building Number",
			type: "string",
			description: "The specific number of the house or building within the street.",
			validation: Rule => Rule.required().error("The house or building number is required."),
		}),
		defineField({
			name: "addressExtra",
			title: "Additional Address Details",
			type: "string",
			description: "Additional details such as apartment/suite number, building name, etc.",
			validation: Rule =>
				Rule.error("Please include any additional address details if applicable."),
		}),
		defineField({
			name: "zip",
			title: "Postal/ZIP Code",
			type: "string",
			description: "The postal or ZIP code for the address.",
			validation: Rule => Rule.required().error("The postal or ZIP code is required."),
		}),
		defineField({
			name: "city",
			title: "City/Town",
			type: "string",
			description: "The city or town where the address is located.",
			validation: Rule =>
				Rule.required().error("The city or town of the address is required."),
		}),
		defineField({
			name: "province",
			title: "State/Province/Region",
			type: "string",
			description: "The state, province, or region for the address.",
			validation: Rule =>
				Rule.required().error("The state, province, or region is required."),
		}),
		defineField({
			name: "country",
			title: "Country",
			type: "string",
			description: "The country where the address is situated.",
			options: {
				list: Object.entries(countries).map(([value, title]) => ({ title, value })),
			},
			validation: Rule => Rule.required().error("The country of the address is required."),
		}),
		defineField({
			name: "notes",
			title: "Additional Notes",
			type: "text",
			description:
				"Space for any supplementary notes or instructions related to the address.",
		}),
		defineField({
			name: "email",
			title: "Contact Email",
			type: "string",
			description: "The email address for correspondence related to the address.",
			validation: Rule => Rule.email().error("A valid email address is required."),
		}),
		defineField({
			name: "phone",
			title: "Contact Phone Number",
			type: "string",
			description: "The phone number for contact, including country code.",
			validation: Rule =>
				Rule.custom((phone, context) => {
					const country = (context.parent as { country?: string })?.country;
					return validatePhoneNumber(phone, country ?? "US");
				}).error("A valid phone number is required."),
		}),
	],
	preview: {
		select: {
			title: "title",
		},
		prepare({ title }) {
			return { title, subtitle: "Address" };
		},
	},
});
