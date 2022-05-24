import { waitFor } from '@testing-library/react';
import fetch from 'jest-fetch-mock';
import { useFetchAPI } from "utilities/fetch";
import { APITest, ExpectedResult, renderWithRouter, TestComponentGenerator } from 'utilities/testUtilities';


fetch.enableMocks();

beforeEach(() => {
    fetch.resetMocks();
    process.env.REACT_APP_PRODUCTION_API = "http://localhost:8080";
    process.env.REACT_APP_DEVELOPMENT_API = "http://localhost:8080";
});

test("useFetchApi", async () => {
    fetch.mockResponseOnce(JSON.stringify({ "abc": 1 }));

    let F = TestComponentGenerator(useFetchAPI, 'test');

    let out = renderWithRouter(<F />);

    let x = (await waitFor(() => out.getByTestId('component-tested'))).textContent;
    expect(x).toBe('{"abc":1}');

    expect(fetch.mock.calls.length).toEqual(1);

    expect(fetch.mock.calls[0][0]).toBe("http://localhost:8080/test");
});

test("useFetchApi", async () => {
    fetch.mockResponseOnce(JSON.stringify({ "abc": 1 }));

    let x = await APITest(ExpectedResult.Success, useFetchAPI, 'test');
    expect(x).toBe('{"abc":1}');

    expect(fetch.mock.calls.length).toEqual(1);

    expect(fetch.mock.calls[0][0]).toBe("http://localhost:8080/test");
});

test("useFetchApi fail", async () => {
    fetch.mockRejectOnce(new Error('nope'));

    let x = await APITest(ExpectedResult.Fail, useFetchAPI, 'test');
    expect(x).toBe("{}"); // 'Error: nope'

    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch.mock.calls[0][0]).toBe("http://localhost:8080/test");
})