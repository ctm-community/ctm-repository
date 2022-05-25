/**
 * Testing utility module. DO NOT USE THIS CODE OUTSIDE OF UNIT TESTING
 */
import { render, waitFor } from '@testing-library/react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { MinecraftMap } from 'utilities/api';

/**
 * An example map for unit testing
 */
export const minecraftMap: MinecraftMap = {
    id: 1,
    name: "Map Name",
    uploadDate: 1612832101,
    author: "Author Name",
    length: "Medium",
    objectiveMain: 1,
    objectiveBonus: 2,
    difficulty: "Hard",
    descriptionShort: "Short Map Description",
    downloadCount: 42,
    type: "Linear",
    imageUrl: "/images/example.png",
    series: "Map Series",
    minecraftVersion: "1.16.5"
};

/**
 * Test-only: Wrapper component to ensure that children live as descents of a Router element
 * so that useNavigate works
 * @param children the components to wrap
 * @returns the view
 */
export const Wrapper = ({ children }: { children: JSX.Element }) => {
    return (
        <HashRouter>
            <Routes>
                <Route path="*" element={children} />
            </Routes>
        </HashRouter>
    );
};

/**
 * Test-only: Generate a component with a given hook like useFetchAPI and arguments to call it with
 * @param hook A hook with an interface like useFetchAPI
 * @param args The arguments to call the hook with
 * @returns the component
 */
export const TestComponentGenerator = (hook: any, ...args: any[]) => {
    return () => {
        let [isLoading, data, err] = hook(...args);

        if (isLoading) {
            return <></>;
        }
        else {
            if (err) {
                return <p data-testid="component-error">{JSON.stringify(err)}</p>;
            }
            else {
                return <p data-testid="component-tested">{JSON.stringify(data)}</p>;
            }
        }
    };
};

/**
 * Test-only: Wraps components with <Wrapper> before rendering
 * @param node The component to render
 * @returns result of rendering
 */
export const renderWithRouter = (node: JSX.Element) => render(<Wrapper>{node}</Wrapper>);

/**
 * Test-only: An enum to represent whether APITest should expect
 * a success or error
 */
export enum ExpectedResult {
    Success,
    Fail
}

/**
 * Test-only: A function to help test api calls
 * @param expectedResult Whether to expect a successful fetch or error
 * @param hook the api hook to test
 * @param args the arguments to supply to the api hook
 * @returns the content or err as a json string
 */
export const APITest = async (expectedResult: ExpectedResult, hook: any, ...args: any[]) => {
    let F = TestComponentGenerator(hook, ...args);

    let out = renderWithRouter(<F />);

    let idName = '';
    switch (expectedResult) {
        case ExpectedResult.Success:
            idName = 'component-tested';
            break;
        case ExpectedResult.Fail:
            idName = 'component-error';
            break;
        default:
            throw new Error(`Invalid option: ${expectedResult}`);
    }

    return (await waitFor(() => out.getByTestId(idName))).textContent;
}