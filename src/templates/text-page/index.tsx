import Typography from "@mui/joy/Typography";

import { Layout } from "@/organisms/layout";
import { RichTextBlock } from "@/organisms/rich-text";
import type { TextPage } from "~/sanity/lib/types";

export function TextPageTemplate({ page }: { page: TextPage }) {
	return (
		<Layout seo={page.seo} sx={{ py: { xs: 4, md: 12, lg: 20 } }}>
			<Typography level="h1">{page.headline}</Typography>
			<RichTextBlock value={page.body} />
		</Layout>
	);
}
