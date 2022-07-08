import useFetch from "react-fetch-hook";
import { getFetchPath, useFetchAPI } from "utilities/fetch";


/**
 * Utility function
 * Gets parameters, deletes those where the value is undefined, and returns
 * it as a url search parameter string, ready to be put into a URL.
 * @param {any} obj the parameters to format
 * @returns {string} the formatted search parameter, ready to be put into a URL
 */
export function searchParamHelper(obj: any): string {
    Object.keys(obj).forEach(k => {
        if (obj[k] === undefined) {
            delete obj[k];
        }
    });

    return (new URLSearchParams(obj)).toString();
}

/**
 * Specify API Paths here
 */
const API_ENDPOINTS = {
    SEARCH_MAPS: (params: { q: string, page?: number, perPage?: number }) => '/search/maps?' + searchParamHelper(params),
    MAPS_ID: (id: number) => `/maps/${id}`,
    UPLOAD: '/upload',
}


/**
 * Represents a CTM map. These are not all the details, but all that are send by the search api endpoint
 */
export interface MinecraftMap {
    id: number,
    name: string
    uploadDate: number,
    author: string,
    length: string,
    objectiveMain: number,
    objectiveBonus: number,
    difficulty: string,
    descriptionShort: string,
    downloadCount: number,
    type: string,
    imageUrl: string,
    series: string,
    minecraftVersion: string
}

export interface SearchResult {
    maxPage: number,
    data: MinecraftMap[]
}

const ENTRIES_PER_PAGE: number = 12;

/**
 * Searches for maps from the backend with paging. A react hook
 * @param {string} query the search string
 * @param {page} page the page number
 * @param {any[] | null} dependsArray re-request data when the values in the array change.
 * Set to [] (the default) to never reload data
 * @return {[boolean, SearchResult, any]} [whether its still loading, the data, error]
 */
export function useGetMapsSearch(
    query: string,
    page: number = 0,
    dependsArray: any[] | null = [],
    perPage: number = ENTRIES_PER_PAGE
): [boolean, SearchResult, useFetch.UseFetchError | undefined] {

    return useFetchAPI(
        API_ENDPOINTS.SEARCH_MAPS({ q: query, perPage: perPage, page: page }),
        dependsArray,
        { maxPage: 0, data: [] }
    );
}

/**
 * Get one map from the backend by id. A react hook
 * @param {number} id the id number of the map to get
 * @param {any[] | null} dependsArray re-request data when the values in the array change.
 * Set to [] (the default) to never reload data
 * @return {[boolean, MinecraftMap | null, any]} [whether its still loading, the data, error]
 */
export function useGetMap(
    id: number,
    dependsArray: any[] | null = []
): [boolean, MinecraftMap | null, useFetch.UseFetchError | undefined] {

    return useFetchAPI(
        API_ENDPOINTS.MAPS_ID(id),
        dependsArray,
        null
    );
}

/**
 * Upload an image
 */
export async function upload(image: Blob) {
    let data = new FormData();
    data.append('file', image);

    const path = getFetchPath(API_ENDPOINTS.UPLOAD);
    fetch(path, {
        method: 'POST',
        body: data
    }).then(console.log).catch(console.error);
}
