import { createContext, useContext, useReducer } from 'react';

const ArtisansAuthContext = createContext();

const initialState = {
    isLoggedIn: false,
    artisansData: {}
};

function authReducer(state, action) {
    switch (action.type) {
        case 'LOGIN':
            return { ...state, isartisanLoggedIn: true, artisansData: action.payload };
        case 'LOGOUT':
            return { ...state, isartisanLoggedIn: false, artisansData: {} };
        default:
            return state;
    }
}

export function ArtisansAuthProvider({ children }) {
    const [state, dispatch] = useReducer(authReducer, initialState);

    return (
        <ArtisansAuthContext.Provider value={{ state, dispatch }}>
            {children}
        </ArtisansAuthContext.Provider>
    );
}

export function useArtisansAuth() {
    return useContext(ArtisansAuthContext);
}