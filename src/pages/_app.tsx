import CssBaseline from "@mui/joy/CssBaseline";
import { CssVarsProvider } from "@mui/joy/styles";
import { CookieConsentProvider } from "@use-cookie-consent/react";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import Head from "next/head";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { appWithTranslation } from "next-i18next";
import React from "react";
import { SWRConfig } from "swr";

import { globalStyles } from "@/ions/styles";
import { fetcher } from "@/ions/swr/fetcher";
import { theme } from "@/ions/theme";
import { CSS_VARIABLE_PREFIX } from "@/ions/theme/constants";
import { PWAConfig } from "@/molecules/pwa-config";

const CookieBanner = dynamic(
	async () => import("@/organisms/cookie-banner").then(module_ => module_.CookieBanner),
	{
		ssr: false,
	}
);

function App({
	Component,
	pageProps: { session, ...pageProperties },
}: AppProps<{ session?: Session }>) {
	return (
		<CssVarsProvider
			theme={theme}
			defaultMode="system"
			modeStorageKey={`${CSS_VARIABLE_PREFIX}-mode`}
		>
			<CssBaseline />
			{globalStyles}
			<Head>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0, viewport-fit=cover"
				/>
				<meta charSet="utf8" />
				<meta name="format-detection" content="telephone=no" />
			</Head>
			<PWAConfig />
			<SessionProvider session={session}>
				<CookieConsentProvider
					useCookieConsentHooksOptions={{
						defaultConsent: {},
					}}
				>
					<SWRConfig
						value={{
							fetcher,
							errorRetryCount: 3,
							focusThrottleInterval: 5 * 1000,
							revalidateOnReconnect: false,
						}}
					>
						<Component {...pageProperties} />
						<CookieBanner />
					</SWRConfig>
				</CookieConsentProvider>
			</SessionProvider>
		</CssVarsProvider>
	);
}

export default appWithTranslation(App);
