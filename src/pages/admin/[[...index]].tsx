import { Role } from "@prisma/client";
import type { GetServerSidePropsContext } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { getToken } from "next-auth/jwt";
import { useSession } from "next-auth/react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { NextStudio } from "next-sanity/studio";
import { metadata } from "next-sanity/studio/metadata";

import config from "~/sanity.config";

export default function StudioPage() {
	const { replace } = useRouter();
	const { data: session } = useSession({
		required: true,
		async onUnauthenticated() {
			await replace("/auth/sign-in");
		},
	});
	return (
		session && (
			<>
				<Head>
					{Object.entries(metadata).map(([key, value]) => (
						<meta key={key} name={key} content={value} />
					))}
				</Head>
				<NextStudio unstable_globalStyles config={config} />
			</>
		)
	);
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const token = await getToken({ req: context.req });

	if (!token || token.role !== Role.ADMIN) {
		return {
			redirect: {
				destination: "/auth/sign-in",
				permanent: false,
			},
		};
	}

	return {
		props: {
			...(await serverSideTranslations(context.locale ?? "en")),
		},
	};
}
