import Head from "next/head";
import React from "react";

import { OpenGraph } from "@/molecules/open-graph";
import { Footer } from "@/organisms/footer";
import { Header } from "@/organisms/header";
import type { LayoutProperties } from "@/organisms/layout/types";
import { urlForImage } from "~/sanity/lib/image";

export function BaseLayout({
	children,
	seo: { title, description, noIndex, ogImage, ogTitle, ogDescription },
}: LayoutProperties) {
	return (
		<>
			<Head>
				{title && <title>{`Blibla | ${title}`}</title>}
				{description && <meta name="description" content={description} />}
			</Head>
			{noIndex && (
				<Head>
					<meta name="robots" content="noindex, nofollow" />
					<meta name="referrer" content="no-referrer" />
				</Head>
			)}
			<Head>
				{title && <title>{`Blibla | ${title}`}</title>}
				{description && <meta name="description" content={description} />}
			</Head>
			<OpenGraph
				image={ogImage && urlForImage(ogImage)?.url()}
				title={`Blibla | ${ogTitle ?? title}`}
				description={ogDescription ?? description}
			/>
			<Header />
			<main>{children}</main>
			<Footer />
		</>
	);
}
