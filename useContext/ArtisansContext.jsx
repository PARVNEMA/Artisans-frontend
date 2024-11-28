import {
	createContext,
	useContext,
	useReducer,
	useState,
} from "react";

const ArtisansAuthContext = createContext();

export function ArtisansAuthProvider({ children }) {
	const [artisansloggedIn, setartisansloggedIn] =
		useState(false);

	return (
		<ArtisansAuthContext.Provider
			value={{ artisansloggedIn, setartisansloggedIn }}
		>
			{children}
		</ArtisansAuthContext.Provider>
	);
}

export function useAuthArtisans() {
	return useContext(ArtisansAuthContext);
}
