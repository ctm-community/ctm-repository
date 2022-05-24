import { UseFetchError } from "react-fetch-hook";
import { useNavigate } from "react-router-dom";

/**
 * Properties used by ErrorPage
 */
export interface IErrorProps {
    error: UseFetchError,
}

/**
 * Generic Error Page Component
 * @returns {JSX.Element} the view component
 */
export default function ErrorPage({ error }: IErrorProps): JSX.Element {
    const navigate = useNavigate();

    return (
        <div style={{ padding: '1em' }}>
            <h1>{error.status}</h1>
            <button aria-label="Home" onClick={() => {
                navigate('/');
            }}>Home</button>
        </div>
    );
};
