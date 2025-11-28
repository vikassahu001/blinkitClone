import React from 'react';

const FullScreenLoader = () => {
  return (
    // 1. Background container: Fixed, covers screen, white background, high z-index
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white">
      
      {/* 2. The Spinner */}
      {/* 'animate-spin' rotates the div. 'border-t-green-600' gives the color stripe */}
      <div className="w-16 h-16 border-4 border-gray-200 border-t-green-600 rounded-full animate-spin mb-4"></div>
      
      {/* 3. Optional Text or Logo */}
      <h2 className="text-xl font-semibold text-gray-700 animate-pulse">
        Loading Grocify....
      </h2>
    </div>
  );
};

export default FullScreenLoader;