/** @format */

import axios from 'axios';
/** @format */

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api, { apiCreden } from '../../axios/axios';

export const fetchLogin = createAsyncThunk(
  'users/fetchById',
  // Declare the type your function argument here:
  async (params) => {
    const { data } = await api.post('/auth/login', params);
    return data;
  },
);

export const Registration = createAsyncThunk(
  'users/fetchRegistration',
  // Declare the type your function argument here:
  async (params) => {
    const { data } = await api.post('/auth/register', params);
    localStorage.setItem('token', data.tokens.access_token);
    return data;
  },
);

export const Logout = createAsyncThunk(
  'users/fetchLogout',
  // Declare the type your function argument here:
  async () => {
    const { data } = await api.post('/auth/logout');
    localStorage.removeItem('token');
    return data;
  },
);

export const GetAllUsers = createAsyncThunk(
  'users/fetchAll',
  // Declare the type your function argument here:
  async () => {
    const { data } = await api.get('users');
    return data;
  },
);
export const checkAuth = createAsyncThunk('users/check', async () => {
  const { data } = await apiCreden.post(
    'http://localhost:3001/api/auth/refresh',
  );
  localStorage.setItem('token', data.accessToken);
  return data;
});

interface typeInfo {
  users: object;
  status: string;
  isAuth: boolean;
}

const initialState: typeInfo = {
  users: {},
  status: 'LOADING',
  isAuth: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(fetchLogin.pending, (state, action) => {
      state.status = 'LOADING';
    });
    builder.addCase(fetchLogin.fulfilled, (state, action) => {
      state.status = 'SUCCESS';
      state.isAuth = true;
      state.users = action.payload;
      localStorage.setItem('token', action.payload.tokens.access_token);
    });
    builder.addCase(fetchLogin.rejected, (state, action) => {
      state.status = 'ERROR';
    });
    //
    //
    //
    builder.addCase(Registration.pending, (state, action) => {
      state.status = 'LOADING';
    });
    builder.addCase(Registration.fulfilled, (state, action) => {
      state.status = 'SUCCESS';
      state.isAuth = true;
      state.users = action.payload;
    });
    builder.addCase(Registration.rejected, (state, action) => {
      state.status = 'ERROR';
    });
    //
    //
    //
    builder.addCase(Logout.pending, (state, action) => {
      state.status = 'LOADING';
    });
    builder.addCase(Logout.fulfilled, (state, action) => {
      state.status = 'SUCCESS';
      state.isAuth = false;
      state.users = {};
    });
    builder.addCase(Logout.rejected, (state, action) => {
      state.status = 'ERROR';
    });
    //
    //
    //
    builder.addCase(checkAuth.pending, (state, action) => {
      state.status = 'LOADING';
    });
    builder.addCase(checkAuth.fulfilled, (state, action) => {
      state.status = 'SUCCESS';
      state.users = action.payload;
      localStorage.setItem('token', action.payload.tokens.access_token);

      state.isAuth = true;
    });
    builder.addCase(checkAuth.rejected, (state, action) => {
      state.status = 'ERROR';
    });
  },
});

export const {} = authSlice.actions;

// Other code such as selectors can use the imported `RootState` type

export default authSlice.reducer;
