import type { GetStaticPropsContext, InferGetStaticPropsType } from "next";

import { getStaticProperties } from "@/ions/ssr/get-properties";
import { TemplateSwitch } from "@/templates/switch";
import { getClient } from "~/sanity/lib/client";
import { getPage } from "~/sanity/lib/get";
import type { PageDocument as PageType } from "~/sanity/lib/types";

export default function Page({ page }: InferGetStaticPropsType<typeof getStaticProps>) {
	return <TemplateSwitch page={page} />;
}

export async function getStaticProps(
	context: GetStaticPropsContext<
		Record<string, string>,
		{
			page?: PageType;
		}
	>
) {
	const client = getClient();
	const page = await getPage(client, "home", context.locale!);
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
