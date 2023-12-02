import JoyLink from "@mui/joy/Link";
import Typography from "@mui/joy/Typography";
import type { PortableTextComponents, PortableTextProps } from "@portabletext/react";
import { PortableText } from "@portabletext/react";
import type { Image as SanityImage } from "@sanity/types/src";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";

import { Box } from "@/molecules/box";
import { SanityNextImage } from "@/molecules/image";
import { getImageSize } from "~/sanity/lib/image";

export interface ComponentProperties {
	children?: ReactNode;
}

export const components: PortableTextComponents = {
	types: {
		image({ value }: { value: SanityImage }) {
			const { width, height } = getImageSize(value.asset!._ref);

			return (
				<Box
					as="figure"
					sx={{
						float: { sm: value.float as CSSProperties["float"] },
						width: { xs: "100%", sm: value.float === "none" ? undefined : "50%" },
						mr: { xs: 0, sm: value.float === "left" ? 2 : 0 },
						ml: { xs: 0, sm: value.float === "right" ? 2 : 0 },
						my: { sm: 1 },
					}}
				>
					<SanityNextImage
						alt={(value.alt as string) ?? ""}
						fill={false}
						height={height}
						width={width}
						image={value}
					/>
					{Boolean(value.caption) && (
						<Typography
							component="figcaption"
							level="body-xs"
							variant="soft"
							sx={{ p: 2 }}
						>
							{value.caption as string}
						</Typography>
					)}
				</Box>
			);
		},
	},
	list: {
		bullet: ({ children }: ComponentProperties) => (
			<Typography component="ul" my={1}>
				{children}
			</Typography>
		),
		number: ({ children }: ComponentProperties) => (
			<Typography component="ol" my={1}>
				{children}
			</Typography>
		),
	},
	listItem: {
		bullet: ({ children }: ComponentProperties) => (
			<Typography component="li" sx={{ display: "list-item" }}>
				{children}
			</Typography>
		),
		number: ({ children }: ComponentProperties) => (
			<Typography component="li" sx={{ display: "list-item" }}>
				{children}
			</Typography>
		),
	},
	marks: {
		em: ({ children }) => <Typography component="em">{children}</Typography>,
		strong: ({ children }) => <Typography component="strong">{children}</Typography>,
		link({ value, children }) {
			const target = (value?.href || "").startsWith("http") ? "_blank" : undefined;
			return (
				<Link legacyBehavior passHref href={value?.href}>
					<JoyLink
						target={target}
						underline="always"
						rel={target === "_blank" ? "noindex nofollow" : undefined}
					>
						{children}
					</JoyLink>
				</Link>
			);
		},
	},
	block: {
		h1: ({ children }: ComponentProperties) => (
			<Typography level="h1" component="h1" my={2}>
				{children}
			</Typography>
		),
		h2: ({ children }: ComponentProperties) => (
			<Typography level="h2" component="h2" my={2}>
				{children}
			</Typography>
		),
		h3: ({ children }: ComponentProperties) => (
			<Typography level="h3" component="h3" my={2}>
				{children}
			</Typography>
		),
		h4: ({ children }: ComponentProperties) => (
			<Typography level="h4" component="h4" my={2}>
				{children}
			</Typography>
		),
		h5: ({ children }: ComponentProperties) => (
			<Typography level="title-md" component="h5" my={2}>
				{children}
			</Typography>
		),
		h6: ({ children }: ComponentProperties) => (
			<Typography level="title-sm" component="h6" my={1}>
				{children}
			</Typography>
		),
		normal: ({ children }: ComponentProperties) => (
			<Typography component="p" my={1}>
				{children}
			</Typography>
		),
	},
};

export function RichTextBlock({ value, ...properties }: PortableTextProps) {
	return (
		<div>
			<PortableText value={value} components={components} {...properties} />
		</div>
	);
}
