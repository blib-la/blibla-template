import { getRawAsPath } from "../path";

describe("getRawAsPath", () => {
	const locales = ["en", "de"];

	it("should remove a locale suffix from asPath", () => {
		expect(getRawAsPath("/products/en", locales)).toEqual("/products");
		expect(getRawAsPath("/products/de", locales)).toEqual("/products");
	});

	it("should return the original asPath if no locale is present", () => {
		const asPath = "/products/es";
		expect(getRawAsPath(asPath, locales)).toEqual("/products/es");
	});

	it("should return the original asPath if no locales array is provided", () => {
		const asPath = "/products/en";
		expect(getRawAsPath(asPath)).toEqual("/products/en");
	});

	it("should return the original asPath when an empty locales array is provided", () => {
		const asPath = "/products/en";
		expect(getRawAsPath(asPath, [])).toEqual("/products/en");
	});
});
