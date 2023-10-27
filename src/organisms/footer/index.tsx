import Container from "@mui/joy/Container";
import Grid from "@mui/joy/Grid";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import { Role } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useTranslation } from "next-i18next";

import { ResponsiveNavlink } from "@/atoms/nav-link";
import { useDataContext } from "@/ions/contexts/data";
import { useNavigationContext } from "@/ions/contexts/navigation";
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
						<StyledSection data-testid="company-section">
							<Typography level="title-md" component="h2">
								{t("common:community")}
							</Typography>
							<StyledNav>
								<ResponsiveNavlink href="/design" data-testid="design-link">
									{t("common:navigation.design")}
								</ResponsiveNavlink>
								<ResponsiveNavlink href="/blog" data-testid="blog-link">
									{t("common:navigation.blog")}
								</ResponsiveNavlink>
								<ResponsiveNavlink
									href="https://github.com/blib-la"
									target="_blank"
									data-testid="github-link"
								>
									GitHub
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
								<Typography level="body-md" component="div">
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
									{address.email && <div>{address.email}</div>}
								</Typography>
							)}
						</StyledSection>
					</Grid>
				</Grid>
				<Grid container columns={{ xs: 1, sm: 2 }} spacing={2} sx={{ my: 0 }}>
					<Grid xs={1} sx={{ display: "flex" }}>
						<StyledInlineNav
							data-testid="legal-links"
							sx={{ width: { xs: "100%", sm: "auto" } }}
						>
							{navigation.legal.map(link => (
								<ResponsiveNavlink
									key={link.href}
									href={link.href}
									data-testid="legal-link"
								>
									{link.label}
								</ResponsiveNavlink>
							))}
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
