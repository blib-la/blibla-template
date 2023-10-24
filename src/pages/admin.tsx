import Sheet from "@mui/joy/Sheet";
import type { GetStaticPropsContext } from "next";

import { getStaticProperties } from "@/ions/ssr/get-properties";
import { Layout } from "@/templates/layout";

export default function Page() {
	return (
		<Layout noIndex>
			<Sheet data-testid="login-form">Admin</Sheet>
		</Layout>
	);
}

export async function getStaticProps(context: GetStaticPropsContext) {
	return getStaticProperties(context);
}
