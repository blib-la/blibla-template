import { styled } from "@mui/joy/styles";
import Image from "next/image";

export const StyledImage = styled(Image)({
	width: "100%",
	objectFit: "cover",
	pointerEvents: "none",
});
