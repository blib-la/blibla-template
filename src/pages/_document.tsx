import { getInitColorSchemeScript } from "@mui/joy/styles";
import Document, { Head, Html, Main, NextScript } from "next/document";

import { CSS_VARIABLE_PREFIX } from "@/ions/theme/constants";
import nextI18n from "~/next-i18next.config";

export default class MyDocument extends Document {
	render() {
		return (
			<Html lang={nextI18n.i18n.defaultLocale}>
				<Head>
					{getInitColorSchemeScript({ modeStorageKey: `${CSS_VARIABLE_PREFIX}-mode` })}
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
