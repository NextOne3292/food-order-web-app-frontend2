import { Link, useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col items-center justify-center text-center px-4">
      {/* Empty Plate Image */}
      <img
        src="/images/emptyplate.jpg" // Replace with your preferred image URL
        alt="Empty Plate"
        className="w-48 h-auto mb-6 animate-pulse"
      />

      <h1 className="text-4xl font-bold text-red-600">404 - Page Not Found</h1>
      <p className="text-gray-600 mt-2">Oops! Looks like this plate is empty. 🍽️</p>

      <div className="mt-4 space-y-3">
        {/* Go Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="bg-pink-500 text-black px-5 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          🔙 Go Back
        </button>

        {/* Go to Home Link */}
        <Link to="/" className="block text-blue-500 hover:underline">
          🏠 Go to Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;

