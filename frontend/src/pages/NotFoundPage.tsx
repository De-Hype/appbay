import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="max-h-screen max-w-screen h-screen w-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900">404</h1>
        <p className="mt-2 text-lg text-gray-600">Page not found</p>
        <Link
          to="/users"
          className="mt-4 inline-block text-blue-600 hover:underline"
        >
          Go to users page
        </Link>
      </div>
    </div>
  );
};
export default NotFoundPage;
