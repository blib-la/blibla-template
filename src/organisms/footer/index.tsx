import Container from "@mui/joy/Container";
import Grid from "@mui/joy/Grid";
import Link from "@mui/joy/Link";
import Sheet from "@mui/joy/Sheet";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import { Role } from "@prisma/client";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import { useTranslation } from "next-i18next";

import { ResponsiveNavlink } from "@/atoms/link";
import { useDataContext } from "@/ions/contexts/data";
import { useNavigationContext } from "@/ions/contexts/navigation";
import { ColorModeSelector } from "@/organisms/color-mode-selector";
import { CookieSettings } from "@/organisms/cookie-banner";
import { StyledInlineNav, StyledNav, StyledSection } from "@/organisms/footer/styled";
import { LanguageSelect } from "@/organisms/language-select";

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
							<Typography>Blibla</Typography>
							{address && (
								<Typography component="div">
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
					<Grid xs={1} sx={{ display: "flex", alignItems: "center" }}>
						<StyledInlineNav
							data-testid="legal-links"
							sx={{ width: { xs: "100%", sm: "auto" } }}
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
					<Grid xs={1} sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
						<Stack gap={2}>
							<LanguageSelect />
							<ColorModeSelector />
							<CookieSettings />
						</Stack>
					</Grid>
				</Grid>
				<Grid container columns={{ xs: 1, sm: 2 }} spacing={2} sx={{ my: 0 }}>
					<Grid xs={1} sx={{ display: "flex" }}>
						<StyledInlineNav
							data-testid="copyright"
							sx={{ width: { xs: "100%", sm: "auto" } }}
						>
							&copy; {dayjs().format("YYYY")} Blibla
						</StyledInlineNav>
					</Grid>
				</Grid>
			</Container>
		</Sheet>
	);
}
