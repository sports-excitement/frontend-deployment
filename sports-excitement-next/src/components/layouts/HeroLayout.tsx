import React from 'react';

interface HeroLayoutProps {
  children: React.ReactNode;
  backgroundColor?: string;
}

const HeroLayout: React.FC<HeroLayoutProps> = ({ children, backgroundColor = 'bg-white' }) => {
  return (
    <section className={`relative w-full min-h-[85vh] flex items-center ${backgroundColor} overflow-hidden`}>
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex flex-col sm:flex-row items-center justify-between gap-8 py-12 md:py-16">
          <div className="[&_.hero-content]:w-full sm:[&_.hero-content]:w-1/2
                         [&_.hero-content]:space-y-6
                         [&_.hero-content]:text-center sm:[&_.hero-content]:text-left
                         [&_.hero-image]:w-full sm:[&_.hero-image]:w-1/2
                         [&_.hero-image]:order-first sm:[&_.hero-image]:order-last
                         [&_.hero-features]:flex [&_.hero-features]:flex-wrap [&_.hero-features]:gap-4
                         [&_.hero-features]:justify-center sm:[&_.hero-features]:justify-start
                         [&_.hero-button-container]:flex [&_.hero-button-container]:flex-wrap [&_.hero-button-container]:gap-4
                         [&_.hero-button-container]:justify-center sm:[&_.hero-button-container]:justify-start">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroLayout;
