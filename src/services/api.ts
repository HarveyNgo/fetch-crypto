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
