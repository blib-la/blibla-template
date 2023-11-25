import type { Rule } from "sanity";

import i18next from "~/next-i18next.config";
const { locales } = i18next.i18n;

export function hasValidI18N<T extends Record<string, unknown>>(rule: Rule, dependencies?: T) {
	return rule.custom((entry: { value: string }[], context) => {
		const parent = context.parent as Record<string, unknown>;
		// If no dependencies are given all locales have to be entered
		if (
			(!dependencies || Object.keys(dependencies).length === 0) &&
			entry.filter(({ value }) => value).length === locales.length
		) {
			return true;
		}

		const dependenciesSatisfied =
			!dependencies ||
			Object.entries(dependencies).every(([key, value]) => parent[key] === value);

		// If template is given all locales have to be entered if the template matches
		if (
			dependenciesSatisfied &&
			entry.filter(({ value }) => value?.toString().length > 0).length < locales.length
		) {
			return "Please enter all translations.";
		}

		// We're good, the entry is valid
		return true;
	});
}
