import { getInitColorSchemeScript } from "@mui/joy/styles";
import Document, { Head, Html, Main, NextScript } from "next/document";

import nextI18n from "../../next-i18next.config";

export default class MyDocument extends Document {
	render() {
		return (
			<Html lang={nextI18n.i18n.defaultLocale}>
				<Head />
				<body>
					{getInitColorSchemeScript()}
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
