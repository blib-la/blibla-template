import type { TypographyProps } from "@mui/joy/Typography";
import Typography from "@mui/joy/Typography";

export function ClampTypography({
	children,
	sx,
	maxLines,
	...properties
}: TypographyProps & { maxLines: number }) {
	return (
		<Typography
			sx={{
				...sx,
				WebkitLineClamp: maxLines,
				WebkitBoxOrient: "vertical",
				display: "-webkit-box",
				overflow: "hidden",
			}}
			{...properties}
		>
			{children}
		</Typography>
	);
}
