import { createBrowserRouter } from "react-router-dom";

// ✅ User Pages
import {UserLayout} from "../layout/UserLayout";
import Home from "../pages/user/Home";
import RestaurantDetails from "../pages/user/RestaurantDetails";
import Cart from "../pages/user/CartPage";
import OrderPage from "../pages/user/OrderPage";
import Signup from "../pages/user/signupPage";
import Login from "../pages/user/LoginPage";
import Logout from "../pages/user/LogoutPage";

import UserProfilePage from "../pages/user/UserProfilePage";
import AddressPage from "../pages/user/AddressPage";
import SearchResults from "../pages/user/SearchResults";
import About from "../pages/user/About";
import PaymentPage from "../pages/user/PaymentPage";
import SuccessPage from "../pages/user/SuccessPage";
import CancelPage from "../pages/user/CancelPage";
import ErrorPage from "../pages/shared/ErrorPage";



// ✅ Admin Pages
import AdminLayout from "../layout/AdminLayout"; 
import AdminLogin from '../pages/admin/AdminLogin';
import Dashboard from "../pages/admin/Dashboard";
import ManageRestaurants from "../pages/admin/ManageRestaurants";
import ManageMenus from "../pages/admin/ManageMenus";
import ManageOrders from "../pages/admin/ManageOrders";
import ManageUsers from "../pages/admin/ManageUsers";
import {AdminRestaurantDetails} from "../pages/admin/AdminRestaurantDetails";
import {AdminMenuDetails} from "../pages/admin/AdminMenuDetails";
import {AdminOrderDetails} from "../pages/admin/AdminOrderDetails";
import {AdminUserDetails} from "../pages/admin/AdminUserDetails";


// ✅ Router Setup
export const router = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "restaurant/:id", element: <RestaurantDetails /> },
      
      
      { path: "cart", element: <Cart /> },
      { path: "orders", element: <OrderPage /> },
      { path: "signup", element: <Signup /> },
      { path: "login", element: <Login /> },
      { path: "profile", element: <UserProfilePage /> },
      { path: "address", element: <AddressPage /> },
      { path: "logout", element: <Logout /> },
      { path: "search", element: <SearchResults /> },
      { path: "payment", element: <PaymentPage /> },
      { path: "payment-success", element: <SuccessPage /> },
      { path: "cancel", element: <CancelPage /> },
    ],
  },

  // ✅ Admin Section Routes
  {
    path: "/admin-login",
    element: <AdminLogin />,
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      
      { path: "dashboard", element: <Dashboard /> },
      { path: "restaurants", element: <ManageRestaurants /> },
      { path: "menus", element: <ManageMenus /> },
      { path: "orders", element: <ManageOrders /> },
      { path: "users", element: <ManageUsers /> },
      
    { path: "restaurants/:id", element: <AdminRestaurantDetails /> },
    { path: "menus/:id", element: <AdminMenuDetails /> },
    { path: "orders/:id", element: <AdminOrderDetails /> },
    { path: "users/:id", element: <AdminUserDetails /> },
    ],
  },

  // ✅ Catch-all error route
  {
    path: "*",
    element: <ErrorPage />,
  },
]);