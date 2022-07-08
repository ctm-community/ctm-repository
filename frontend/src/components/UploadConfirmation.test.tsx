import '@testing-library/jest-dom';

import { render, renderHook, waitFor } from '@testing-library/react';
import ConfirmationDialog from 'components/UploadConfirmation';
import { useEffect } from 'react';
import { PercentCrop } from 'react-image-crop';


test("Default UploadConfirmation component visibility", async () => {
  const crop: PercentCrop = {
    x: 50,
    y: 50,
    width: 25,
    height: 25,
    unit: '%'
  };

  const img = render(<img />);

  const uploadPage = render(
    // @ts-ignore
    <ConfirmationDialog completedCrop={crop} image={img.baseElement} />
  );

  await waitFor(() => uploadPage.findByLabelText("crop preview"));

  const button = uploadPage.getByLabelText("Cancel");
  expect(button).toBeInTheDocument();

  const button2 = uploadPage.getByLabelText("Accept");
  expect(button2).toBeInTheDocument();

  renderHook(() => {
    useEffect(() => button.click(), []);
  });
});
