import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import api from '../../services/api';
import {
  AuthState,
  LoginCredentials,
  LoginResponse,
  User,
} from '../../types/auth';

// Async thunks
export const loginUser = createAsyncThunk<
  LoginResponse,
  LoginCredentials,
  {rejectValue: string}
>('auth/login', async (credentials, {rejectWithValue}) => {
  try {
    const response = await api.post<LoginResponse>('/auth/login', credentials);
    // Store token in secure storage
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
  token: null,
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
      state.token = null;
      state.isAuthenticated = false;
      // Clear token from secure storage
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

export const {logout, clearError} = authSlice.actions;
export default authSlice.reducer;
