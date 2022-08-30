import React from 'react';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { Logout } from '../redux/slice/authSlice';
import ButtonUI from '../ui/button/ButtonUI';

const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  return (
    <div className="flex justify-center mt-10">
      <h1 className="text-3xl font-bold text-blue px-10 py-3 shadow-lg rounded-md hover:bg-orange hover:text-white">
        Home page!
      </h1>
      <ButtonUI onClick={() => dispatch(Logout())}>Logout</ButtonUI>
    </div>
  );
};

export default HomePage;
