import { createContext, useContext } from "react";

export interface Data {
	[key: string]: any;
}

export const DataContext = createContext<Data>({
	legal: [],
	company: [],
});

export const { Provider: DataProvider } = DataContext;

export function useDataContext() {
	return useContext(DataContext);
}
