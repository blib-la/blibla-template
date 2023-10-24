import type { SheetProps } from "@mui/joy/Sheet";
import Sheet from "@mui/joy/Sheet";
import { useTranslation } from "next-i18next";

import { Logo } from "@/atoms/logo";
import { Link } from "@/atoms/nav-link";
import { ColorModeSelector } from "@/organisms/color-mode-selector";
import { HEADER_HEIGHT } from "@/organisms/header/constants";

export function Header(properties: SheetProps) {
	const { t } = useTranslation(["common"]);

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
				display: "flex",
				justifyContent: "space-between",
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
			<ColorModeSelector />
		</Sheet>
	);
}
