import { styled } from "@mui/joy/styles";

export const StyledBanner = styled("aside")(({ theme }) => ({
	position: "fixed",
	left: `max(var(--safe-area-inset-left), ${theme.spacing(2)})`,
	right: `max(var(--safe-area-inset-left), ${theme.spacing(2)})`,
	bottom: `max(var(--safe-area-inset-bottom), ${theme.spacing(2)})`,
	zIndex: theme.zIndex.popup,
	maxWidth: 500,
}));

export const StyledButtonWrapper = styled("footer")(({ theme }) => ({
	display: "flex",
	flexWrap: "wrap",
	gap: theme.spacing(1),
	marginTop: theme.spacing(2),
}));
