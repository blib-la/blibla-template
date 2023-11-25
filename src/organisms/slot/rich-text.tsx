import { Box } from "@/molecules/box";
import { RichTextBlock } from "@/organisms/rich-text";
import type { RichTextSlot } from "~/sanity/lib/types";

export function RichText({ slot }: { slot: RichTextSlot }) {
	return (
		<Box sx={{ mx: { xs: 2, md: 16, lg: 24 } }}>
			<RichTextBlock value={slot.body} />
		</Box>
	);
}
