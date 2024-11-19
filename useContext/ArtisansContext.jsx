import {
	createContext,
	useContext,
	useReducer,
} from "react";

const ArtisansAuthContext = createContext();

const initialState = {
	isLoggedIn: localStorage.getItem("isLoggedIn") === "true",
	artisansData:
		JSON.parse(localStorage.getItem("userData")) || {},
};

function authReducer(state, action) {
	switch (action.type) {
		case "LOGIN":
			return {
				...state,
				isartisanLoggedIn: true,
				artisansData: action.payload,
			};
		case "LOGOUT":
			localStorage.removeItem("isLoggedIn");
			localStorage.removeItem("userData");
			return {
				...state,
				isLoggedIn: false,
				artisansData: {},
			};
		default:
			return state;
	}
}

export function ArtisansAuthProvider({ children }) {
	const [state, dispatch] = useReducer(
		authReducer,
		initialState
	);

	return (
		<ArtisansAuthContext.Provider
			value={{ state, dispatch }}
		>
			{children}
		</ArtisansAuthContext.Provider>
	);
}

export function useArtisansAuth() {
	return useContext(ArtisansAuthContext);
}
