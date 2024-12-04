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

import ProductList from "./components/ProductList/ProductList.jsx";
import Cart from "./components/cart/Cart.jsx";
import Login from "./components/login/Login.jsx";
import SignUp from "./components/signup/SignUp.jsx";
import ContactUs from "./components/contactus/ContactUs.jsx";
import Aboutus from "./components/Aboutus/Aboutus.jsx";
import Artisans from "./components/Artisans/Artisans.jsx";
import ArtisansLogin from "./components/Artisans/artisanslogin/ArtisansLogin.jsx";
import ArtisansSignup from "./components/Artisans/artisanssignup/ArtisansSignup.jsx";
import ArtisansPage from "./components/Artisans/artisanspage/ArtisansPage.jsx";
import Dashboard from "./components/Artisans/dashboard/Dashboard.jsx";
import ProductListing from "./components/Artisans/productlisting/productListing.jsx";
import UserProfile from "./components/userprofile/UserProfile.jsx";
import { AuthProvider } from "../useContext/loginContext.jsx";
import { CookiesProvider } from "react-cookie";
import { ArtisansAuthProvider } from "../useContext/ArtisansContext.jsx";
import Aa from "./components/Aa/Aa.jsx";
import Aaa from "./components/Aaa/Aaa.jsx";
import DetailedProduct from "./components/detailedproduct/DetailedProduct.jsx";
import CategoryProducts from "./components/category/CategoryProducts.jsx";
import AddressForm from "./components/AddressForm/AddressForm.jsx";

import OtherArtisans from "./components/Artisans/otherartisans/OtherArtisans.jsx";
import GTranslateLoader from "./components/Translate/GTranslateLoader.jsx";
import CurrencyProvider from "../useContext/CurrencyContext.jsx";
import UpdateProduct from "./components/updateproduct/UpdateProduct.jsx";
import Wishlist from "./components/wishlist/Wishlist.jsx";
import AdminSignup from "./components/admin/AdminSignup.jsx";
import AdminLogin from "./components/admin/AdminLogin.jsx";
import AdminHome from "./components/admin/AdminHome.jsx";
// import customize from "./components/customize/customize.jsx";
// import Chatapp from "./components/chat/Chatapp.jsx";
import ChatPage from "./components/chatpage/ChatPage.jsx";
import Bill from "./components/Bill/Bill.jsx";
import YourOrders from "./components/userprofile/YourOrders.jsx";
import PendingOrders from "./components/Artisans/dashboard/PendingOrders.jsx";
import UpdateArtisanProfile from "./components/Artisans/updateartisansprofile/UpdateArtisanProfile.jsx";
import ReturnProduct from "./components/userprofile/ReturnProduct.jsx";
const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{ path: "/", element: <Home /> },
			{ path: "/*", element: <ErrorPage /> },
			{
				path: "/products",
				element: <ProductList />,
			},
			{
				path: "/customize",
				element: <ChatPage />,
			},
			{
				path: "/address",
				element: <AddressForm />,
			},
			{
				path: "/cart",
				element: <Cart />,
			},
			{
				path: "/bill",
				element: <Bill />,
			},
			{
				path: "/wishlist",
				element: <Wishlist />,
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
				element: <UserProfile />,
			},
			{
				path: "/aboutus",
				element: <Aboutus />,
			},
			{
				path: "/aa",
				element: <Aa />,
			},
			{
				path: "/aaa",
				element: <Aaa />,
			},
			{
				path: "/artisans",
				element: <Artisans />,
				children: [
					{
						path: "/artisans/page",
						element: <ArtisansPage />,
					},
					{
						path: "/artisans/login",
						element: <ArtisansLogin />,
					},
					{
						path: "/artisans/signup",
						element: <ArtisansSignup />,
					},
					{
						path: "/artisans/dashboard",
						element: <Dashboard />,
					},
					{
						path: "/artisans/productlisting",
						element: <ProductListing />,
					},
					{
						path: "/artisans/updateproduct/:productId",
						element: <UpdateProduct />,
					},
					{
						path: "/artisans/pendingorders",
						element: <PendingOrders />,
					},
					{
						path: "/artisans/updateprofile",
						element: <UpdateArtisanProfile />,
					},
				],
			},
			{
				path: "/productdetails/:id",
				element: <DetailedProduct />,
			},
			{
				path: "/category/:categoryid",
				element: <CategoryProducts />,
			},
			{
				path: "/artisans/:artisanid",
				element: <OtherArtisans />,
			},
			{
				path: "/adminsignup",
				element: <AdminSignup />,
			},
			{
				path: "/adminlogin",
				element: <AdminLogin />,
			},
			{
				path: "/admin",
				element: <AdminHome />,
			},
			{
				path: "/chat/:artisanId/:userId/:productId",
				element: <ChatPage />,
			},
			{
				path: "/myorders",
				element: <YourOrders />,
			},
			{
				path: "/returnorder/:orderId/:orderItemId",
				element: <ReturnProduct />,
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<AuthProvider>
			<ArtisansAuthProvider>
				<CurrencyProvider>
					<RouterProvider router={router}>
						<App />
					</RouterProvider>
				</CurrencyProvider>
			</ArtisansAuthProvider>
		</AuthProvider>
	</React.StrictMode>
);
