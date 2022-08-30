import React, { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import { Typography } from 'components/common/Typography';

interface MenuItemProps {
  link: string;
  icon: ReactNode;
  label: string;
  linkClassName: string;
}

const MenuItem: React.FC<MenuItemProps> = ({
  link,
  icon,
  label,
  linkClassName,
}) => {
  return (
    <NavLink
      to={link}
      className={clsx(
        'w-full flex items-center text-gray  hover:text-gray-dark fill-gray hover:fill-gray-dark   hover:stroke-gray transition',
        linkClassName,
      )}
    >
      <div className="w-6 h-6 mr-2">{icon}</div>
      <Typography type="Ag-16-semibold">{label}</Typography>
    </NavLink>
  );
};

export default MenuItem;
