import path from "node:path";

import { globby } from "globby";
import type { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import type { GetStaticPathsContext } from "next";

import { getStaticProperties } from "@/ions/ssr/get-properties";
import { TemplateSwitch } from "@/templates/switch";
import { getClient } from "~/sanity/lib/client";
import { getPage } from "~/sanity/lib/get";
import { pageRoutesQuery } from "~/sanity/lib/queries";
import type { PageDocument as PageType } from "~/sanity/lib/types";

export default function Page({ page }: InferGetStaticPropsType<typeof getStaticProps>) {
	return <TemplateSwitch page={page} />;
}

export async function getStaticProps(
	context: GetStaticPropsContext<
		{ route: string[] },
		{
			page?: PageType;
		}
	>
) {
	const client = getClient();
	const page = await getPage(client, context.params!.route.join("/"), context.locale!);
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

export async function getStaticPaths(context: GetStaticPathsContext) {
	const client = getClient();
	const routes = await client.fetch<string[]>(pageRoutesQuery);
	const mdxFiles = await globby(`src/pages/**/index.mdx`);
	const mdxRoutes = mdxFiles.map(filePath => {
		const relativePath = path.relative("src/pages", filePath).replaceAll("\\", "/");
		return path.dirname(relativePath);
	});
	const paths =
		routes
			?.filter(route => !["home", ...mdxRoutes].includes(route))
			.flatMap(
				route =>
					context.locales?.map(locale => ({
						locale,
						params: { route: route.split("/") },
					}))
			) || [];

	return {
		paths,
		fallback: "blocking",
	};
}
