import React, { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import { Typography } from '../common/Typography';

interface MenuItemProps {
  link: string;
  icon: ReactNode;
  label: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ link, icon, label }) => {
  return (
    <NavLink
      to={link}
      className={({ isActive }) =>
        [
          'w-full flex items-center text-gray fill-gray  py-4 pl-4 rounded-lg',
          isActive
            ? 'bg-green-light text-gray-dark stroke-gray fill-gray-dark'
            : null,
        ]
          .filter(Boolean)
          .join(' ')
      }
    >
      <div className="w-6 h-6 mr-2">{icon}</div>
      <Typography type="Ag-16-semibold" children={label} />
    </NavLink>
  );
};

export default MenuItem;
