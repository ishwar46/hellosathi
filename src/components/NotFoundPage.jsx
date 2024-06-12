import React from "react";
import Lottie from "react-lottie";
import animationData from "../assets/animations/404.json";

const NotFoundPage = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <Lottie options={defaultOptions} height={400} width={400} />
      <h1 className="text-4xl font-bold text-gray-800">404 Not Found</h1>
      <p className="text-lg text-gray-600 mt-2">
        The page you are looking for does not exist.
      </p>
    </div>
  );
};

export default NotFoundPage;
