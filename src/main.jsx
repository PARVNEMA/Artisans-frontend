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
import ContactUs from "./components/contactus/ContactUs.jsx";
import Aboutus from "./components/aboutus/Aboutus.jsx";
import Artisans from "./components/Artisans/Artisans.jsx";
import ArtisansLogin from "./components/Artisans/artisanslogin/ArtisansLogin.jsx";
import ArtisansSignup from "./components/Artisans/artisanssignup/ArtisansSignup.jsx";
import ArtisansPage from "./components/Artisans/artisanspage/ArtisansPage.jsx";
import Dashboard from "./components/Artisans/dashboard/Dashboard.jsx";
import ProductListing from "./components/Artisans/productlisting/productListing.jsx";
import UserProfile from "./components/userprofile/UserProfile.jsx";


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
			{
				path: "/contactus",
				element: <ContactUs />,
			},
			{
				path: "/userprofile",
				element: <UserProfile />
			},
			{
				path:"/aboutus",
				element:<Aboutus/>
			},
			{
				path:"/artisans",
				element:<Artisans/>,
				children:
					[
						{
							path:"/artisans/page",
							element:<ArtisansPage/>
						},
						{
							path:"/artisans/login",
							element:<ArtisansLogin/>
						},
						{
							path:"/artisans/signup",
							element:<ArtisansSignup/>
						},
						{
							path:"/artisans/dashboard",
							element:<Dashboard/>,
						},
						{
							path:"/artisans/productlisting",
							element:<ProductListing />
						}
						
					]
				
			}
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
