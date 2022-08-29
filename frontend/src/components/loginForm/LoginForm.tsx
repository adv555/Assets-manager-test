import React from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { fetchLogin, Registration } from '../../redux/slice/authSlice';

type Props = {};

const LoginForm = (props: Props) => {
  const dispatch = useAppDispatch();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
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
    <div>
      <h2>Login</h2>
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <h2>Register</h2>
      <input
        type="text"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={() => fetchAdd(fetchLogin)}>Login</button>
      <button onClick={() => fetchAdd(Registration)}>Register</button>
    </div>
  );
};

export default LoginForm;
