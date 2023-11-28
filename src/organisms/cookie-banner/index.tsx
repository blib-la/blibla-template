import CookieIcon from "@mui/icons-material/Cookie";
import Alert from "@mui/joy/Alert";
import Button from "@mui/joy/Button";
import DialogActions from "@mui/joy/DialogActions";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import ModalDialog from "@mui/joy/ModalDialog";
import Stack from "@mui/joy/Stack";
import Switch from "@mui/joy/Switch";
import Typography from "@mui/joy/Typography";
import { useCookieConsentContext } from "@use-cookie-consent/react";
import { useAtom } from "jotai";
import { useTranslation } from "next-i18next";

import { NavLink } from "@/atoms/link";
import { cookieSettingsOpenAtom } from "@/ions/atoms/common";
import { useNavigationContext } from "@/ions/contexts/navigation";
import { Box } from "@/molecules/box";
import { StyledBanner, StyledButtonWrapper } from "@/organisms/cookie-banner/styled";

export function CookieBanner() {
	const { declineAllCookies, acceptAllCookies, consent } = useCookieConsentContext();
	const { t } = useTranslation(["common"]);
	const navigation = useNavigationContext();

	return (
		!consent.necessary && (
			<StyledBanner data-testid="cookie-banner">
				<Alert
					color="neutral"
					variant="soft"
					sx={{ alignItems: "flex-start", boxShadow: "md" }}
				>
					<div>
						<Typography
							startDecorator={<CookieIcon />}
							sx={{ alignItems: "flex-start" }}
						>
							{t("common:cookieBanner.cookieMessage")}
						</Typography>
						{navigation.cookieBanner?.length > 0 && (
							<Box sx={{ mt: 2, display: "flex", gap: 1, flexWrap: "wrap" }}>
								{navigation.cookieBanner.map(link => (
									<NavLink
										key={link.href}
										disableHighlight
										color="neutral"
										href={link.href}
									>
										{link.label}
									</NavLink>
								))}
							</Box>
						)}
						<StyledButtonWrapper>
							<Button
								autoFocus
								sx={{ width: { xs: "100%", sm: "auto" } }}
								color="success"
								onClick={acceptAllCookies}
							>
								{t("common:cookieBanner.acceptAll")}
							</Button>
							<Button
								sx={{ width: { xs: "100%", sm: "auto" } }}
								variant="soft"
								color="neutral"
								onClick={declineAllCookies}
							>
								{t("common:cookieBanner.declineAll")}
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
	const [dialogOpen, setDialogOpen] = useAtom(cookieSettingsOpenAtom);
	const { t } = useTranslation(["common", "button"]);

	function handleClose() {
		setDialogOpen(false);
	}

	return (
		<>
			<Button
				variant="soft"
				color="neutral"
				onClick={() => {
					setDialogOpen(true);
				}}
			>
				{t("common:cookieBanner.configureCookies")}
			</Button>
			<Modal open={dialogOpen} onClose={handleClose}>
				<ModalDialog color="neutral" variant="soft">
					<Typography>{t("common:cookieBanner.manageCookies")}</Typography>
					<ModalClose aria-label={t("button:close")} />
					<Stack gap={2} sx={{ maxWidth: 400, px: 2, pb: 1 }}>
						<Box>
							<Switch
								readOnly
								checked={consent.necessary ?? false}
								color={consent.necessary ? "success" : "neutral"}
								endDecorator={t("common:cookieBanner.necessary")}
							/>
						</Box>
						<Box>
							<Switch
								checked={consent.session}
								color={consent.session ? "success" : "neutral"}
								endDecorator={t("common:cookieBanner.session")}
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
								color={consent.firstParty ? "success" : "neutral"}
								endDecorator={t("common:cookieBanner.firstParty")}
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
								color={consent.thirdParty ? "success" : "neutral"}
								endDecorator={t("common:cookieBanner.thirdParty")}
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
								color={consent.marketing ? "success" : "neutral"}
								endDecorator={t("common:cookieBanner.marketing")}
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
								color={consent.preferences ? "success" : "neutral"}
								endDecorator={t("common:cookieBanner.preferences")}
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
								color={consent.statistics ? "success" : "neutral"}
								endDecorator={t("common:cookieBanner.statistics")}
								onChange={event => {
									acceptCookies({
										...consent,
										statistics: event.target.checked,
									});
								}}
							/>
						</Box>
					</Stack>
					<DialogActions sx={{ flexDirection: { xs: "column", md: "row" } }}>
						<Button
							color="success"
							sx={{ width: { xs: "100%", md: "auto" } }}
							onClick={() => {
								acceptAllCookies();
								handleClose();
							}}
						>
							{t("common:cookieBanner.acceptAll")}
						</Button>
						<Button
							variant="soft"
							color="neutral"
							sx={{ width: { xs: "100%", md: "auto" } }}
							onClick={() => {
								declineAllCookies();
								handleClose();
							}}
						>
							{t("common:cookieBanner.declineAll")}
						</Button>
					</DialogActions>
				</ModalDialog>
			</Modal>
		</>
	);
}
