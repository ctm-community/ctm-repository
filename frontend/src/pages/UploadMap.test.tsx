import '@testing-library/jest-dom';
import { render, waitFor } from '@testing-library/react';
import UploadMap from 'pages/UploadMap';


test("Default UploadMap component visibility", async () => {
  const uploadPage = render(
    <UploadMap />
  );

  await waitFor(() => uploadPage.findByLabelText('upload image'));
});
