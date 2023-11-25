import Alert from "@mui/joy/Alert";
import Grid from "@mui/joy/Grid";
import type { Profile } from "@prisma/client";
import type { GetStaticPropsContext } from "next";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useTranslation } from "next-i18next";
import useSWR from "swr";

import { getStaticProperties } from "@/ions/ssr/get-properties";
import { BioCard } from "@/organisms/bio-card";
import { Layout } from "@/organisms/layout";

export default function Page() {
	const { replace } = useRouter();
	const { t } = useTranslation(["common"]);
	const { data: session, status } = useSession({
		required: true,
		async onUnauthenticated() {
			await replace("/auth/sign-in");
		},
	});
	const { data, error, isLoading } = useSWR<Profile>("/api/user/profile");

	return (
		session && (
			<Layout seo={{ noIndex: true, title: t("common:navigation.profile") }}>
				{error && <Alert color="danger">{error.message}</Alert>}
				<Grid container columns={{ xs: 1, sm: 2, lg: 3 }} spacing={2}>
					<Grid xs={1}>
						{data && (
							<BioCard
								loading={isLoading || status !== "authenticated"}
								image={data.image ?? undefined}
								bio={data.bio ?? undefined}
								name={data.name ?? undefined}
								language={data.language}
								plan={session.user.plan!}
							/>
						)}
					</Grid>
				</Grid>
			</Layout>
		)
	);
}

export async function getStaticProps(context: GetStaticPropsContext) {
	return getStaticProperties(context, ["form", "profile"]);
}
