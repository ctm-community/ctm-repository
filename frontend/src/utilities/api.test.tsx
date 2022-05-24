import fetch from 'jest-fetch-mock';
import { search_param_helper, useGetMap, useGetMapsSearch } from 'utilities/api';
import { APITest, ExpectedResult, minecraftMap } from 'utilities/testUtilities';


fetch.enableMocks();

beforeEach(() => {
    fetch.resetMocks();
    process.env.REACT_APP_PRODUCTION_API = "http://localhost:8080";
    process.env.REACT_APP_DEVELOPMENT_API = "http://localhost:8080";
});


test("useGetMapsSearch", async () => {
    fetch.mockResponseOnce(JSON.stringify([minecraftMap]));

    let x = await APITest(ExpectedResult.Success, useGetMapsSearch, 'some/query');
    expect(x).toBe(JSON.stringify([minecraftMap]));

    expect(fetch.mock.calls.length).toEqual(1);

    expect(fetch.mock.calls[0][0]).toBe("http://localhost:8080/search/maps?q=some%2Fquery&per_page=12&page=0");
});

test("useGetMapsSearch", async () => {
    fetch.mockResponseOnce(JSON.stringify([minecraftMap]));

    let x = await APITest(ExpectedResult.Success, useGetMapsSearch, 'some/query', 42);
    expect(x).toBe(JSON.stringify([minecraftMap]));

    expect(fetch.mock.calls.length).toEqual(1);

    expect(fetch.mock.calls[0][0]).toBe("http://localhost:8080/search/maps?q=some%2Fquery&per_page=12&page=42");
});

test("useGetMapsSearch with pages", async () => {
    fetch.mockResponseOnce(JSON.stringify([minecraftMap]));

    let x = await APITest(ExpectedResult.Success, useGetMapsSearch, 'some/query', 42, null, 1);
    expect(x).toBe(JSON.stringify([minecraftMap]));

    expect(fetch.mock.calls.length).toEqual(1);

    expect(fetch.mock.calls[0][0]).toBe("http://localhost:8080/search/maps?q=some%2Fquery&per_page=1&page=42");
});

test("useGetMap", async () => {
    fetch.mockResponseOnce(JSON.stringify(minecraftMap));

    let x = await APITest(ExpectedResult.Success, useGetMap, 30);
    expect(x).toBe(JSON.stringify(minecraftMap));

    expect(fetch.mock.calls.length).toEqual(1);

    expect(fetch.mock.calls[0][0]).toBe("http://localhost:8080/maps/30");
});

test("search_param_helper", async () => {
    const formattedURLParams = search_param_helper({ foo: 1, bar: undefined });
    expect(formattedURLParams).toBe('foo=1');
});
