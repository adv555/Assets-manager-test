import React from 'react';
import style from './GoogleButton.module.scss';
import { FcGoogle } from 'react-icons/fc';

type Props = {};
const GoogleButton: React.FC = (props: Props) => {
  return (
    <div className={style.button}>
      <FcGoogle size={'2rem'} style={{ marginRight: '10px' }} />
      <button>Sing in with Google</button>
    </div>
  );
};

export default GoogleButton;
