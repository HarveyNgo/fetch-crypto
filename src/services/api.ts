// import axios, {AxiosInstance, AxiosResponse} from 'axios';

// const api: AxiosInstance = axios.create({
//   baseURL: 'https://api.example.com', // Replace with your actual API URL
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Request interceptor for adding the auth token
// // api.interceptors.request.use(
// //   (config: AxiosRequestConfig): AxiosRequestConfig => {
// //     // Get token from secure storage
// //     const token = ''; // Replace with your token retrieval logic

// //     if (token && config.headers) {
// //       config.headers.Authorization = `Bearer ${token}`;
// //     }

// //     return config;
// //   },
// //   (error: any) => {
// //     return Promise.reject(error);
// //   },
// // );

// // Response interceptor for handling common errors
// api.interceptors.response.use(
//   (response: AxiosResponse): AxiosResponse => {
//     return response;
//   },
//   (error: any) => {
//     // Handle 401 Unauthorized errors (token expired)
//     if (error.response && error.response.status === 401) {
//       // Logout logic here
//     }

//     return Promise.reject(error);
//   },
// );

// export default api;

export const AUTH_BASE_URL = 'https://sso-backend.tokenize-dev.com';

export const MARKET_BASE_URL = 'https://api.tokenize-dev.com';

import axios from 'axios';
import DeviceInfo from 'react-native-device-info';

const createAxiosInstance = async (baseURL: string) => {
  const userAgent = await DeviceInfo.getUserAgent();
  const deviceId = await DeviceInfo.getUniqueId();

  return axios.create({
    baseURL: baseURL,
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json;charset=utf-8',
      'user-agent': userAgent,
      'TOK-DEVICE-ID': deviceId,
    },
  });
};

export default createAxiosInstance;
