import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import type { LinkProps } from "@mui/joy/Link";
import JoyLink from "@mui/joy/Link";
import type { ListItemButtonProps } from "@mui/joy/ListItemButton";
import ListItemButton from "@mui/joy/ListItemButton";
import ListItemContent from "@mui/joy/ListItemContent";
import NextLink from "next/link";
import { useRouter } from "next/router";

import { getRawAsPath } from "@/ions/router/path";

export function NavLink({
	children,
	href,
	color = "neutral",
	locale: outerLocale,
	disableHighlight,
	...properties
}: LinkProps & { disableHighlight?: boolean; locale?: string }) {
	const { locale, locales, asPath } = useRouter();
	const rawAsPath = getRawAsPath(asPath, locales);
	const isActive = rawAsPath === href;
	const isExternal = href?.startsWith("http");

	return (
		<NextLink
			legacyBehavior
			passHref
			locale={isExternal ? undefined : outerLocale ?? locale}
			href={href!}
		>
			<JoyLink
				color={color}
				target={isExternal ? "_blank" : undefined}
				rel={isExternal ? "noindex nofollow" : undefined}
				variant={isActive && !disableHighlight ? "soft" : undefined}
				endDecorator={isExternal ? <ArrowOutwardIcon /> : undefined}
				{...properties}
			>
				{children}
			</JoyLink>
		</NextLink>
	);
}

export function ListItemLink({
	children,
	href,
	target,
	color = "neutral",
	locale: outerLocale,
	disableHighlight,
	...properties
}: ListItemButtonProps & {
	disableHighlight?: boolean;
	locale?: string;
	href: string;
	target?: string;
}) {
	const { locale, locales, asPath } = useRouter();
	const rawAsPath = getRawAsPath(asPath, locales);
	const isActive = rawAsPath === href;
	const isExternal = href?.startsWith("http");

	return (
		<NextLink legacyBehavior passHref locale={outerLocale ?? locale} href={href!}>
			<ListItemButton
				component="a"
				color={color}
				target={isExternal ? "_blank" : target}
				rel={isExternal ? "noindex nofollow" : undefined}
				variant={isActive && !disableHighlight ? "soft" : undefined}
				{...properties}
			>
				<ListItemContent>{children}</ListItemContent>
				{isExternal && <ArrowOutwardIcon />}
			</ListItemButton>
		</NextLink>
	);
}

export function ResponsiveNavlink({
	children,
	sx,
	...properties
}: LinkProps & { locale?: string }) {
	return (
		<NavLink
			disableHighlight
			{...properties}
			sx={{
				...sx,
				width: { xs: "100%", sm: "auto" },
				justifyContent: { xs: "center", sm: "unset" },
			}}
		>
			{children}
		</NavLink>
	);
}

export function Link({ children, href, ...properties }: LinkProps & { href: string }) {
	return (
		<NextLink legacyBehavior passHref href={href}>
			<JoyLink {...properties}>{children}</JoyLink>
		</NextLink>
	);
}
