import Container from "@mui/joy/Container";
import { styled } from "@mui/joy/styles";

import { HEADER_HEIGHT } from "@/organisms/header/constants";

export const StyledContainer = styled(Container)(({ theme }) => ({
	display: "flex",
	flexDirection: "column",
	paddingTop: theme.spacing(4),
	paddingBottom: theme.spacing(4),
	minHeight: `calc(100dvh - ${HEADER_HEIGHT}px - var(--stageHeight, 0px))`,
}));
