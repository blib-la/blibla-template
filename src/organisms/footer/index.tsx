import Container from "@mui/joy/Container";
import Grid from "@mui/joy/Grid";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import { Role } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useTranslation } from "next-i18next";

import { ResponsiveNavlink } from "@/atoms/nav-link";
import { StyledInlineNav, StyledNav, StyledSection } from "@/organisms/footer/styled";
import { LanguageSelect } from "@/organisms/language-select";

export function Footer() {
	const { t } = useTranslation(["common"]);
	const { data: session } = useSession();

	return (
		<Sheet component="footer" data-testid="main-footer">
			<Container sx={{ py: 4 }}>
				<Grid container columns={{ xs: 1, sm: 2, md: 3, lg: 4 }} spacing={2} sx={{ my: 0 }}>
					<Grid xs={1}>
						<StyledSection data-testid="company-section">
							<Typography level="title-md" component="h2">
								{t("common:company")}
							</Typography>
							<StyledNav data-testid="footer-navigation">
								<ResponsiveNavlink href="/" data-testid="home-link">
									{t("common:navigation.home")}
								</ResponsiveNavlink>
								<ResponsiveNavlink href="/about" data-testid="about-link">
									{t("common:navigation.about")}
								</ResponsiveNavlink>
								<ResponsiveNavlink href="/design" data-testid="design-link">
									{t("common:navigation.design")}
								</ResponsiveNavlink>
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
								<StyledNav data-testid="footer-navigation">
									<ResponsiveNavlink href="/profile" data-testid="profile-link">
										{t("common:navigation.profile")}
									</ResponsiveNavlink>
									{session.user.role === Role.ADMIN && (
										<ResponsiveNavlink href="/admin" data-testid="admin-link">
											{t("common:navigation.admin")}
										</ResponsiveNavlink>
									)}
								</StyledNav>
							</StyledSection>
						</Grid>
					)}
					<Grid xs={1} order={{ xs: -1, sm: 0 }}>
						<StyledSection data-testid="contact-section">
							<Typography level="title-md" component="h2">
								{t("common:contact")}
							</Typography>
							<Typography level="body-md">
								42 Milky Way
								<br />
								Local Group 1337
								<br />
								Virgo Supercluster
							</Typography>
						</StyledSection>
					</Grid>
				</Grid>
				<Grid container columns={{ xs: 1, sm: 2 }} spacing={2} sx={{ my: 0 }}>
					<Grid xs={1} sx={{ display: "flex" }}>
						<StyledInlineNav
							data-testid="legal-links"
							sx={{ width: { xs: "100%", sm: "auto" } }}
						>
							<ResponsiveNavlink href="/legal/imprint" data-testid="imprint-link">
								{t("common:navigation.imprint")}
							</ResponsiveNavlink>
							<ResponsiveNavlink href="/legal/terms" data-testid="terms-link">
								{t("common:navigation.terms")}
							</ResponsiveNavlink>
							<ResponsiveNavlink href="/legal/privacy" data-testid="privacy-link">
								{t("common:navigation.privacy")}
							</ResponsiveNavlink>
						</StyledInlineNav>
					</Grid>
					<Grid xs={1} sx={{ display: "flex", justifyContent: "flex-end" }}>
						<LanguageSelect />
					</Grid>
				</Grid>
			</Container>
		</Sheet>
	);
}
