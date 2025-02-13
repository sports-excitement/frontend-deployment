import React from 'react';

interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children, className = '' }) => {
  return (
    <div className="w-full min-h-screen bg-gray-50">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <main className={`w-full py-8 sm:py-12 lg:py-16 ${className}`}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default PageLayout;
