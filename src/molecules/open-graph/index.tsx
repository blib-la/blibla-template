import Head from "next/head";
import { useRouter } from "next/router";

import { getRawAsPath } from "@/ions/router/path";

interface OpenGraphProperties {
	title?: string;
	description?: string;
}
export function OpenGraph({ title, description }: OpenGraphProperties) {
	const { asPath, locale, defaultLocale, locales } = useRouter();
	const rawAsPath = getRawAsPath(asPath, locales);
	const cleanAsPath = rawAsPath === "/" ? "" : rawAsPath;
	const ogPathname = locale === defaultLocale ? cleanAsPath : `/${locale}${cleanAsPath}`;
	const ogUrl = `https://${process.env.NEXT_PUBLIC_DOMAIN}${ogPathname}`;
	const ogImage = `/api/og/${locale}${cleanAsPath}`;
	return (
		<Head>
			{title && <meta property="og:title" content={title} />}
			{description && <meta property="og:description" content={description} />}
			<meta property="og:url" content={ogUrl} />
			<meta property="og:image" content={ogImage} />
			<meta property="og:type" content="website" />
		</Head>
	);
}
