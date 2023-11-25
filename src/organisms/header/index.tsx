import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/joy/Container";
import Drawer from "@mui/joy/Drawer";
import IconButton from "@mui/joy/IconButton";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemButton from "@mui/joy/ListItemButton";
import type { SheetProps } from "@mui/joy/Sheet";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import NextLink from "next/link";
import { useTranslation } from "next-i18next";
import { useState } from "react";

import { StyledNav } from "./styled";

import { Link, NavLink } from "@/atoms/link";
import { Logo } from "@/atoms/logo";
import { useNavigationContext } from "@/ions/contexts/navigation";
import { Box } from "@/molecules/box";
import { HEADER_HEIGHT } from "@/organisms/header/constants";
import { MultiLevelNavigation } from "@/organisms/navigation";
export function Header(properties: SheetProps) {
	const { t } = useTranslation(["common", "button"]);
	const navigation = useNavigationContext();
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
			})}
		>
			<Container sx={{ px: { xs: 0, md: 0, lg: 0 } }}>
				<Box
					sx={{
						display: "grid",
						gridTemplateColumns: "36px auto 36px",
						gap: 2,
						alignItems: "center",
					}}
				>
					<Link
						color="primary"
						href="/"
						aria-label={t("common:navigation.home")}
						data-testid="app-logo"
						sx={{
							display: "inline-flex",
							height: 36,
							width: 36,
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<Logo />
					</Link>
					<Typography sx={{ display: { xs: "block", md: "none" }, textAlign: "center" }}>
						Blibla
					</Typography>
					<StyledNav sx={{ display: { xs: "none", md: "flex" }, alignSelf: "stretch" }}>
						{navigation.header.map(link =>
							link.children ? (
								<MultiLevelNavigation key={link.href} navigation={link} />
							) : (
								<NavLink
									key={link.href}
									disableHighlight
									href={link.href}
									data-testid="company-link"
									sx={{ flex: 1 }}
								>
									{link.label}
								</NavLink>
							)
						)}
					</StyledNav>

					<IconButton
						aria-label={t("button:menu")}
						sx={{ display: { md: "none" } }}
						onClick={() => {
							setMobileMenuOpen(true);
						}}
					>
						<MenuIcon />
					</IconButton>
					<Drawer
						open={mobileMenuOpen}
						anchor="right"
						sx={{ display: { md: "none" } }}
						onClose={() => {
							setMobileMenuOpen(false);
						}}
					>
						<List
							sx={{ "--List-nestedInsetStart": "1rem" }}
							onClick={() => {
								setMobileMenuOpen(false);
							}}
						>
							{navigation.header.map(link =>
								link.children ? (
									<ListItem key={link.href} nested>
										<NextLink passHref legacyBehavior href={link.href}>
											<ListItemButton
												component="a"
												sx={{ textDecoration: "none" }}
											>
												{link.label}
											</ListItemButton>
										</NextLink>
										<List>
											{link.children.map(child => (
												<ListItem key={child.href}>
													<NextLink
														passHref
														legacyBehavior
														href={child.href}
													>
														<ListItemButton
															component="a"
															sx={{ textDecoration: "none" }}
														>
															{child.label}
														</ListItemButton>
													</NextLink>
												</ListItem>
											))}
										</List>
									</ListItem>
								) : (
									<ListItem key={link.href}>
										<NextLink passHref legacyBehavior href={link.href}>
											<ListItemButton
												component="a"
												sx={{ textDecoration: "none" }}
											>
												{link.label}
											</ListItemButton>
										</NextLink>
									</ListItem>
								)
							)}
						</List>
					</Drawer>
				</Box>
			</Container>
		</Sheet>
	);
}
