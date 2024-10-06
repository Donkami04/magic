import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-radial-custom">
      <h1 className="text-6xl font-bold text-red-500">404</h1>
      <p className="mt-4 text-2xl text-red-700">Oops! Page not found.</p>
      <p className="mt-2 text-gray-500">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="mt-6 px-6 py-3 text-lg text-white bg-blue-magiclog hover:bg-blue-600 rounded-md"
      >
        Go Back Home
      </Link>
    </div>
  );
};
