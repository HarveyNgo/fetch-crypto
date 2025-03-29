import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import api, {AUTH_BASE_URL} from '../../services/api';
import {
  AuthState,
  LoginCredentials,
  LoginResponse,
  User,
} from '../../types/auth';
import createAxiosInstance from '../../services/api';

// Async thunks
export const loginUser = createAsyncThunk<
  LoginResponse,
  LoginCredentials,
  {rejectValue: string}
>('auth/login', async (credentials, {rejectWithValue}) => {
  try {
    const axiosInstance = await createAxiosInstance(AUTH_BASE_URL);
    const response = await axiosInstance.post<LoginResponse>('/auth/login', {
      // ...credentials,
      email: 'tokenize.test@gmail.com',
      password: 'Test#111',
      captcha: 'internal_testing_captcha',
    });
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || 'Login failed. Please try again.',
    );
  }
});

export const fetchUserData = createAsyncThunk<
  User,
  void,
  {rejectValue: string}
>('auth/fetchUserData', async (_, {rejectWithValue}) => {
  try {
    const response = await api.get<User>('/user/profile');
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || 'Failed to fetch user data.',
    );
  }
});

const initialState: AuthState = {
  user: null,
  accessToken: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<LoginResponse>) => {
      state.user = action.payload?.data.user;
      state.accessToken = action.payload?.data.accessToken;
      state.isAuthenticated = true;
    },
    logout: state => {
      state.user = null;
      state.accessToken = null;
      state.isAuthenticated = false;
    },
    clearError: state => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      // Login
      .addCase(loginUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<LoginResponse>) => {
          state.loading = false;
          state.isAuthenticated = true;
          state.token = action.payload.token;
          state.user = action.payload.user;
        },
      )
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'An unknown error occurred';
      })
      // Fetch user data
      .addCase(fetchUserData.pending, state => {
        state.loading = true;
      })
      .addCase(
        fetchUserData.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.loading = false;
          state.user = action.payload;
        },
      )
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'An unknown error occurred';
      });
  },
});

export const {logout, clearError, loginSuccess} = authSlice.actions;
export default authSlice.reducer;
