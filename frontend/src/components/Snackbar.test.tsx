import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { ISnackbarMsg, SnackbarComponent, useSnackbar } from 'components/Snackbar';
import { useEffect } from 'react';
import { act } from 'react-dom/test-utils';

const F = ({ msg }: { msg: ISnackbarMsg }) => {
    return (<SnackbarComponent>
        <Inner msg={msg} />
    </SnackbarComponent>);
}

const Inner = ({ msg }: { msg: ISnackbarMsg }) => {
    let snackFunc = useSnackbar();

    useEffect(() => {
        snackFunc(msg);
    }, []);

    return (<p>Testing!</p>);
};

test('snackbar error', async () => {
    const out = render(<F msg={{ text: 'Testing Snackbar', type: 'error' }} />);

    const snackbarElement = await out.findByText('Testing Snackbar');
    expect(snackbarElement).toBeVisible();

    const button = out.getByLabelText('Close');

    act(() => button.click());

    expect(out.queryByText('Testing Snackbar')).toBeNull();
});

test('snackbar warning', async () => {
    const out = render(<F msg={{ text: 'Testing Snackbar', type: 'warning' }} />);

    const snackbarElement = await out.findByText('Testing Snackbar');
    expect(snackbarElement).toBeVisible();

    const button = out.getByLabelText('Close');

    act(() => button.click());

    expect(out.queryByText('Testing Snackbar')).toBeNull();
});

test('snackbar info', async () => {
    const out = render(<F msg={{ text: 'Testing Snackbar', type: 'info' }} />);

    const snackbarElement = await out.findByText('Testing Snackbar');
    expect(snackbarElement).toBeVisible();

    const button = out.getByLabelText('Close');

    act(() => button.click());

    expect(out.queryByText('Testing Snackbar')).toBeNull();
});

test('snackbar success', async () => {
    const out = render(<F msg={{ text: 'Testing Snackbar', type: 'success' }} />);

    const snackbarElement = await out.findByText('Testing Snackbar');
    expect(snackbarElement).toBeVisible();

    const button = out.getByLabelText('Close');

    act(() => button.click());

    expect(out.queryByText('Testing Snackbar')).toBeNull();
});

test('snackbar type error', async () => {
    const err = console.error;
    console.error = jest.fn();

    // @ts-ignore
    const out = expect(() => render(<F msg={{ text: 'Testing Snackbar', type: undefined }} />)).toThrow(TypeError);

    // @ts-ignore
    const out2 = expect(() => render(<F msg={{ text: undefined, type: 'error' }} />)).toThrow(TypeError);

    console.error = err;
});
