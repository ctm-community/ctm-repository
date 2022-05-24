
/**
 * Computes the number of pages that all the maps will occupy
 * @param entries the number of maps
 * @param entries_per_page the number of maps per page
 * @returns the number of pages
 */
export function computePageCount(entries: number, entries_per_page: number): number {
    return Math.ceil(entries / entries_per_page)
}
