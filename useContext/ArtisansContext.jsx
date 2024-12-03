import axios from "axios";
import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useReducer,
	useState,
} from "react";

const ArtisansAuthContext = createContext();

export function ArtisansAuthProvider({ children }) {
	const [artisansloggedIn, setartisansloggedIn] =
		useState(false);
	const [artisans, setArtisans] = useState(null);
	const backendurl = import.meta.env.VITE_URL;
	const getCurrentArtisans = useCallback(async () => {
		try {
			const res = await axios.get(
				`${backendurl}/artisans/current-user`,
				{
					withCredentials: true,
					headers: {
						Authorization: `Bearer ${localStorage.getItem(
							"artisansaccessToken"
						)}`,
					},
				}
			);
			console.log(
				"res in getcurrent artisans in artisansContext=",
				res.data
			);
			setArtisans(res.data.data);
		} catch (error) {
			console.log("Error", error);
		}
	}, []);

	useEffect(() => {
		getCurrentArtisans();
	}, [artisansloggedIn]);
	return (
		<ArtisansAuthContext.Provider
			value={{
				artisansloggedIn,
				setartisansloggedIn,
				artisans,
				setArtisans,
			}}
		>
			{children}
		</ArtisansAuthContext.Provider>
	);
}

export function useAuthArtisans() {
	return useContext(ArtisansAuthContext);
}
