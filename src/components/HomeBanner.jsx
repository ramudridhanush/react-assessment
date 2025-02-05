import React from "react";

const HomeBanner = () => {
  return (
    <div className="bg-fixed bg-cover bg-center min-h-[60vh] flex flex-col items-center justify-center text-white">
      <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-cyan-500 py-4 to-blue-600 text-transparent bg-clip-text">
        Welcome to <span className="text-white">My</span><span className="bg-gradient-to-r from-cyan-500 py-4 to-blue-600 text-transparent bg-clip-text">Blog</span>
      </h1>
      <p className="text-xl md:text-2xl text-gray-400 font-bold  text-white  ">
        A place where you can share your thoughts and ideas with the world.
      </p>
    </div>
  );
};

export default HomeBanner;
