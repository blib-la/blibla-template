import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Button from "@mui/joy/Button";
import Grid from "@mui/joy/Grid";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import type { GetStaticPropsContext } from "next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";
import { useTranslation } from "next-i18next";

import { getStaticProperties } from "@/ions/ssr/get-properties";
import { Layout } from "@/organisms/layout";

const LottiePlayer = dynamic(
	() => import("@/atoms/lottie-player").then(module_ => module_.LottiePlayer),
	{ ssr: false }
);

export default function Page() {
	const { back, locale, defaultLocale } = useRouter();
	const { t } = useTranslation(["button"]);

	return (
		<Layout
			seo={{ noIndex: true, title: t("auth:titles.signOut") }}
			sx={{ justifyContent: "center" }}
		>
			<Grid container data-testid="auth-sign-out" spacing={2} columns={{ xs: 1, md: 2 }}>
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
					<Typography level="h1">{t("auth:goodBye")}</Typography>
					<Stack direction="row" spacing={1}>
						<Button
							variant="plain"
							color="neutral"
							startDecorator={<ArrowBackIcon />}
							onClick={async () => {
								back();
							}}
						>
							{t("button:cancel")}
						</Button>
						<Button
							onClick={async () => {
								await signOut({
									callbackUrl: locale === defaultLocale ? "/" : `/${locale}`,
								});
							}}
						>
							{t("button:signOut")}
						</Button>
					</Stack>
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
