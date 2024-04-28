import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  error: null,
  loading: false
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signinstart(state) {
      state.error = null;
      state.loading = true;
    },
    signinsuccess(state, action) {
        console.log(action.payload)
      state.error = null;
      state.loading = false;
      state.user = action.payload;
    },
    signinfailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    signupstart(state) {
      state.error = null;
      state.loading = true;
    },
    signupsuccess(state) {
      state.error = null;
      state.loading = false;
    },
    signupfailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    logoutfailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    logoutsuccess(state) {
      state.error = null;
      state.loading = false;
      state.user = null
    }
  }
});

export const {
  signinfailure,
  signinstart,
  signinsuccess,
  signupfailure,
  signupstart,
  signupsuccess,
  logoutfailure,
  logoutsuccess
} = userSlice.actions;

export default userSlice.reducer;
