import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { useTranslation } from "next-i18next";

import { colors } from "@/organisms/social-login/colors";
import { socialIcons } from "@/organisms/social-login/icons";
import { StyledSheet, StyledSocialButton } from "@/organisms/social-login/styled";
import type { ProviderId } from "@/organisms/social-login/types";

export function SocialLogin() {
	const { t } = useTranslation(["button"]);
	const { locale, defaultLocale } = useRouter();
	return (
		<StyledSheet>
			{Object.entries(colors).map(([key, value]) => (
				<StyledSocialButton
					key={key}
					data-testid={`${key}-signin-button`}
					startDecorator={socialIcons[key as ProviderId]}
					sx={{
						bgcolor: value.backgroundColor,
						color: value.textColor,
						"&:hover": {
							bgcolor: value.hoverBackgroundColor,
						},
						"&:active": {
							bgcolor: value.activeBackgroundColor,
						},
					}}
					onClick={async () => {
						await signIn(key, {
							callbackUrl: locale === defaultLocale ? "/" : `/${locale}`,
						});
					}}
				>
					{t(`button:signInWith.${key}`)}
				</StyledSocialButton>
			))}
		</StyledSheet>
	);
}
