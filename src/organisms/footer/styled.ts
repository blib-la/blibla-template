import { styled } from "@mui/joy/styles";

export const StyledNav = styled("nav")(({ theme }) => ({
	display: "flex",
	flexDirection: "column",
	gap: theme.spacing(1),
}));

export const StyledInlineNav = styled("nav")(({ theme }) => ({
	display: "flex",
	flexWrap: "wrap",
	gap: theme.spacing(1),
}));

export const StyledSection = styled("section")(({ theme }) => ({
	display: "flex",
	flexDirection: "column",
	gap: theme.spacing(1),
	[theme.breakpoints.up("xs")]: {
		textAlign: "center",
	},
	[theme.breakpoints.up("sm")]: {
		textAlign: "unset",
	},
}));
