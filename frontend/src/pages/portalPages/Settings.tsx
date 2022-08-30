import React from 'react';
import { Typography } from 'components/common/Typography';

const Settings = () => {
  return (
    <>
      <Typography type={'h2'} children={'Settings'} />
      <Typography
        type={'Ag-14-regular'}
        children={'Update your account information'}
        className={'mb-10'}
      />
      <div className="flex flex-col pl-10 gap-10">
        <Typography type={'h4'} children={'Personal Information'} />

        <Typography type={'h4'} children={'Change Password'} />

        <Typography type={'h4'} children={'Delete Account'} />
      </div>
    </>
  );
};

export default Settings;
