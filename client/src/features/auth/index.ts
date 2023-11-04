import { createSlice } from '@reduxjs/toolkit'

export interface AuthState {
  email: string,
  token: string,
  userType: string
}

const initialState: AuthState = {
  email: '',
  token: '',
  userType: '',
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.email = '';
      state.token = '';
      state.userType = '';
    },
    login: (state, action) => {
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.userType = action.payload.userType;
    },
  },
})

// Action creators are generated for each case reducer function
export const { login, logout } = authSlice.actions

export default authSlice.reducer