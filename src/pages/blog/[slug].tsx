import Typography from "@mui/joy/Typography";
import type { GetStaticPathsContext, GetStaticPropsContext, InferGetStaticPropsType } from "next";
import Image from "next/image";

import { getStaticProperties } from "@/ions/ssr/get-properties";
import { RichText } from "@/organisms/rich-text";
import { Layout } from "@/templates/layout";
import { getClient } from "~/sanity/lib/client";
import { urlForImage } from "~/sanity/lib/image";
import { getPost, postSlugsQuery } from "~/sanity/lib/queries";

export async function getStaticProps(context: GetStaticPropsContext) {
	const client = getClient();
	const post = await getPost(client, context.params!.slug as string);

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

export default function Page({ post }: InferGetStaticPropsType<typeof getStaticProps>) {
	const source = post.mainImage && urlForImage(post.mainImage)?.url();

	return (
		<Layout>
			<article>
				{source && <Image src={source} height={231} width={367} alt="" />}
				<Typography level="h1">{post.title}</Typography>
				<Typography>{post.excerpt}</Typography>
				<Typography>{post._createdAt}</Typography>
				<RichText value={post.body} />
			</article>
		</Layout>
	);
}

export async function getStaticPaths(context: GetStaticPathsContext) {
	const client = getClient();
	const slugs = await client.fetch<string[]>(postSlugsQuery);
	const paths =
		slugs?.flatMap(slug => context.locales?.map(locale => ({ locale, params: { slug } }))) ||
		[];

	console.log(paths);

	return {
		paths,
		fallback: "blocking",
	};
}
