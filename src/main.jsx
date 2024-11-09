import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from "react-router-dom";
import ErrorPage from "./components/ErrorPage/ErrorPage.jsx";
import Home from "./components/home/Home.jsx";
import ProductDetails from "./components/productDetails/ProductDetails.jsx";
import ProductList from "./components/ProductList/ProductList.jsx";
import Cart from "./components/cart/Cart.jsx";
import Login from "./components/login/Login.jsx";
import SignUp from "./components/signup/SignUp.jsx";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{ path: "/", element: <Home /> },
			{ path: "/*", element: <ErrorPage /> },
			{
				path: "/products/:productId",
				element: <ProductDetails />,
			},
			{
				path: "/products",
				element: <ProductList />,
			},
			{
				path: "/cart",
				element: <Cart />,
			},
			{
				path: "/login",
				element: <Login />,
			},
			{
				path: "/signup",
				element: <SignUp />,
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<RouterProvider router={router}>
			<App />
		</RouterProvider>
	</React.StrictMode>
);
