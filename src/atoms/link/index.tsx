import type { LinkProps } from "@mui/joy/Link";
import JoyLink from "@mui/joy/Link";
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

	return (
		<NextLink legacyBehavior passHref locale={outerLocale ?? locale} href={href!}>
			<JoyLink
				color={color}
				variant={isActive && !disableHighlight ? "soft" : undefined}
				{...properties}
			>
				{children}
			</JoyLink>
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
