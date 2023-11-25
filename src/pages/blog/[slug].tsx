import AspectRatio from "@mui/joy/AspectRatio";
import Typography from "@mui/joy/Typography";
import dayjs from "dayjs";
import type { GetStaticPathsContext, GetStaticPropsContext, InferGetStaticPropsType } from "next";

import { getStaticProperties } from "@/ions/ssr/get-properties";
import { Box } from "@/molecules/box";
import { SanityNextImage } from "@/molecules/image";
import { Layout } from "@/organisms/layout";
import { RichTextBlock } from "@/organisms/rich-text";
import { getClient } from "~/sanity/lib/client";
import { getPost } from "~/sanity/lib/get";
import { postSlugsQuery } from "~/sanity/lib/queries";

export default function Page({ post }: InferGetStaticPropsType<typeof getStaticProps>) {
	return (
		<Layout seo={post.seo}>
			<Typography level="h1">{post.headline}</Typography>
			<Typography level="body-sm">{dayjs(post._createdAt).format("MMMM D, YYYY")}</Typography>
			<AspectRatio ratio={16 / 9} sx={{ mt: 4 }}>
				<SanityNextImage priority quality={100} image={post.mainImage} />
			</AspectRatio>
			<Box sx={{ mx: { md: 10, lg: 20 }, py: { xs: 4, md: 12, lg: 20 } }}>
				<RichTextBlock value={post.body} />
			</Box>
		</Layout>
	);
}

export async function getStaticProps(context: GetStaticPropsContext) {
	const client = getClient();
	const post = await getPost(client, context.params!.slug as string, context.locale!);

	if (!post) {
		return {
			notFound: true,
		};
	}

	const { props: translated } = await getStaticProperties(context);

	return {
		props: {
			post,
			...translated,
		},
	};
}

export async function getStaticPaths(context: GetStaticPathsContext) {
	const client = getClient();
	const slugs = await client.fetch<string[]>(postSlugsQuery);
	const paths =
		slugs?.flatMap(slug => context.locales?.map(locale => ({ locale, params: { slug } }))) ||
		[];

	return {
		paths,
		fallback: "blocking",
	};
}
