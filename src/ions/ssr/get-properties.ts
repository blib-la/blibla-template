import type { GetServerSidePropsContext, GetStaticPropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import index18Next from "../../../next-i18next.config";

import { uniqueArray } from "@/ions/utils/array";
import { getClient } from "~/sanity/lib/client";
import { getAddress, getNavigation } from "~/sanity/lib/get";

const { defaultLocale } = index18Next.i18n;

export async function getStaticProperties(
	{ locale = defaultLocale }: GetStaticPropsContext,
	namespaces: string[] = []
) {
	const client = getClient();
	const legal = await getNavigation(client, "legal", locale!);
	const company = await getNavigation(client, "company", locale!);
	const address = await getAddress(client, "contact");

	return {
		props: {
			...(await serverSideTranslations(
				locale,
				uniqueArray(["common", "button", ...namespaces])
			)),
			address,
			navigation: {
				legal: legal ?? [],
				company: company ?? [],
			},
		},
	};
}

export async function getServerSideProperties(
	{ locale = defaultLocale }: GetServerSidePropsContext,
	namespaces: string[] = []
) {
	const client = getClient();
	const legal = await getNavigation(client, "legal", locale!);
	const company = await getNavigation(client, "company", locale!);
	const address = await getAddress(client, "contact");
	return {
		props: {
			...(await serverSideTranslations(
				locale,
				uniqueArray(["common", "button", ...namespaces])
			)),
			address,
			navigation: {
				legal: legal ?? [],
				company: company ?? [],
			},
		},
	};
}
