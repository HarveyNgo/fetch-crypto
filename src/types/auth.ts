export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export interface LoginResponse {
  accessToken: string;
  enableTfa: number;
  needToChangePassword: number;
  needVerified: number;
  refreshToken: string;
  user: User;
}

export interface User {
  email: string;
  regId: string;
  roleName: string;
  roleType: string;
  userId: number;
}
export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}
