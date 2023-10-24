import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardActions from "@mui/joy/CardActions";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import axios from "axios";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useSWRConfig } from "swr";

import { ProfileForm } from "@/organisms/bio-card/profile-form";
import { ProfileView } from "@/organisms/bio-card/profile-view";
import type { BioCardProperties, FormInput } from "@/organisms/bio-card/types";

export function BioCard({ loading, image, name, bio, plan, language }: BioCardProperties) {
	const { mutate } = useSWRConfig();
	const { t } = useTranslation(["button", "common", "form"]);
	const router = useRouter();
	const locales = router.locales!;

	// Create a regular expression to match any of the available locales at the end of the path
	const localeRegex = new RegExp(`/(${locales.join("|")})$`);

	// Remove the locale slug from the path
	const asPath = router.asPath.replace(localeRegex, "/");

	const [isEditMode, setIsEditMode] = useState(false);
	const methods = useForm<FormInput>({
		defaultValues: {
			name,
			bio,
			language,
		},
	});
	const { handleSubmit, reset } = methods;
	async function onSubmit(data: FormInput) {
		try {
			// Update the server-side data first
			const response = await axios.post("/api/user/profile", data);

			// If update was successful, update the client-side data
			if (response.status === 200) {
				// Using SWR's mutate to revalidate the data
				await mutate("/api/user/profile", { ...data, ...response.data }, false);
				await router.push(asPath, asPath, { locale: response.data.language });

				setIsEditMode(false);
			}
		} catch (error) {
			console.error("Failed to update profile:", error);
		}
	}

	return (
		<Card>
			<CardContent>
				{isEditMode ? (
					<FormProvider {...methods}>
						<ProfileForm
							name={name}
							bio={bio}
							language={language}
							onSubmit={onSubmit}
						/>
					</FormProvider>
				) : (
					<ProfileView
						name={name}
						plan={plan}
						loading={loading}
						image={image}
						bio={bio}
						language={language}
					/>
				)}
			</CardContent>
			<CardOverflow>
				<CardActions>
					{isEditMode ? (
						<>
							<Button
								data-testid="bio-card-cancel-button"
								color="neutral"
								variant="plain"
								onClick={() => {
									reset();
									setIsEditMode(false);
								}}
							>
								{t("button:cancel")}
							</Button>
							<Button
								data-testid="bio-card-save-button"
								color="primary"
								variant="plain"
								onClick={handleSubmit(onSubmit)}
							>
								{t("button:save")}
							</Button>
						</>
					) : (
						<Button
							data-testid="bio-card-edit-button"
							color="primary"
							variant="plain"
							onClick={() => {
								setIsEditMode(true);
							}}
						>
							{t("button:editProfile")}
						</Button>
					)}
				</CardActions>
			</CardOverflow>
		</Card>
	);
}
