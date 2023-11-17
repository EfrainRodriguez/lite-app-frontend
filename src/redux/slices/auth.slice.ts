import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';

interface UserModel {
  id: string;
  name: string;
  email: string;
}

export interface AuthState {
  accessToken: string | null;
  user: UserModel | null;
}

const initialState: AuthState = {
  accessToken: null,
  user: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<string | null>) => {
      state.accessToken = action.payload;
      if (action.payload) {
        const user = jwtDecode(action.payload) as any;
        state.user = {
          id: user.user_id,
          name: '',
          email: ''
        };
      }
    },
    setLoggedUser: (state, action: PayloadAction<UserModel | null>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.accessToken = null;
    }
  }
});

export const { setAccessToken, setLoggedUser, logout } = authSlice.actions;

export default authSlice.reducer;
