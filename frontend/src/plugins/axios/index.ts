import type { AxiosRequestConfig } from 'axios';
import { useUser } from '../../store';
import { Cookie } from '../../utils';
import { Manager } from './manager';
import Axios from 'axios';

const env = import.meta.env;

const baseURL = env.VITE_AXIOS_URL;
const csrfTokenName = env.VITE_CSRF_TOKEN_NAME || 'csrf_token';
const withCredentials = env.VITE_AXIOS_WITH_CREDENTIALS === 'true';

const timeout = parseInt(env.VITE_AXIOS_TIMEOUT) || 5;
const retryMax = parseInt(env.VITE_AXIOS_RETRY_MAX) || 0;
const retryDelay = parseInt(env.VITE_AXIOS_RETRY_DELAY) || 1;

export const axiosManager = new Manager();

export const axios = Axios.create({
  baseURL,
  retryMax,
  retryDelay,
  retryCount: 1,
  withCredentials,
  timeout: timeout * 1000, // TODO: 超时5s
  headers: { 'Content-Type': 'application/json;charset=utf-8' },
});

axios.interceptors.request.use((config: AxiosRequestConfig) => {
  const user = useUser();
  const csrf_token = Cookie.get(csrfTokenName);
  //
  if (csrf_token) config.headers['X-CSRF-TOKEN'] = csrf_token;
  if (user.token) config.headers.Authorization = `Bearer ${user.token}`;
  //

  console.log(config);
  axiosManager.push(config);
  return config;
}, error => Promise.reject(error));

axios.interceptors.response.use(response => {
  axiosManager.remove(response.config);
  //
  return response;
}, error => {
  if (!Axios.isCancel(error) && error.config) {
    axiosManager.remove(error.config);
    // TODO: 重试
    const { retryMax, retryDelay, retryCount } = error.config;
    if (retryCount <= retryMax) {
      error.config.retryCount += 1;
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(axios(error.config));
        }, retryDelay * 1000);
      });
    }
  }
  //
  return Promise.reject(error);
});
