import React from 'react';
import { Typography } from 'components/common/Typography';
import TextInput from 'components/common/inputs/TextInput';

const Settings = () => {
  return (
    <>
      <Typography type={'h2'} children={'Settings'} />
      <Typography
        type={'Ag-14-regular'}
        children={'Update your account information'}
      />
      <div className="flex flex-col sm:p-10 gap-5">
        <Typography type={'h4'} children={'Personal Information'} />
        <div className="flex flex-col gap-5 sm:flex-row ">
          <div className="sm:w-1/2">
            <TextInput
              label={'First Name'}
              type={'text'}
              name={'firstName-input'}
              placeholder={'e.g. John'}
              onChange={(e) => console.log(e.target.value)}
            />
          </div>
          <div className="sm:w-1/2">
            <TextInput
              label={'Last Name'}
              type={'text'}
              name={'lastName-input'}
              placeholder={'e.g. Doe'}
              onChange={(e) => console.log(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-col gap-5 sm:flex-row">
          <div className="sm:w-1/2">
            <TextInput
              label={'Email'}
              type={'email'}
              name={'email-input'}
              placeholder={'e.g. jhons@mail.com'}
              onChange={(e) => console.log(e.target.value)}
            />
          </div>
          <div className="sm:w-1/2">
            <TextInput
              label={'Address'}
              type={'text'}
              name={'address-input'}
              placeholder={'e.g. Ukraine, Kyiv, Kvitneva St., 37'}
              onChange={(e) => console.log(e.target.value)}
            />
          </div>
        </div>
        <Typography type={'h4'} children={'Change Password'} />
        <div className="flex flex-col gap-5 sm:flex-row">
          <div className="sm:w-1/2">
            <TextInput
              label={'New Password'}
              type={'password'}
              name={'new-password-input'}
              placeholder={'e.g. *******'}
              onChange={(e) => console.log(e.target.value)}
            />
          </div>
          <div className="sm:w-1/2">
            <TextInput
              label={'Confirm Password'}
              type={'password'}
              name={'confirm-password-input'}
              placeholder={'e.g. *******'}
              onChange={(e) => console.log(e.target.value)}
            />
          </div>
        </div>
        <div>
          <Typography type={'h4'} children={'Delete Account'} />
          <Typography
            type={'Ag-14-regular'}
            children={
              'To delete your profile, enter your current password and confirm it.'
            }
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-5">
          <div className="sm:w-1/2">
            <TextInput
              label={'Current password'}
              type={'password'}
              name={'cur-password-input'}
              placeholder={'e.g. *******'}
              onChange={(e) => console.log(e.target.value)}
            />
          </div>
          <div className="sm:w-1/2">
            <TextInput
              label={'Confirm current password'}
              type={'password'}
              name={'confirm-cur-password-input'}
              placeholder={'e.g. *******'}
              onChange={(e) => console.log(e.target.value)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
