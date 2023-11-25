import { createContext, useContext } from "react";

export interface NavigationItem {
	href: string;
	label: string;
	children: NavigationItem[] | null;
}

export interface Navigation {
	[key: string]: NavigationItem[];
}

export const NavigationContext = createContext<Navigation>({
	header: [],
	legal: [],
	company: [],
	community: [],
});

export const { Provider: NavigationProvider } = NavigationContext;

export function useNavigationContext() {
	return useContext(NavigationContext);
}
