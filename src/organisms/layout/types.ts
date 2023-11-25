import type { ReactNode } from "react";

import type { Seo } from "~/sanity/lib/types";

export interface LayoutProperties {
	children?: ReactNode;
	seo: Seo;
}
