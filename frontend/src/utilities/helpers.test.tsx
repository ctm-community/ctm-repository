import '@testing-library/jest-dom';
import { render, waitFor } from '@testing-library/react';
import { If, IfElse } from 'utilities/helpers';


test("If", async () => {
  const page = render(
    <div aria-label="test">
      <If condition={true}>
        <p>Paragraph</p>
      </If>
      <If condition={false}>
        <p>ShouldNotExist</p>
      </If>
    </div>
  );

  await waitFor(() => page.findByLabelText("test"));
  expect(page.getByText("Paragraph")).toBeInTheDocument();
  expect(page.queryByText("ShouldNotExist")).toBeNull();
});

test("If-Else", async () => {
  const page = render(
    <div aria-label="test">
      <IfElse condition={true} ifChildren={
        <p>ShouldExist1</p>
      } elseChildren={
        <p>ShouldNotExist1</p>
      } />

      <IfElse condition={false} ifChildren={
        <p>ShouldNotExist2</p>
      } elseChildren={
        <p>ShouldExist2</p>
      } />
    </div>
  );

  await waitFor(() => page.findByLabelText("test"));
  expect(page.getByText("ShouldExist1")).toBeInTheDocument();
  expect(page.getByText("ShouldExist2")).toBeInTheDocument();
  expect(page.queryByText("ShouldNotExist1")).toBeNull();
  expect(page.queryByText("ShouldNotExist2")).toBeNull();
});
