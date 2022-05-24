import { useSnackbar } from "components/Snackbar";
import { useEffect } from "react";
import useFetch from "react-fetch-hook";
import { useNavigate } from "react-router-dom";
import { getRestAPI } from "utilities/env";
import { joinPaths } from "utilities/path";



/**
 * A react hook for getting data. The hook manages error handling
 * 
 * Note: there is a bug with useFetch that will make it not fetch if dependsArray includes falsy values
 * @param {string} path the api endpoint
 * @param {[any]} dependsArray values that should trigger a reload of data if they change
 * @returns {[isLoading, data, error]} whether its still loading, the data, error 
 */
export function useFetchAPI(path: string, dependsArray: any[] | null = null, data_default: any = null): [boolean, any, useFetch.UseFetchError | undefined] {
    if (path.startsWith('/')) {
        path = path.substring(1);
    }

    const dispatchMsg = useSnackbar();
    const nav = useNavigate();

    const args: any = {
        //credentials: 'include',
        depends: dependsArray,
        cache: "default"
    };

    let { isLoading, data, error } = useFetch(
        getFetchPath(path), args);

    if (isLoading || error) {
        data = data_default;
    }

    useEffect(() => {
        if (error) {
            if (error.status === 401) {
                dispatchMsg({ type: 'error', text: 'Authentication Required' });
                nav('/');
            }
            else {
                dispatchMsg({ type: 'error', text: error.message })
            }
        }
        // eslint-disable-next-line
    }, [error]);

    return [isLoading, data, error];
}

/**
 * Adds the api path to an api endpoint
 * @param {string} path the api endpoint 
 * @returns {string} path with http and the api path added
 */
function getFetchPath(path: string): string {
    return joinPaths(getRestAPI(), path)
}
