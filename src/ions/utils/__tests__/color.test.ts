import { getContrast, getContrastColor, getRelativeLuminance, hexToRGB } from "../color";

describe("getContrastColor", () => {
	it("should return black for light colors", () => {
		const result = getContrastColor("#FFFFFF");
		expect(result).toBe("black");
	});

	it("should return white for dark colors", () => {
		const result = getContrastColor("#000000");
		expect(result).toBe("white");
	});

	it("should return black for medium-light colors", () => {
		const result = getContrastColor("#7BAFD4");
		expect(result).toBe("black");
	});

	it("should return white for medium-dark colors", () => {
		const result = getContrastColor("#4B372B");
		expect(result).toBe("white");
	});

	it("should remove leading hash from hex color", () => {
		const result = getContrastColor("#FFFFFF");
		expect(result).toBe("black");
	});
});

describe("getRelativeLuminance", () => {
	// Precision might be needed due to floating point calculations
	const precision = 0.0001;

	it("should return correct luminance for colors with channels below 0.03928", () => {
		// Example: dark grayish blue
		expect(getRelativeLuminance([10, 10, 40])).toBeCloseTo(0.0057, precision);
	});

	it("should return correct luminance for colors with channels above 0.03928", () => {
		// Example: light grayish yellow
		expect(getRelativeLuminance([220, 220, 180])).toBeCloseTo(0.7395, precision);
	});

	it("should return correct luminance for mixed colors", () => {
		// Example: medium aqua
		expect(getRelativeLuminance([0, 123, 167])).toBeCloseTo(0.1807, precision);
	});

	it("should handle edge cases", () => {
		expect(getRelativeLuminance([255, 255, 255])).toBeCloseTo(1, precision); // Pure white
		expect(getRelativeLuminance([0, 0, 0])).toBeCloseTo(0, precision); // Pure black
	});
});

describe("hexToRGB", () => {
	it("should correctly convert shorthand HEX to RGB", () => {
		expect(hexToRGB("#123")).toEqual([17, 34, 51]);
	});

	it("should correctly convert regular HEX to RGB", () => {
		expect(hexToRGB("#112233")).toEqual([17, 34, 51]);
	});

	it("should handle mixed case HEX values", () => {
		expect(hexToRGB("#AaBbCc")).toEqual([170, 187, 204]);
	});

	it("should throw error for invalid HEX", () => {
		expect(() => hexToRGB("#GGG")).toThrow("Invalid HEX color.");
		expect(() => hexToRGB("invalid")).toThrow("Invalid HEX color.");
	});

	it("should handle HEX values without the leading #", () => {
		expect(hexToRGB("AABBCC")).toEqual([170, 187, 204]);
	});
});

describe("getContrast", () => {
	it("should calculate correct contrast and meet AA standards", () => {
		const result = getContrast("#ffffff", "#767676");
		expect(result.contrast).toBeCloseTo(4.54, 2);
		expect(result.aa).toBeTruthy();
		expect(result.aaa).toBeFalsy();
	});

	it("should calculate correct contrast and meet AAA standards", () => {
		const result = getContrast("#ffffff", "#595959");
		expect(result.contrast).toBeCloseTo(7, 2);
		expect(result.aa).toBeTruthy();
		expect(result.aaa).toBeTruthy();
	});

	it("should calculate correct contrast and not meet any standard", () => {
		const result = getContrast("#ffffff", "#a1a1a1");
		expect(result.contrast).toBeCloseTo(2.58, 2);
		expect(result.aa).toBeFalsy();
		expect(result.aaa).toBeFalsy();
	});

	it("should return same result regardless of order", () => {
		const result1 = getContrast("#ffffff", "#595959");
		const result2 = getContrast("#595959", "#ffffff");
		expect(result1).toEqual(result2);
	});
});
