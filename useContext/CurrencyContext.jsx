import React, {
	createContext,
	useState,
	useEffect,
} from "react";

export const CurrencyContext = createContext();

const CurrencyProvider = ({ children }) => {
	const [currency, setCurrency] = useState(
		localStorage.getItem("currency") || "INR"
	);

	// Update currency in localStorage whenever it changes
	useEffect(() => {
		localStorage.setItem("currency", currency);
	}, [currency]);

	return (
		<CurrencyContext.Provider
			value={{ currency, setCurrency }}
		>
			{children}
		</CurrencyContext.Provider>
	);
};

export default CurrencyProvider;
