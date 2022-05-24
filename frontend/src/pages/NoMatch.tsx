import { useLocation, useNavigate } from "react-router-dom";

/**
 * 404 Page Component
 * @returns {JSX.Element} the view component
 */
export default function NoMatch() {
    let location = useLocation();
    const navigate = useNavigate();

    return (
        <div style={{ padding: '1em' }}>
            <h1>404</h1>
            <h3>
                No match for <code>{location.pathname}</code>
            </h3>
            <button onClick={() => {
                navigate('/');
            }}>Home</button>
        </div>
    );
}
