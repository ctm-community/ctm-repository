
/**
 * Computes the number of pages that all the maps will occupy
 * @param entries the number of maps
 * @param entriesPerPage the number of maps per page
 * @returns the number of pages
 */
export function computePageCount(entries: number, entriesPerPage: number): number {
    return Math.ceil(entries / entriesPerPage)
}
