import Grid from "@mui/joy/Grid";
import Sheet from "@mui/joy/Sheet";

import { RichTextBlock } from "@/organisms/rich-text";
import type { TilesSlot } from "~/sanity/lib/types";

export function Tiles({ slot }: { slot: TilesSlot }) {
	return (
		<Grid container spacing={2} columns={{ xs: 1, sm: 2, md: slot.columns }}>
			{slot.items.map(item => (
				<Grid key={item.id} xs={1} sx={{ display: "flex" }}>
					<Sheet color={slot.color} variant={slot.variant} sx={{ flex: 1, p: 2 }}>
						<RichTextBlock value={item.body} />
					</Sheet>
				</Grid>
			))}
		</Grid>
	);
}
