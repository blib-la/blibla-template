import dynamic from "next/dynamic";

import { Box } from "@/molecules/box";
import { Layout } from "@/organisms/layout";
import { Stage } from "@/organisms/stage";
import type { LandingPage } from "~/sanity/lib/types";

const SlotSwitch = dynamic(() => import("@/organisms/slot").then(module_ => module_.SlotSwitch));

export function LandingPageTemplate({ page }: { page: LandingPage }) {
	return (
		<Layout
			seo={page.seo}
			sx={{ py: { xs: 4, md: 12, lg: 20 } }}
			stage={page.stage && <Stage stage={page.stage} />}
		>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					gap: { xs: 2, md: 8, lg: 12 },
				}}
			>
				{page.slots?.map((slot, index) => (
					<SlotSwitch key={slot.id} slot={slot} even={index % 2 === 0} />
				))}
			</Box>
		</Layout>
	);
}
