import Avatar from "@mui/joy/Avatar";
import Chip from "@mui/joy/Chip";
import Skeleton from "@mui/joy/Skeleton";
import Typography from "@mui/joy/Typography";
import { useTranslation } from "next-i18next";

import { StyledProfileView } from "@/organisms/bio-card/styled";
import type { BioCardProperties } from "@/organisms/bio-card/types";

export function ProfileView({ loading, image, name, bio, plan }: BioCardProperties) {
	const { t } = useTranslation(["profile"]);
	return (
		<StyledProfileView
			data-testid="profile-view"
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				textAlign: "center",
			}}
		>
			<Avatar
				src={loading ? "" : image}
				alt={name}
				data-testid="profile-view-image"
				sx={{ "--Avatar-size": "4rem" }}
			>
				<Skeleton loading={loading} />
			</Avatar>
			<Chip
				size="sm"
				variant="soft"
				color={loading ? "neutral" : "primary"}
				data-testid="profile-view-plan"
				sx={{
					mt: -1,
					mb: 1,
					border: "3px solid",
					borderColor: "background.surface",
				}}
			>
				{loading ? "..." : t(`profile:plan.${plan}`)}
			</Chip>
			<Typography level="title-lg" data-testid="profile-view-name">
				<Skeleton loading={loading}>{loading ? "User Name" : name}</Skeleton>
			</Typography>
			<Typography level="body-sm" data-testid="profile-view-bio">
				<Skeleton loading={loading}>{loading ? "User Bio" : bio}</Skeleton>
			</Typography>
		</StyledProfileView>
	);
}
