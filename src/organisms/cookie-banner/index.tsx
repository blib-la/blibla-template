import CookieIcon from "@mui/icons-material/Cookie";
import Alert from "@mui/joy/Alert";
import Button from "@mui/joy/Button";
import Typography from "@mui/joy/Typography";
import { useCookieConsentContext } from "@use-cookie-consent/react";
import { useTranslation } from "next-i18next";

import { NavLink } from "@/atoms/nav-link";
import { StyledBanner, StyledButtonWrapper } from "@/organisms/cookie-banner/styled";

export function CookieBanner() {
	const { declineAllCookies, acceptAllCookies, consent } = useCookieConsentContext();
	const { t } = useTranslation(["common"]);

	return (
		!consent.necessary && (
			<StyledBanner data-testid="cookie-banner">
				<Alert
					color="neutral"
					variant="plain"
					startDecorator={<CookieIcon />}
					sx={{ alignItems: "flex-start", boxShadow: "md" }}
				>
					<div>
						<Typography>{t("common:cookieBanner.cookieMessage")}</Typography>
						<div>
							<NavLink disableHighlight color="neutral" href="/legal/privacy">
								{t("common:navigation.privacy")}
							</NavLink>
						</div>
						<StyledButtonWrapper>
							<Button
								sx={{ width: { xs: "100%", sm: "auto" } }}
								variant="soft"
								onClick={acceptAllCookies}
							>
								{t("common:cookieBanner.acceptAll")}
							</Button>
							<Button
								sx={{ width: { xs: "100%", sm: "auto" } }}
								variant="plain"
								color="neutral"
								onClick={declineAllCookies}
							>
								{t("common:cookieBanner.acceptNecessary")}
							</Button>
						</StyledButtonWrapper>
					</div>
				</Alert>
			</StyledBanner>
		)
	);
}
