import JoyLink from "@mui/joy/Link";
import Typography from "@mui/joy/Typography";
import type { PortableTextComponents, PortableTextProps } from "@portabletext/react";
import { PortableText } from "@portabletext/react";
import Link from "next/link";
import type { ReactNode } from "react";

export interface ComponentProperties {
	children?: ReactNode;
}

export const components: PortableTextComponents = {
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

export function RichText({ value, ...properties }: PortableTextProps) {
	return <PortableText value={value} components={components} {...properties} />;
}
