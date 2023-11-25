import CssBaseline from "@mui/joy/CssBaseline";
import { CssVarsProvider } from "@mui/joy/styles";
import { CookieConsentProvider } from "@use-cookie-consent/react";
import dayjs from "dayjs";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { appWithTranslation } from "next-i18next";
import React, { useMemo } from "react";
import { SWRConfig } from "swr";

import { DataProvider } from "@/ions/contexts/data";
import type { Navigation } from "@/ions/contexts/navigation";
import { NavigationProvider } from "@/ions/contexts/navigation";
import { globalStyles } from "@/ions/styles";
import { fetcher } from "@/ions/swr/fetcher";
import { theme } from "@/ions/theme";
import { CSS_VARIABLE_PREFIX } from "@/ions/theme/constants";
import { Canonical } from "@/molecules/canonical";
import { PWAConfig } from "@/molecules/pwa-config";
import type { AddressDocument } from "~/sanity/lib/types";
import "@/ions/date";

const CookieBanner = dynamic(
	async () => import("@/organisms/cookie-banner").then(module_ => module_.CookieBanner),
	{
		ssr: false,
	}
);

function App({
	Component,
	pageProps: { session, navigation, address, ...pageProperties },
}: AppProps<{ session?: Session; navigation: Navigation; address: AddressDocument }>) {
	const { locale } = useRouter();

	// Intended abuse of useMemo to allow changes on server and client mount
	useMemo(() => {
		// We need to set is before the render to tell dayjs to change the locale
		dayjs.locale(locale!);
	}, [locale]);

	return (
		<CssVarsProvider
			theme={theme}
			defaultMode="system"
			modeStorageKey={`${CSS_VARIABLE_PREFIX}-mode`}
		>
			<CssBaseline />
			{globalStyles}
			<Head>
				<title>Blibla</title>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0, viewport-fit=cover"
				/>
				<meta charSet="utf8" />
				<meta name="format-detection" content="telephone=no" />
			</Head>
			<Canonical />
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
						<DataProvider value={{ address }}>
							<NavigationProvider value={navigation}>
								<Component {...pageProperties} />
								<CookieBanner />
							</NavigationProvider>
						</DataProvider>
					</SWRConfig>
				</CookieConsentProvider>
			</SessionProvider>
		</CssVarsProvider>
	);
}

export default appWithTranslation(App);
