import type { ButtonProps } from "@mui/joy/Button";
import Button from "@mui/joy/Button";

export function SingleLineButton({ children, sx, ...rest }: ButtonProps) {
	return (
		<Button {...rest} sx={{ ...sx, flex: 11, minWidth: "max-content" }}>
			{children}
		</Button>
	);
}
