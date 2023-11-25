import type { BoxProps } from "@mui/joy/Box";
import type { ReactNode } from "react";
import React from "react";

import { BaseLayout } from "@/organisms/layout/base";
import { StyledContainer } from "@/organisms/layout/styled";
import type { LayoutProperties } from "@/organisms/layout/types";

export function Layout({
	children,
	seo,
	stage,
	sx,
}: LayoutProperties & { stage?: ReactNode } & Pick<BoxProps, "sx">) {
	return (
		<BaseLayout seo={seo}>
			{stage}
			<StyledContainer sx={sx}>{children}</StyledContainer>
		</BaseLayout>
	);
}
