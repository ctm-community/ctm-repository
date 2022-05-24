import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { createContext, ReactNode, useContext, useReducer } from 'react';

/**
 * Interface which defines what to dispatch
 */
export interface ISnackbarMsg {
    type: 'error' | 'warning' | 'info' | 'success' | null,
    text: string
}

// note: ignore the lambda function defined here, its just for type inference
const SnackbarContext = createContext((msg: ISnackbarMsg) => { });

/**
 * This will return dispatchMsg with arguments of state.
 * 
 * use the useSnackbar hook when wanting to dispatch a snackbar message.
 */
export const useSnackbar = () => useContext(SnackbarContext);


const initialState: ISnackbarMsg = { type: null, text: '' };

/**
 * A function used to process new dispatched snackbar messages
 * DO NOT CALL DIRECTLY. Use `useSnackbar` instead.
 * 
 * @param {ISnackbarMsg} _ the last message, is ignored
 * @param {ISnackbarMsg} action the new message to dispatch
 * @returns {ISnackbarMsg} the new state
 */
function reducer(_: ISnackbarMsg, action: ISnackbarMsg) {
    if (typeof action.text !== 'string') {
        throw new TypeError(`SnackBar: Expected string for text, but got ${action.text}`)
    }
    const clean = { type: action.type, text: action.text };

    switch (clean.type) {
        case 'error':
            return clean;
        case 'warning':
            return clean;
        case 'info':
            return clean;
        case 'success':
            return clean;
        case null:
            return { type: null, text: '' };
        default:
            throw new TypeError(`SnackBar: Unexpected value for type, got ${clean.type}`);
    }
}

/**
 * Defines how long a message should stay up for
 * @param {ISnackbarMsg} state the current message
 * @returns the number of milliseconds, or null to disable auto-hiding
 */
function getAutoHideDuration(state: ISnackbarMsg): number | null {
    switch (state.type) {
        case 'error':
            return null; // never auto hide    
        case 'warning':
            return null; // never auto hide  
        case 'info':
            return 12000; // 12 sec
        case 'success':
            return 6000; // 6 sec
        default:
            return null;
    }
}


export interface IProps {
    children: ReactNode
}

/**
 * The Snackbar system wrapper. Anything that wants to use the system must be a child of
 * this component, so it must be placed near the root of the component tree.
 * @param {IProps} props the only prop in children. Only things in children can use this system
 * @returns {JSX.Element} the view
 */
export function SnackbarComponent(props: IProps): JSX.Element {
    const [state, dispatchMsg] = useReducer(reducer, initialState);

    const handleClose = () => {
        dispatchMsg(initialState);
    }

    return (
        <SnackbarContext.Provider value={dispatchMsg}>
            {props.children}
            <Snackbar
                open={Boolean(state.type)}
                autoHideDuration={getAutoHideDuration(state)}
                onClose={handleClose}
                key={state.text} // correct?
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                <MuiAlert elevation={6} variant="filled" onClose={handleClose} severity={state.type === null ? undefined : state.type} sx={{ width: '100%' }}>
                    {state.text}
                </MuiAlert>
            </Snackbar>
        </SnackbarContext.Provider>
    );
}
