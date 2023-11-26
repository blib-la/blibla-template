import { styled } from "@mui/joy/styles";
import Image from "next/image";

export const StyledImage = styled(Image)({
	width: "100%",
	height: "auto",
	objectFit: "cover",
	pointerEvents: "none",
});

export const StyledImageMask = styled("div")({
	position: "relative",
	width: "100%",
	aspectRatio: 1,
	maskRepeat: "no-repeat",
	maskSize: "contain",
	userSelect: "none",
	pointerEvents: "none",
});
