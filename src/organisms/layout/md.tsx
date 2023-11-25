import { MDXProvider } from "@mdx-js/react";
import Typography from "@mui/joy/Typography";
import type { ReactNode } from "react";

import { BaseLayout } from "@/organisms/layout/base";
import { StyledContainer } from "@/organisms/layout/styled";
import type { LayoutProperties } from "@/organisms/layout/types";

interface ComponentProperties {
	children?: ReactNode;
}

export const components = {
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
	p: ({ children }: ComponentProperties) => (
		<Typography component="p" my={1}>
			{children}
		</Typography>
	),
	ul: ({ children }: ComponentProperties) => (
		<Typography component="ul" my={1}>
			{children}
		</Typography>
	),
	li: ({ children }: ComponentProperties) => <Typography component="li">{children}</Typography>,
};

export function MDLayout({ children, seo }: LayoutProperties) {
	return (
		<BaseLayout seo={seo}>
			<StyledContainer>
				<MDXProvider components={components}>{children}</MDXProvider>
			</StyledContainer>
		</BaseLayout>
	);
}
