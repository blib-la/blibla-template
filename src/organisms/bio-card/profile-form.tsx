import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import type { SubmitHandler } from "react-hook-form";
import { useFormContext } from "react-hook-form";

import { nativeLanguageNames } from "@/organisms/bio-card/constants";
import { InputField } from "@/organisms/bio-card/input-field";
import { SelectField } from "@/organisms/bio-card/select-field";
import { StyledProfileForm } from "@/organisms/bio-card/styled";
import { TextareaField } from "@/organisms/bio-card/textarea-field";
import type { FormInput } from "@/organisms/bio-card/types";

export function ProfileForm({
	onSubmit,
	bio,
	language,
	name,
}: { onSubmit: SubmitHandler<FormInput> } & Partial<FormInput>) {
	const { t } = useTranslation(["form"]);
	const { control, handleSubmit } = useFormContext<FormInput>();
	const { locales } = useRouter();
	return (
		<StyledProfileForm data-testid="profile-form" onSubmit={handleSubmit(onSubmit)}>
			<InputField
				data-testid="profile-form-name"
				name="name"
				label={t("form:name.label")}
				control={control}
				defaultValue={name}
				placeholder={t("form:name.placeholder")}
				rules={{ required: t("form:name.validation") }}
			/>
			<TextareaField
				data-testid="profile-form-bio"
				name="bio"
				label={t("form:bio.label")}
				control={control}
				defaultValue={bio}
				placeholder={t("form:bio.placeholder")}
			/>
			<SelectField
				data-testid="profile-form-language"
				name="language"
				label={t("form:language.label")}
				control={control}
				placeholder={t("form:language.placeholder")}
				defaultValue={language}
				options={locales!.map(value => ({
					value,
					label: nativeLanguageNames[value as keyof typeof nativeLanguageNames],
				}))}
			/>
		</StyledProfileForm>
	);
}
