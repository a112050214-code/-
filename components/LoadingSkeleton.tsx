
import React from 'react';

const LoadingSkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="aspect-video bg-gray-100 mb-4 rounded-sm"></div>
          <div className="h-4 bg-gray-100 rounded w-1/4 mb-4"></div>
          <div className="h-3 bg-gray-100 rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-gray-100 rounded w-full mb-6"></div>
          <div className="h-2 bg-gray-50 rounded w-1/6"></div>
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;
