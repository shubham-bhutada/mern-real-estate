import React from "react";

const Loader = () => {
  return (
    <div class="flex items-center justify-center h-screen">
      <div class="relative">
        <div class="h-16 w-16 rounded-full border-t-8 border-b-8 border-gray-200"></div>
        <div class="absolute top-0 left-0 h-16 w-16 rounded-full border-t-4 border-b-4 border-slate-700 animate-spin"></div>
      </div>
    </div>
  );
};

export default Loader;
