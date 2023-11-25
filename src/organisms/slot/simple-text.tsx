import Typography from "@mui/joy/Typography";

import type { SimpleTextSlot } from "~/sanity/lib/types";

export function SimpleText({ slot }: { slot: SimpleTextSlot }) {
	return (
		<Typography
			level={slot.level}
			component={slot.component}
			sx={{ textAlign: slot.alignment }}
		>
			{slot.text}
		</Typography>
	);
}
