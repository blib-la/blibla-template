import Typography from "@mui/joy/Typography";
import type { GetStaticPropsContext, InferGetStaticPropsType } from "next";

import { getStaticProperties } from "@/ions/ssr/get-properties";
import { getValueFromArray } from "@/ions/utils/array";
import { RichText } from "@/organisms/rich-text";
import { Layout } from "@/templates/layout";
import { getClient } from "~/sanity/lib/client";
import { getPage } from "~/sanity/lib/get";

export default function Page({ page }: InferGetStaticPropsType<typeof getStaticProps>) {
	const seo = getValueFromArray(page?.seo);
	const headline = getValueFromArray(page?.headline);
	const body = getValueFromArray(page?.body);

	return (
		<Layout noIndex={seo?.noIndex} title={seo?.title} description={seo?.description}>
			{headline && <Typography level="h1">{headline}</Typography>}
			{body && <RichText value={body} />}
		</Layout>
	);
}

export async function getStaticProps(context: GetStaticPropsContext) {
	const page = await getPage(getClient(), "about", context.locale!);

	const { props: translated } = await getStaticProperties(context);

	return {
		props: {
			...translated,
			page,
		},
	};
}
