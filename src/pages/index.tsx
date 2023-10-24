import Button from "@mui/joy/Button";
import Sheet from "@mui/joy/Sheet";
import type { GetStaticPropsContext } from "next";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useTranslation } from "next-i18next";

import { getStaticProperties } from "@/ions/ssr/get-properties";
import { Layout } from "@/templates/layout";

export default function Page() {
	const { t } = useTranslation(["button"]);
	const { data: session } = useSession();
	const { push, locale } = useRouter();

	return (
		<Layout
			title="Next.js PWA Template - Build Fast Progressive Web Apps"
			description="Harness the power of our Next.js full-stack template to create responsive, fast-loading, and reliable Progressive Web Apps, optimized for performance."
		>
			<Sheet data-testid="login-form">
				{session ? (
					<Button
						onClick={async () => {
							await push("/auth/sign-out", undefined, { locale });
						}}
					>
						{t("button:signOut")}
					</Button>
				) : (
					<Button
						onClick={async () => {
							await push("/auth/sign-in", undefined, { locale });
						}}
					>
						{t("button:signIn")}
					</Button>
				)}
			</Sheet>
		</Layout>
	);
}

export async function getStaticProps(context: GetStaticPropsContext) {
	return getStaticProperties(context);
}
