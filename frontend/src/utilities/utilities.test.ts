import { act } from '@testing-library/react';
import fetch from 'jest-fetch-mock';
import { useGetMapsSearch } from 'utilities/api';
import { computePageCount } from "utilities/paging";
import { APITest, minecraftMap } from 'utilities/testUtilities';


fetch.enableMocks();

beforeEach(() => {
    fetch.resetMocks();
    process.env.REACT_APP_PRODUCTION_API = "http://localhost:8080";
    process.env.REACT_APP_DEVELOPMENT_API = "http://localhost:8080";
});

it("paging", () => {
    expect(computePageCount(13, 10)).toEqual(2);
    expect(computePageCount(13, 3)).toEqual(5);
    expect(computePageCount(12, 3)).toEqual(4);
});

test("useGetMapsSearch", async () => {
    fetch.mockResponseOnce(JSON.stringify([minecraftMap]));

    expect.assertions(1);
    // @ts-ignore
    await act(() => expect(APITest(undefined, useGetMapsSearch, 'some/query')).rejects.toEqual(new Error("Invalid option: undefined")));
});
