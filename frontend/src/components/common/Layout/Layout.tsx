import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col gap-x-10 gap-y-4 pl-9 pt-4 pr-10 ">
      {children}
    </div>
  );
};
