import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Grid from "@mui/joy/Grid";
import Typography from "@mui/joy/Typography";
import type { GetStaticPropsContext, InferGetStaticPropsType } from "next";

import { NavLink } from "@/atoms/nav-link";
import { getStaticProperties } from "@/ions/ssr/get-properties";
import { Layout } from "@/templates/layout";
import { getClient } from "~/sanity/lib/client";
import { getPosts } from "~/sanity/lib/get";

export default function Page({ posts }: InferGetStaticPropsType<typeof getStaticProps>) {
	return (
		<Layout>
			<Grid container spacing={2} columns={{ xs: 1, md: 2 }}>
				{posts.map(post => (
					<Grid key={post._id} xs={1}>
						<Card>
							<CardContent>
								<NavLink href={`/blog/${post.slug.current}`}>{post.title}</NavLink>
								<Typography>{post.excerpt}</Typography>
							</CardContent>
						</Card>
					</Grid>
				))}
			</Grid>
		</Layout>
	);
}

export async function getStaticProps(context: GetStaticPropsContext) {
	const client = getClient();
	const posts = await getPosts(client);
	const { props } = await getStaticProperties(context);
	return {
		props: {
			...props,
			posts,
		},
	};
}
