import { createBrowserRouter } from "react-router-dom";
import { UserLayout } from "../layout/UserLayout";
import { Home } from "../pages/user/Home.jsx";
import { Signup } from "../pages/shared/Signup";
import { Login } from "../pages/shared/Login";
import { Restaurants } from "../pages/user/Restaurants";
import { RestaurantDetails } from "../pages/user/RestaurantDetails";
import { ErrorPage } from "../pages/shared/ErrorPage";
import { AdminLayout } from "../layout/AdminLayout";
import { Profile } from "../pages/user/Profile";
import { ProtectedRoute } from "./ProtectedRoute";
import { ProtectedRouteAdmin } from "./ProtectedRouteAdmin";
import { Footer } from "../components/user/Footer";
import { Cart } from "../pages/user/Cart";
import { UserHeader } from "../components/user/UserHeader";
import { MenuDetails } from "../pages/user/MenuDetails";
import { CreateRestaurant } from "../pages/admin/CreateRestaurant";
import { CreateMenu } from "../pages/admin/CreateMenu";
import { Menus } from "../pages/user/Menus";  // Ensure this exists

export const router = createBrowserRouter([
    {
        path: "/",
        element: <UserLayout />,
        errorElement: <ErrorPage />,
        children: [
            { path: "", element: <Home /> },
            { path: "signup", element: <Signup /> },
            { path: "login", element: <Login /> },
            { path: "restaurants", element: <Restaurants /> },
            { path: "restaurant/:restaurantId", element: <RestaurantDetails /> },
            { path: "menu", element: <Menus /> },
            { path: "menu/:menuId", element: <MenuDetails /> },
            {
                element: <ProtectedRoute />,
                path: "user",
                children: [
                    { path: "wishlist", element: <h1>Wishlist</h1> },
                    { path: "profile", element: <Profile /> },
                    { path: "cart", element: <Cart /> },
                    { path: "orders", element: <h1>Orders Page</h1> },
                    { path: "payment/success", element: <h2>Payment Success</h2> },
                ],
            },
        ],
    },
    {
        path: "admin",
        element: <AdminLayout />,
        errorElement: <ErrorPage role="Admin" />,
        children: [
            { path: "login", element: <Login role="Admin" /> },
            { path: "signup", element: <Signup role="admin" /> },
            {
                path: "",
                element: <ProtectedRouteAdmin />,
                children: [
                    { path: "dashboard", element: <h1>Admin Dashboard</h1> },
                    { path: "all-restaurants", element: <h1>All Restaurants</h1> },
                    { path: "all-menus", element: <h1>All Menus</h1> },
                    { path: "profile", element: <h1>Admin Profile Page</h1> },
                    { path: "create-restaurant", element: <CreateRestaurant /> },
                    { path: "create-menu", element: <CreateMenu /> },
                ],
            },
        ],
    },
]);
