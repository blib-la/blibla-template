import type { GetServerSidePropsContext, GetStaticPropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import index18Next from "../../../next-i18next.config";

import { uniqueArray } from "@/ions/utils/array";

const { defaultLocale } = index18Next.i18n;
export async function getStaticProperties(
	{ locale = defaultLocale }: GetStaticPropsContext,
	namespaces: string[] = []
) {
	return {
		props: {
			...(await serverSideTranslations(
				locale,
				uniqueArray(["common", "button", ...namespaces])
			)),
		},
	};
}

export async function getServerSideProperties(
	{ locale = defaultLocale }: GetServerSidePropsContext,
	namespaces: string[] = []
) {
	return {
		props: {
			...(await serverSideTranslations(
				locale,
				uniqueArray(["common", "button", ...namespaces])
			)),
		},
	};
}
