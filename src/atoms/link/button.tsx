import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Button from "@mui/joy/Button";
import type { ButtonProps } from "@mui/joy/Button";
import type { SxProps } from "@mui/joy/styles/types";
import type { LinkProps } from "next/link";
import Link from "next/link";
import type { ReactNode } from "react";

export function LinkButton({
	children,
	sx,
	href,
	...properties
}: { children?: ReactNode; sx?: SxProps; href: LinkProps["href"]; target?: string } & ButtonProps) {
	return (
		<Link legacyBehavior passHref href={href}>
			<Button
				component="a"
				variant="plain"
				sx={sx}
				endDecorator={<ArrowForwardIcon />}
				{...properties}
			>
				{children}
			</Button>
		</Link>
	);
}
