import { User, ShoppingBag, MapPin } from "lucide-react";
import { NavLink } from "react-router-dom";

const UserSidebar = ({ user }) => {
  return (
    
      <div className="p-6 pt-8 mt-15 flex flex-col items-center text-center space-y-6 bg-white h-full shadow-sm">

      {/* Profile Avatar */}
      <img
                  src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  alt="User"
                 className="w-24 h-24 rounded-full border-4 border-gray-500 shadow-md"
      />

      {/* User Info */}
      <div className="mt-4">
  <h2 className="text-xl font-semibold text-gray-800">{user.name}</h2>
  <p className="text-sm text-gray-600">{user.email}</p>
  <p className="text-sm text-gray-600">{user.mobile}</p>
</div>

      {/* Sidebar Links */}
      <nav className="w-full text-left space-y-4 mt-6">
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `w-full flex items-center gap-3 px-3 py-2 rounded-md ${
              isActive ? "bg-green-100 text-green-600" : "text-gray-700 hover:text-green-600"
            }`
          }
        >
          <User className="w-5 h-5" />
          <span>Profile</span>
        </NavLink>

        <NavLink
          to="/orders"
          className={({ isActive }) =>
            `w-full flex items-center gap-3 px-3 py-2 rounded-md ${
              isActive ? "bg-green-100 text-green-600" : "text-gray-700 hover:text-green-600"
            }`
          }
        >
          <ShoppingBag className="w-5 h-5" />
          <span>Orders</span>
        </NavLink>

        <NavLink
          to="/address"
          className={({ isActive }) =>
            `w-full flex items-center gap-3 px-3 py-2 rounded-md ${
              isActive ? "bg-green-100 text-green-600" : "text-gray-700 hover:text-green-600"
            }`
          }
        >
          <MapPin className="w-5 h-5" />
          <span>Address</span>
        </NavLink>
      </nav>
    </div>
  );
};

export default UserSidebar;
