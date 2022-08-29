import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { AppRoute } from './common/enums/app-route.enum';
import { useAppDispatch, useAppSelector } from './hooks/useAppDispatch';
import HomePage from './pages/HomePage';
import LoginPage from './pages/login/LoginPage';
import { checkAuth } from './redux/slice/authSlice';

export default function App() {
  const dispatch = useAppDispatch();
  const { isAuth } = useAppSelector((state) => state.authSlice);

  React.useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(checkAuth());
    }
  }, []);

  return (
    <div className="Hello">
      {isAuth ? <h1>Good</h1> : <LoginPage />}

      <Routes>
        <Route path={AppRoute.HOME} element={<HomePage />} />
      </Routes>
    </div>
  );
}
