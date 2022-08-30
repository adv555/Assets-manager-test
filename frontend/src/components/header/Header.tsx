import React from 'react';

const Header = () => {
  return (
    <header className="w-full h-[90px] flex justify-between items-center py-6 px-11 pl-9 border-b border-b-neutral-200">
      <div>SearchInput</div>
      <div className="flex items-center ml-auto">Left Part</div>
    </header>
  );
};

export default Header;
