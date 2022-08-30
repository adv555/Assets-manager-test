import React from 'react';
import LoginForm from '../../components/loginForm/LoginForm';
import SliderLogin from '../../components/slider/SliderLogin/SliderLogin';
import style from './LoginPage.module.scss';

interface Props {}

const LoginPage = (props: Props) => {
  return (
    <div className={style.container}>
      <SliderLogin />
      <LoginForm />
    </div>
  );
};

export default LoginPage;
