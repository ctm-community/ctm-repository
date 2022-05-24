import { render, waitFor } from "@testing-library/react";
import NoMatch from "pages/NoMatch";
import { act } from "react-dom/test-utils";
import { MemoryRouter, Route, Routes } from "react-router-dom";

export { };

const Wrapper = ({ children, path }: { children: JSX.Element, path: string }) => {
    return (
        <MemoryRouter initialEntries={[path]}>
            <Routes>
                <Route path="/" element={<p data-testid="home-page">Home Page</p>} />
                <Route path="*" element={children} />
            </Routes>
        </MemoryRouter>
    );
};

test('NoMatch Rendering', async () => {
    let out = render(<Wrapper path={'/some/bad/route'}><NoMatch /></Wrapper>);
    let x = (await waitFor(() => out.getByText('404')));
    expect(x).toBeVisible();
    expect(x).toBeDefined();

    x = out.getByText('Home');
    expect(x).toBeVisible();
    expect(x).toBeDefined();

    act(() => {
        x.click();
    });

    expect(x).not.toBeInTheDocument();

    x = out.getByTestId('home-page');
    expect(x).toBeInTheDocument();
    expect(x.textContent).toBe('Home Page');
});
