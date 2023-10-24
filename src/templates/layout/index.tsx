import type { BoxProps } from "@mui/joy/Box";
import React from "react";

import { BaseLayout } from "@/templates/layout/base";
import { StyledContainer } from "@/templates/layout/styled";
import type { LayoutProperties } from "@/templates/layout/types";

export function Layout({
	children,
	description,
	noIndex,
	sx,
	title,
}: LayoutProperties & Pick<BoxProps, "sx">) {
	return (
		<BaseLayout noIndex={noIndex} title={title} description={description}>
			<StyledContainer sx={sx}>{children}</StyledContainer>
		</BaseLayout>
	);
}
