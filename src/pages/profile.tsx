import Alert from "@mui/joy/Alert";
import Grid from "@mui/joy/Grid";
import type { Profile } from "@prisma/client";
import type { GetStaticPropsContext } from "next";
import { useSession } from "next-auth/react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import useSWR from "swr";

import { BioCard } from "@/organisms/bio-card";
import { Layout } from "@/templates/layout";

export default function Page() {
	const { data: session, status } = useSession();
	const { data, error, isLoading } = useSWR<Profile>("/api/user/profile");

	return (
		session && (
			<Layout>
				{error && <Alert color="danger">{error.message}</Alert>}
				<Grid container columns={{ xs: 1, sm: 2, lg: 3 }} spacing={2}>
					<Grid xs={1}>
						<BioCard
							loading={isLoading || status !== "authenticated"}
							image={data?.image ?? undefined}
							bio={data?.bio ?? undefined}
							name={data?.name ?? undefined}
							language={data?.language}
							plan={session.user.plan!}
						/>
					</Grid>
				</Grid>
			</Layout>
		)
	);
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
	return {
		props: {
			...(await serverSideTranslations(locale ?? "en", [
				"common",
				"button",
				"form",
				"profile",
			])),
		},
	};
}
