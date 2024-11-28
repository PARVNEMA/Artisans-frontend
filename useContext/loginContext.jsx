import {
	createContext,
	useContext,
	useReducer,
	useState,
} from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
	const [loggedIn, setloggedIn] = useState(false);

	return (
		<AuthContext.Provider value={{ loggedIn, setloggedIn }}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	return useContext(AuthContext);
}
