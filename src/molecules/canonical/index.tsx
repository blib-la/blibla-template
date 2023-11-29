import Head from "next/head";
import { useRouter } from "next/router";

import { getRawAsPath } from "@/ions/router/path";

export function Canonical() {
	const { locales, defaultLocale, asPath } = useRouter();
	const rawAsPath = getRawAsPath(asPath, locales);
	const urlPath = rawAsPath === "/" ? "" : rawAsPath;
	return (
		<Head>
			<link rel="canonical" href={`https://${process.env.NEXT_PUBLIC_DOMAIN}${urlPath}`} />
			{locales?.map(locale => (
				<link
					key={locale}
					rel="alternate"
					hrefLang={locale === defaultLocale ? "x-default" : locale}
					href={
						locale === defaultLocale
							? `https://${process.env.NEXT_PUBLIC_DOMAIN}${urlPath}`
							: `https://${process.env.NEXT_PUBLIC_DOMAIN}/${locale}${urlPath}`
					}
				/>
			))}
		</Head>
	);
}
