import Container from "@mui/joy/Container";
import Grid from "@mui/joy/Grid";
import IconButton from "@mui/joy/IconButton";
import Link from "@mui/joy/Link";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import { Role } from "@prisma/client";
import dayjs from "dayjs";
import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";
import { useTranslation } from "next-i18next";

import { ResponsiveNavlink } from "@/atoms/link";
import { useDataContext } from "@/ions/contexts/data";
import { useNavigationContext } from "@/ions/contexts/navigation";
import { Box } from "@/molecules/box";
import { ColorModeSelector } from "@/organisms/color-mode-selector";
import { CookieSettings } from "@/organisms/cookie-banner";
import { StyledInlineNav, StyledNav, StyledSection } from "@/organisms/footer/styled";
import { LanguageSelect } from "@/organisms/language-select";

const GitHubIcon = dynamic(() => import("@/atoms/icons").then(module_ => module_.GitHubIcon));
const HuggingfaceIcon = dynamic(() =>
	import("@/atoms/icons").then(module_ => module_.HuggingfaceIcon)
);
const TwitchIcon = dynamic(() => import("@/atoms/icons").then(module_ => module_.TwitchIcon));
const XIcon = dynamic(() => import("@/atoms/icons").then(module_ => module_.XIcon));
const YouTubeIcon = dynamic(() => import("@/atoms/icons").then(module_ => module_.YouTubeIcon));
const DiscordIcon = dynamic(() => import("@/atoms/icons").then(module_ => module_.DiscordIcon));

export function Footer() {
	const { t } = useTranslation(["common"]);
	const { data: session } = useSession();
	const navigation = useNavigationContext();
	const { address } = useDataContext();

	return (
		<Sheet component="footer" data-testid="main-footer">
			<Container sx={{ py: 4 }}>
				<Grid container columns={{ xs: 1, sm: 2, md: 3, lg: 4 }} spacing={2} sx={{ my: 0 }}>
					<Grid xs={1}>
						<StyledSection data-testid="company-section">
							<Typography level="title-md" component="h2">
								{t("common:company")}
							</Typography>
							<StyledNav>
								<ResponsiveNavlink href="/" data-testid="home-link">
									{t("common:navigation.home")}
								</ResponsiveNavlink>
								{navigation.company.map(link => (
									<ResponsiveNavlink
										key={link.href}
										href={link.href}
										data-testid="company-link"
									>
										{link.label}
									</ResponsiveNavlink>
								))}
							</StyledNav>
						</StyledSection>
					</Grid>
					<Grid xs={1}>
						<StyledSection data-testid="community-section">
							<Typography level="title-md" component="h2">
								{t("common:community")}
							</Typography>
							<StyledNav>
								{navigation.community.map(link => (
									<ResponsiveNavlink
										key={link.href}
										href={link.href}
										data-testid="community-link"
									>
										{link.label}
									</ResponsiveNavlink>
								))}
							</StyledNav>
						</StyledSection>
					</Grid>
					{session?.user.role && (
						<Grid xs={1}>
							<StyledSection
								data-testid={`${session.user.role.toLowerCase()}-section`}
							>
								<Typography level="title-md" component="h2">
									{t("common:user")}
								</Typography>
								<StyledNav>
									<ResponsiveNavlink href="/profile" data-testid="profile-link">
										{t("common:navigation.profile")}
									</ResponsiveNavlink>

									{session.user.role === Role.ADMIN && (
										<ResponsiveNavlink
											href="/admin"
											locale="en"
											target="_blank"
											data-testid="admin-link"
										>
											{t("common:navigation.admin")}
										</ResponsiveNavlink>
									)}
									<ResponsiveNavlink
										href="/auth/sign-out"
										data-testid="signOut-link"
									>
										{t("button:signOut")}
									</ResponsiveNavlink>
								</StyledNav>
							</StyledSection>
						</Grid>
					)}
					<Grid xs={1} order={{ xs: -1, sm: 0 }}>
						<StyledSection data-testid="contact-section">
							<Typography level="title-md" component="h2">
								{t("common:contact")}
							</Typography>
							{address && (
								<Typography component="div">
									<div>{address.name}</div>

									<div>
										{[address.streetName, address.houseNumber]
											.filter(Boolean)
											.join(" ")}
									</div>
									<div>
										{[address.city, address.zip].filter(Boolean).join(" ")}
									</div>
									<div>
										{[
											address.province,
											address.country &&
												t(`common:country.${address.country}`),
										]
											.filter(Boolean)
											.join(", ")}
									</div>
									{address.phone && <div>{address.phone}</div>}
									{address.email && (
										<Link href={`mailto:${address.email}`}>
											{address.email}
										</Link>
									)}
								</Typography>
							)}
						</StyledSection>
					</Grid>
				</Grid>
				<Grid container columns={{ xs: 1, sm: 2 }} spacing={2} sx={{ my: 0 }}>
					<Grid
						md
						xs={1}
						sx={{
							display: "flex",
							alignItems: "flex-start",
						}}
					>
						<StyledInlineNav
							data-testid="legal-links"
							sx={{ width: { xs: "100%", sm: "auto" }, pt: 0.5 }}
						>
							{navigation.legal.map(link => (
								<ResponsiveNavlink
									key={link.href}
									href={link.href}
									data-testid={`${link.href}-link`}
								>
									{link.label}
								</ResponsiveNavlink>
							))}
						</StyledInlineNav>
					</Grid>
					<Grid
						xs={1}
						md="auto"
						sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}
					>
						<Box
							sx={{
								display: "flex",
								width: "100%",
								gap: 2,
								justifyContent: "flex-end",
								alignItems: { xs: "stretch", md: "flex-start" },
								flexDirection: { xs: "column-reverse", md: "row" },
							}}
						>
							<ColorModeSelector />
							<CookieSettings />
							<LanguageSelect />
						</Box>
					</Grid>
				</Grid>
				<Box
					sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
				>
					<Box data-testid="copyright">&copy; {dayjs().format("YYYY")} Blibla</Box>
					<Box data-testid="social-links">
						{address?.github && (
							<IconButton
								component="a"
								href={address.github}
								target="_blank"
								rel="noindex nofollow"
								aria-label="GitHub"
							>
								<GitHubIcon />
							</IconButton>
						)}
						{address?.huggingface && (
							<IconButton
								component="a"
								href={address.huggingface}
								target="_blank"
								rel="noindex nofollow"
								aria-label="Huggingface"
							>
								<HuggingfaceIcon />
							</IconButton>
						)}
						{address?.discord && (
							<IconButton
								component="a"
								href={address.discord}
								target="_blank"
								rel="noindex nofollow"
								aria-label="Discord"
							>
								<DiscordIcon sx={{ color: "#5865F2" }} />
							</IconButton>
						)}
						{address?.youtube && (
							<IconButton
								component="a"
								href={address.youtube}
								target="_blank"
								rel="noindex nofollow"
								aria-label="Youtube"
							>
								<YouTubeIcon sx={{ color: "#FF0000" }} />
							</IconButton>
						)}
						{address?.x && (
							<IconButton
								component="a"
								href={address.x}
								target="_blank"
								rel="noindex nofollow"
								aria-label="X"
							>
								<XIcon />
							</IconButton>
						)}
						{address?.twitch && (
							<IconButton
								component="a"
								href={address.twitch}
								target="_blank"
								rel="noindex nofollow"
								aria-label="Twitch"
							>
								<TwitchIcon sx={{ color: "#6441a5" }} />
							</IconButton>
						)}
					</Box>
				</Box>
			</Container>
		</Sheet>
	);
}
