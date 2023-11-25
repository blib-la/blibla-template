import CookieIcon from "@mui/icons-material/Cookie";
import Alert from "@mui/joy/Alert";
import Button from "@mui/joy/Button";
import DialogActions from "@mui/joy/DialogActions";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import Stack from "@mui/joy/Stack";
import Switch from "@mui/joy/Switch";
import Typography from "@mui/joy/Typography";
import { useCookieConsentContext } from "@use-cookie-consent/react";
import { useTranslation } from "next-i18next";
import { useState } from "react";

import { NavLink } from "@/atoms/link";
import { Box } from "@/molecules/box";
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

export function CookieSettings() {
	const { acceptCookies, acceptAllCookies, declineAllCookies, consent } =
		useCookieConsentContext();
	const [dialogOpen, setDialogOpen] = useState(false);
	const { t } = useTranslation(["common", "button"]);

	function handleClose() {
		setDialogOpen(false);
	}

	return (
		<>
			<Button
				size="sm"
				variant="plain"
				color="neutral"
				onClick={() => {
					setDialogOpen(true);
				}}
			>
				{t("common:cookieBanner.configureCookies")}
			</Button>
			<Modal open={dialogOpen} onClose={handleClose}>
				<ModalDialog>
					<Typography>{t("common:cookieBanner.manageCookies")}</Typography>
					<Stack gap={2} sx={{ maxWidth: 400, px: 2, pb: 1 }}>
						<Box>
							<Switch
								checked={consent.necessary}
								startDecorator={t("common:cookieBanner.necessary")}
							/>
						</Box>
						<Box>
							<Switch
								checked={consent.session}
								startDecorator={t("common:cookieBanner.session")}
								onChange={event => {
									acceptCookies({
										...consent,
										session: event.target.checked,
									});
								}}
							/>
						</Box>
						<Box>
							<Switch
								checked={consent.firstParty}
								startDecorator={t("common:cookieBanner.firstParty")}
								onChange={event => {
									acceptCookies({
										...consent,
										firstParty: event.target.checked,
									});
								}}
							/>
						</Box>
						<Box>
							<Switch
								checked={consent.thirdParty}
								startDecorator={t("common:cookieBanner.thirdParty")}
								onChange={event => {
									acceptCookies({
										...consent,
										thirdParty: event.target.checked,
									});
								}}
							/>
						</Box>

						<Box>
							<Switch
								checked={consent.marketing}
								startDecorator={t("common:cookieBanner.marketing")}
								onChange={event => {
									acceptCookies({
										...consent,
										marketing: event.target.checked,
									});
								}}
							/>
						</Box>
						<Box>
							<Switch
								checked={consent.preferences}
								startDecorator={t("common:cookieBanner.preferences")}
								onChange={event => {
									acceptCookies({
										...consent,
										preferences: event.target.checked,
									});
								}}
							/>
						</Box>
						<Box>
							<Switch
								checked={consent.statistics}
								startDecorator={t("common:cookieBanner.statistics")}
								onChange={event => {
									acceptCookies({
										...consent,
										statistics: event.target.checked,
									});
								}}
							/>
						</Box>
					</Stack>
					<DialogActions>
						<Button
							color="primary"
							onClick={() => {
								acceptAllCookies();
								handleClose();
							}}
						>
							{t("common:cookieBanner.acceptAll")}
						</Button>
						<Button
							color="neutral"
							onClick={() => {
								declineAllCookies();
								handleClose();
							}}
						>
							{t("common:cookieBanner.acceptNecessary")}
						</Button>
						<Button color="neutral" onClick={handleClose}>
							{t("button:close")}
						</Button>
					</DialogActions>
				</ModalDialog>
			</Modal>
		</>
	);
}
