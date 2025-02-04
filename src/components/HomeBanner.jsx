import React from "react";

const HomeBanner = () => {
  return (
    <div className="bg-fixed bg-cover bg-center min-h-screen flex flex-col items-center justify-center text-white">
      <h1 className="text-4xl md:text-6xl font-bold mb-4">
        Inspiration is Everywhere
      </h1>
      <p className="text-xl md:text-2xl text-gray-400">
        There is so much passion to be found playing small in settling for a
        life that is less than the one you are capable of living.
      </p>
    </div>
  );
};

export default HomeBanner;
