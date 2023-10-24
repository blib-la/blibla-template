import type { ReactNode } from "react";

export interface LayoutProperties {
	children?: ReactNode;
	noIndex?: boolean;
	title?: string;
	description?: string;
}
