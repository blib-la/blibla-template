import Typography from "@mui/joy/Typography";
import type { GetStaticPathsContext, GetStaticPropsContext, InferGetStaticPropsType } from "next";

import { getStaticProperties } from "@/ions/ssr/get-properties";
import { getValueFromArray } from "@/ions/utils/array";
import { RichText } from "@/organisms/rich-text";
import { Layout } from "@/templates/layout";
import { getClient } from "~/sanity/lib/client";
import { getPage, pageRouteQuery } from "~/sanity/lib/queries";

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
	const client = getClient();
	const page = await getPage(client, `legal/${context.params!.slug}`, context.locale as string);

	if (!page) {
		return {
			notFound: true,
		};
	}

	const { props: translated } = await getStaticProperties(context);
	return {
		props: {
			...translated,
			page,
		},
	};
}

const route = "legal/";
export async function getStaticPaths({ locales }: GetStaticPathsContext) {
	const client = getClient();
	const routes = await client.fetch<string[]>(pageRouteQuery, { route });

	const paths =
		routes?.flatMap(
			route_ =>
				locales?.map(locale => ({
					params: {
						slug: route_.replace(new RegExp(`^${route}`), ""),
					},
					locale,
				}))
		) ?? [];

	return {
		paths,
		fallback: false,
	};
}
