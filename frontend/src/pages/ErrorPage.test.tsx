import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import ErrorPage from 'pages/ErrorPage';
import { act } from 'react-dom/test-utils';
import { Wrapper } from 'utilities/testUtilities';


test('Error page', async () => {
    let err = new Error();
    // @ts-ignore
    err.status = 500;
    // @ts-ignore
    err.statusText = "Internal Server Error";

    // @ts-ignore
    let out = render(<Wrapper><ErrorPage error={err} /></Wrapper>);
    let parts = await out.findByText('500');
    expect(parts).toBeInTheDocument();
});

test('Error page click', async () => {
    const err = new Error();
    // @ts-ignore
    err.status = 500;
    // @ts-ignore
    err.statusText = "Internal Server Error";

    // @ts-ignore
    const out = render(<Wrapper><ErrorPage error={err} /></Wrapper>);
    const parts = await out.findByText('500');
    expect(parts).toBeInTheDocument();

    const button = out.getByLabelText('Home');
    act(() => button.click());
});
