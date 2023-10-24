import { styled } from "@mui/joy/styles";

export const StyledProfileView = styled("div")({
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	textAlign: "center",
});

export const StyledProfileForm = styled("form")(({ theme }) => ({
	width: "100%",
	display: "flex",
	flexDirection: "column",
	gap: theme.spacing(1),
}));
