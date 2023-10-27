import { createContext, useContext } from "react";

export interface NavigationItem {
	href: string;
	label: string;
}

export interface Navigation {
	[key: string]: NavigationItem[];
}

export const NavigationContext = createContext<Navigation>({
	legal: [],
	company: [],
});

export const { Provider: NavigationProvider } = NavigationContext;

export function useNavigationContext() {
	return useContext(NavigationContext);
}
