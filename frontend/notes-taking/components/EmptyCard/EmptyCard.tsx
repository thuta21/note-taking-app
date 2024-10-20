import React from 'react';

const EmptyCard: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-10 bg-gray-100 rounded-lg shadow-md">
      <svg
        className="w-16 h-16 mb-4 text-gray-400"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 3h18v18H3V3z"
        />
      </svg>
      <h2 className="text-xl font-semibold text-gray-700">No Notes Found</h2>
      <p className="mt-2 text-gray-500">Start adding notes to see them here.</p>
    </div>
  );
};

export default EmptyCard;
