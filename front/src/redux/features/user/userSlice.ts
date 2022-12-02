import { User } from '../../../models';
import { createSlice } from '@reduxjs/toolkit';
import { getFollowers, getUser } from './thunks';

interface UserState {
  user: User | null;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
}

const initialState: UserState = {
  user: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetUser: (state) => {
      state.user = null;
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(getUser.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      //followers
      .addCase(getFollowers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFollowers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(getFollowers.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })

  },
});

export const { resetUser } = userSlice.actions;
