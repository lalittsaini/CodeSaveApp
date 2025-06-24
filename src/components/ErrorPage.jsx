import React from "react";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col justify-center items-center text-center px-4">
      <h1 className="text-4xl font-bold mb-4 text-red-500">404 - Not Found</h1>
      <p className="text-lg text-gray-400 mb-6">
        The page you're looking for doesn't exist or an unexpected error occurred.
      </p>
      <button
        onClick={() => navigate("/")}
        className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200 transition"
      >
        Go to Home
      </button>
    </div>
  );
};

export default ErrorPage;
