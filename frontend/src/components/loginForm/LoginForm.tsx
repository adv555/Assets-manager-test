import React from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { fetchLogin, Registration } from '../../redux/slice/authSlice';
import ButtonUI from '../../ui/button/ButtonUI';
import InputUI from '../../ui/input/InputUI';
import GoogleButton from './googleButton/GoogleButton';
import style from './LoginForm.module.scss';

type Props = {};

const LoginForm: React.FC = (props: Props) => {
  const dispatch = useAppDispatch();

  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  //
  //
  const params = {
    email,
    password,
  };

  const fetchAdd = (el: any) => {
    dispatch(el(params));
  };

  return (
    <div className={style.container}>
      <h1 className="text-3xl font-semibold text-center mb-10">Sing in</h1>

      <form>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-xl font-medium mb-2"
            htmlFor="username"
          >
            Login
          </label>
          <InputUI
            type={'text'}
            placeholder={'Login'}
            value={email}
            setValue={setEmail}
          ></InputUI>
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-xl frot-medium mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <InputUI
            type={'password'}
            placeholder={'password'}
            value={password}
            setValue={setPassword}
          ></InputUI>
          <p className="text-red-500 text-xs italic">
            Please choose a password.
          </p>
        </div>
        <div className="flex items-center justify-between">
          <ButtonUI onClick={() => fetchAdd(Registration)}>Register</ButtonUI>
          <ButtonUI onClick={() => fetchAdd(fetchLogin)}>Login</ButtonUI>
        </div>
        <a
          className="inline-block align-baseline font-bold text-sm mt-4 text-blue-500 hover:text-blue-800"
          href="#"
        >
          Forgot Password?
        </a>
        <div>
          <GoogleButton></GoogleButton>
          {/* <button className="w-full mt-3">Sing in with Google</button> */}
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
