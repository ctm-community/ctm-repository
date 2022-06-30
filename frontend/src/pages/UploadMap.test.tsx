import '@testing-library/jest-dom';
import { render, waitFor } from '@testing-library/react';
import UploadMap from 'pages/UploadMap';


test("Default SearchBar component visibility", async () => {
  const uploadPage = render(
    <UploadMap />
  );

  await waitFor(() => uploadPage.findByLabelText('select image'));

  const searchButton = uploadPage.getByLabelText("upload image");
  expect(searchButton).toBeInTheDocument();
  expect(searchButton).toBeVisible();

  // const searchField = searchBar.getByLabelText("Search for CTM maps");
  // expect(searchField).toBeInTheDocument();
  // expect(searchField).toBeVisible();

  // const clearSearchField = searchBar.queryByLabelText("Clear search field");
  // expect(clearSearchField).toBeNull();

  // const searchOptionMenu = searchBar.getByLabelText("Open search options menu");
  // expect(searchOptionMenu).toBeInTheDocument();
  // expect(searchOptionMenu).toBeVisible();
});
