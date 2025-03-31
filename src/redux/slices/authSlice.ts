import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {AUTH_BASE_URL} from '../../services/api';
import {
  ApiResponse,
  AuthState,
  LoginCredentials,
  LoginResponse,
} from '../../types/auth';
import createAxiosInstance from '../../services/api';
import {LOGIN_URL} from '../../services/endpoint';

// Async thunks
export const loginUser = createAsyncThunk<
  ApiResponse<LoginResponse>,
  LoginCredentials,
  {rejectValue: string}
>(LOGIN_URL, async (credentials, {rejectWithValue}) => {
  try {
    const axiosInstance = await createAxiosInstance(AUTH_BASE_URL);
    const response = await axiosInstance.post<ApiResponse<LoginResponse>>(
      LOGIN_URL,
      {
        ...credentials,
        captcha: 'internal_testing_captcha',
      },
    );
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || 'Login failed. Please try again.',
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
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload?.data?.user;
        state.accessToken = action.payload?.data?.accessToken;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'An unknown error occurred';
      });
  },
});

export const {logout, clearError} = authSlice.actions;
export default authSlice.reducer;
