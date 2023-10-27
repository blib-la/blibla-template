import Grid from "@mui/joy/Grid";
import Typography from "@mui/joy/Typography";
import type { GetStaticPropsContext } from "next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

import { getStaticProperties } from "@/ions/ssr/get-properties";
import { SocialLogin } from "@/organisms/social-login";
import { Layout } from "@/templates/layout";

const LottiePlayer = dynamic(
	() => import("@/atoms/lottie-player").then(module_ => module_.LottiePlayer),
	{ ssr: false }
);

export default function Page() {
	const { t } = useTranslation(["auth", "button"]);
	const { query } = useRouter();
	return (
		<Layout sx={{ justifyContent: "center" }}>
			<Grid container data-testid="auth-sign-in" spacing={2} columns={{ xs: 1, md: 2 }}>
				<Grid
					xs={1}
					sx={{
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
						alignItems: "center",
						alignContent: "center",
						textAlign: "center",
						gap: 2,
					}}
				>
					{query.error && <Typography>{t(`auth:errors.${query.error}`)}</Typography>}

					<SocialLogin />
				</Grid>
				<Grid xs={1}>
					<LottiePlayer src="/lottie/locked/data.json" />
				</Grid>
			</Grid>
		</Layout>
	);
}

export async function getStaticProps(context: GetStaticPropsContext) {
	return getStaticProperties(context, ["auth"]);
}
