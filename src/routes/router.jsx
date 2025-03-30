import { createBrowserRouter } from "react-router-dom";
import { UserLayout } from "../layout/UserLayout";
import Home from "../pages/user/Home";
import RestaurantDetails from "../pages/user/RestaurantDetails";
import { Menus } from "../pages/user/Menus";
import { MenuItemDetails } from "../pages/user/MenuItemDetails";
import { Cart } from "../pages/user/Cart";
import { Orders } from "../pages/user/Orders";
import Signup from "../pages/user/signupPage"; 
import Login from "../pages/user/LoginPage"; // Ensure correct import
import SearchResults from "../pages/user/SearchResults";
import ErrorPage from "../pages/shared/ErrorPage"; 
import About from "../pages/user/about";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "restaurant/:id", element: <RestaurantDetails /> },
      { path: "restaurants/:id/menus", element: <Menus /> },
      { path: "menu-item/:menuItemId", element: <MenuItemDetails /> },
      { path: "cart", element: <Cart /> },
      { path: "orders", element: <Orders /> },
      { path: "signup", element: <Signup /> },
      { path: "login", element: <Login /> }, // Corrected route name
      { path: "search", element: <SearchResults /> },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);
