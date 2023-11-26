import { createContext, useContext } from "react";

import type { AddressDocument } from "~/sanity/lib/types";

export interface Data {
	address?: AddressDocument;
}

export const DataContext = createContext<Data>({});

export const { Provider: DataProvider } = DataContext;

export function useDataContext() {
	return useContext(DataContext);
}
