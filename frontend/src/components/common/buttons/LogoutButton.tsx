import React from 'react';
import { ReactComponent as LogoutIcon } from 'assets/icons/logout.svg';
import { Typography } from 'components/common/Typography';

interface LogoutButtonProps {
  onClick?: () => void;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ onClick }) => {
  return (
    <button
      className="inline-flex align-middle justify-center"
      type="button"
      onClick={onClick}
    >
      <div className="inline-flex font-semibold text-16px items-center">
        <LogoutIcon className=" mr-2" />
        <Typography type={'Ag-16-semibold'}>Log Out</Typography>
      </div>
    </button>
  );
};

export default LogoutButton;
