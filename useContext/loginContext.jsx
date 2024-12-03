import axios from "axios";
import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useReducer,
	useState,
} from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
	const [loggedIn, setloggedIn] = useState(false);
	const [user, setUser] = useState(null);
	const backendurl = import.meta.env.VITE_URL;
	const getCurrentUser = useCallback(async () => {
		try {
			const res = await axios.get(
				`${backendurl}/customers/current-user`,
				{
					withCredentials: true,
					headers: {
						Authorization: `Bearer ${localStorage.getItem(
							"accessToken"
						)}`,
					},
				}
			);
			console.log(
				"res in getcurrent user loginContext=",
				res.data
			);
			setUser(res.data.data);
		} catch (error) {
			console.log("Error", error);
		}
	}, []);
	useEffect(() => {
		getCurrentUser();
	}, [loggedIn]);

	return (
		<AuthContext.Provider
			value={{ loggedIn, setloggedIn, user, setUser }}
		>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	return useContext(AuthContext);
}
