import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import IconButton from "@mui/joy/IconButton";
import type { SheetProps } from "@mui/joy/Sheet";
import Sheet from "@mui/joy/Sheet";
import Stack from "@mui/joy/Stack";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useTranslation } from "next-i18next";

import { Logo } from "@/atoms/logo";
import { Link } from "@/atoms/nav-link";
import { ColorModeSelector } from "@/organisms/color-mode-selector";
import { HEADER_HEIGHT } from "@/organisms/header/constants";

export function Header(properties: SheetProps) {
	const { t } = useTranslation(["common", "button"]);
	const { data: session } = useSession();
	const { push, locale } = useRouter();

	return (
		<Sheet
			component="header"
			data-testid="main-header"
			{...properties}
			sx={theme => ({
				height: HEADER_HEIGHT,
				position: "sticky",
				zIndex: theme.vars.zIndex.popup,
				top: 0,
				px: 2,
				py: 1,
				display: "grid",
				gridTemplateColumns: "36px auto 36px",
				alignItems: "center",
			})}
		>
			<Link
				color="primary"
				href="/"
				aria-label={t("common:navigation.home")}
				data-testid="app-logo"
			>
				<Logo />
			</Link>
			<Stack data-testid="login-form" direction="row" justifyContent="center">
				<ColorModeSelector />
			</Stack>
			<div data-testid="login-form">
				{session ? (
					<IconButton
						aria-label={t("button:signOut")}
						onClick={async () => {
							await push("/auth/sign-out", undefined, { locale });
						}}
					>
						<LogoutIcon />
					</IconButton>
				) : (
					<IconButton
						aria-label={t("button:signIn")}
						onClick={async () => {
							await push("/auth/sign-in", undefined, { locale });
						}}
					>
						<LoginIcon />
					</IconButton>
				)}
			</div>
		</Sheet>
	);
}
