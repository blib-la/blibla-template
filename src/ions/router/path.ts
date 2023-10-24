export function getRawAsPath(asPath: string, locales?: string[]): string {
	if (!locales || locales.length === 0) {
		return asPath;
	}

	const regex = new RegExp(`/(${locales.join("|")})$`);
	return asPath.replace(regex, "");
}
