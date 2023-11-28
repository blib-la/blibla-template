import dayjs from "dayjs";
import type { GetServerSidePropsContext, GetStaticPropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import index18Next from "../../../next-i18next.config";

import { uniqueArray } from "@/ions/utils/array";
import { getClient } from "~/sanity/lib/client";
import { getAddress, getNavigation } from "~/sanity/lib/get";
import "@/ions/date";

const { defaultLocale } = index18Next.i18n;

export async function getStaticProperties(
	{ locale = defaultLocale }: GetStaticPropsContext,
	namespaces: string[] = []
) {
	dayjs.locale(locale!);
	const client = getClient();
	const header = await getNavigation(client, "header", locale!);
	const legal = await getNavigation(client, "legal", locale!);
	const company = await getNavigation(client, "company", locale!);
	const community = await getNavigation(client, "community", locale!);
	const cookieBanner = await getNavigation(client, "cookie-banner", locale!);
	const address = await getAddress(client, "contact");

	return {
		props: {
			...(await serverSideTranslations(
				locale,
				uniqueArray(["common", "button", ...namespaces])
			)),
			address,
			navigation: {
				header: header ?? [],
				legal: legal ?? [],
				company: company ?? [],
				community: community ?? [],
				cookieBanner: cookieBanner ?? [],
			},
		},
	};
}

export async function getServerSideProperties(
	{ locale = defaultLocale }: GetServerSidePropsContext,
	namespaces: string[] = []
) {
	dayjs.locale(locale!);
	const client = getClient();
	const header = await getNavigation(client, "header", locale!);
	const legal = await getNavigation(client, "legal", locale!);
	const company = await getNavigation(client, "company", locale!);
	const community = await getNavigation(client, "community", locale!);
	const cookieBanner = await getNavigation(client, "cookie-banner", locale!);
	const address = await getAddress(client, "contact");
	return {
		props: {
			...(await serverSideTranslations(
				locale,
				uniqueArray(["common", "button", ...namespaces])
			)),
			address,
			navigation: {
				header: header ?? [],
				legal: legal ?? [],
				company: company ?? [],
				community: community ?? [],
				cookieBanner: cookieBanner ?? [],
			},
		},
	};
}
