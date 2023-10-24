/**
 * Creates a unique array by removing duplicate elements.
 */
export function uniqueArray<T>(array: T[]): T[] {
	return [...new Set(array)];
}
