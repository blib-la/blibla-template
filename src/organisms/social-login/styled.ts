import Button from "@mui/joy/Button";
import Sheet from "@mui/joy/Sheet";
import { styled } from "@mui/joy/styles";

export const StyledSheet = styled(Sheet)(({ theme }) => ({
	display: "flex",
	flexDirection: "column",
	gap: theme.spacing(1),
	padding: theme.spacing(2),
	margin: `${theme.spacing(2)} auto`,
	maxWidth: "max-content",
	borderRadius: theme.vars.radius.md,
}));

export const StyledSocialButton = styled(Button)({
	textAlign: "left",
	justifyContent: "flex-start",
});
