import { styled } from "@mui/joy/styles";

export const StyledNav = styled("nav")(({ theme }) => ({
	display: "flex",
	flexDirection: "row",
	gap: theme.spacing(3),
}));
