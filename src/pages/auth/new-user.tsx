import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Button from "@mui/joy/Button";
import Grid from "@mui/joy/Grid";
import Typography from "@mui/joy/Typography";
import type { GetStaticPropsContext } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useTranslation } from "next-i18next";

import { getStaticProperties } from "@/ions/ssr/get-properties";
import { Layout } from "@/organisms/layout";

const LottiePlayer = dynamic(
	() => import("@/atoms/lottie-player").then(module_ => module_.LottiePlayer),
	{ ssr: false }
);

export default function Page() {
	const { t } = useTranslation(["common", "auth"]);
	return (
		<Layout
			seo={{ noIndex: true, title: t("auth:titles.newUser") }}
			sx={{ justifyContent: "center" }}
		>
			<Grid container data-testid="auth-new-user" spacing={2} columns={{ xs: 1, md: 2 }}>
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
					<Typography level="h1">{t("auth:newUser")}</Typography>
					<Link legacyBehavior passHref href="/">
						<Button component="a" endDecorator={<ArrowForwardIcon />}>
							{t("common:navigation.goHome")}
						</Button>
					</Link>
				</Grid>
				<Grid xs={1}>
					<LottiePlayer src="/lottie/come/data.json" />
				</Grid>
			</Grid>
		</Layout>
	);
}

export async function getStaticProps(context: GetStaticPropsContext) {
	return getStaticProperties(context, ["auth"]);
}
