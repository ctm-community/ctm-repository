import '@testing-library/jest-dom';
import { fireEvent, render, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';
import SearchBar from 'components/SearchBar';


/**
 * Ensures SearchBar renders default components when provided
 * with an empty string for the 'defaultValue' parameter
 */
test("Default SearchBar component visibility", async () => {
    const searchBar = render(
        <SearchBar
            onSearch={() => { }}
            defaultValue={""}
        />
    );

    await waitFor(() => searchBar.findByTestId("search-bar-base"));

    const searchButton = searchBar.getByLabelText("Submit search query");
    expect(searchButton).toBeInTheDocument();
    expect(searchButton).toBeVisible();

    const searchField = searchBar.getByLabelText("Search for CTM maps");
    expect(searchField).toBeInTheDocument();
    expect(searchField).toBeVisible();

    const clearSearchField = searchBar.queryByLabelText("Clear search field");
    expect(clearSearchField).toBeNull();

    const searchOptionMenu = searchBar.getByLabelText("Open search options menu");
    expect(searchOptionMenu).toBeInTheDocument();
    expect(searchOptionMenu).toBeVisible();
});

/**
 * Check that the onSearch callback triggers when form is submitted
 * or when search button is pressed
 */
test("Check onSearch event", async () => {
    const callback = jest.fn();

    const searchBar = render(
        <SearchBar
            onSearch={callback}
            defaultValue={""}
        />
    );

    await waitFor(() => searchBar.findByTestId("search-bar-base"));

    const searchInput = searchBar.getByRole("textbox");
    fireEvent.change(searchInput, { target: { value: "test" } });
    expect(searchInput).toHaveValue("test");

    const searchButton = searchBar.getByLabelText("Submit search query");
    user.click(searchButton);
    await waitFor(() => expect(callback).toHaveBeenCalledTimes(1));
    expect(callback).toHaveBeenCalledWith("test");

    const clearSearchField = searchBar.getByLabelText("Clear search field");
    user.click(clearSearchField);
    await waitFor(() => expect(callback).toHaveBeenCalledTimes(2));
    expect(callback).toHaveBeenCalledWith("");
});

/**
 * Check the text can be typed and cleared from search bar
 */
test("Clear search field", async () => {
    const callback = jest.fn();

    const searchBar = render(
        <SearchBar
            onSearch={callback}
            defaultValue={""}
        />
    );

    await waitFor(() => searchBar.findByTestId("search-bar-base"));

    const searchInput = searchBar.getByRole("textbox");
    fireEvent.change(searchInput, { target: { value: "test" } });
    expect(searchInput).toHaveValue("test");

    const clearSearchField = searchBar.getByLabelText("Clear search field");
    user.click(clearSearchField);
    await waitFor(() => expect(callback).toHaveBeenCalledTimes(1));
    expect(searchInput).toHaveValue("");
});
