// src/components/PageContainer.js
import React from 'react';

const PageContainer = ({ children, title, actions }) => {
  return (
    <div className="w-full overflow-x-hidden">
      {/* Optional Header */}
      {/* {(title || actions) && (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
          {title && <h1 className="text-xl sm:text-2xl font-bold text-gray-800">{title}</h1>}
          {actions && <div className="flex gap-2">{actions}</div>}
        </div>
      )} */}
      
      {/* Page Content */}
      {children}
    </div>
  );
};

export default PageContainer;