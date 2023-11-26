import Option from "@mui/joy/Option";
import Select from "@mui/joy/Select";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import type { ReactElement } from "react";

import { FlagDe } from "@/atoms/flags/de";
import { FlagUs } from "@/atoms/flags/us";
import { StyledFlagWrapper, StyledValueWrapper } from "@/organisms/language-select/styled";

export const localeNames: Record<string, string> = {
	de: "Deutsch",
	en: "English",
};
export const localeFlags: Record<string, ReactElement> = {
	de: <FlagDe />,
	en: <FlagUs />,
};

export function LanguageSelect() {
	const { asPath, locale, locales = [], push } = useRouter();
	const { t } = useTranslation(["button"]);

	const localeRegex = new RegExp(`/(${locales.join("|")})$`);
	const asPath_ = asPath.replace(localeRegex, "/");
	return (
		<Select
			data-testid="language-selector"
			value={locale}
			name="language"
			variant="soft"
			color="neutral"
			component="label"
			sx={{ width: { xs: "100%", sm: "auto" } }}
			aria-label={t("button:language")}
			slotProps={{
				listbox: {
					"data-testid": "language-selector-listbox",
				},
				button: {
					"data-testid": "language-selector-button",
					"aria-label": localeNames[locale!],
					sx: {
						lineHeight: "inherit",
					},
				},
			}}
			renderValue={option => (
				<StyledValueWrapper>
					<StyledFlagWrapper>{localeFlags[option!.value]}</StyledFlagWrapper>
					{localeNames[option!.value]}
				</StyledValueWrapper>
			)}
			onChange={async (event, value: string | null) => {
				await push(asPath_, undefined, { locale: value! });
			}}
		>
			{locales.map(locale => (
				<Option key={locale} value={locale}>
					<StyledFlagWrapper>{localeFlags[locale]}</StyledFlagWrapper>{" "}
					{localeNames[locale]}
				</Option>
			))}
		</Select>
	);
}
