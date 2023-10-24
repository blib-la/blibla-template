import Head from "next/head";
import React, { useEffect } from "react";

import { Canonical } from "@/molecules/canonical";
import { OpenGraph } from "@/molecules/open-graph";
import { Footer } from "@/organisms/footer";
import { Header } from "@/organisms/header";
import type { LayoutProperties } from "@/templates/layout/types";

export function BaseLayout({ children, title, description, noIndex }: LayoutProperties) {
	useEffect(() => {
		if (noIndex) {
			return;
		}

		if (title && title.length > 60) {
			console.warn("Page Title is too long");
		}

		if (title && title.length < 30) {
			console.warn("Page Title is too short");
		}
	}, [title, noIndex]);
	useEffect(() => {
		if (noIndex) {
			return;
		}

		if (description && description.length > 160) {
			console.warn("Meta Description is too long");
		}

		if (description && description.length < 140) {
			console.warn("Meta Description is too short");
		}
	}, [description, noIndex]);

	return (
		<>
			{noIndex ? (
				<Head>
					<meta name="robots" content="noindex, nofollow" />
					<meta name="referrer" content="no-referrer" />
				</Head>
			) : (
				<>
					<OpenGraph title={title} description={description} />
					<Canonical />
				</>
			)}
			<Head>
				{title && <title>{title}</title>}
				{description && <meta name="description" content={description} />}
			</Head>
			<Header />
			<main>{children}</main>
			<Footer />
		</>
	);
}
