import axios from 'axios';

// Status code constants for readability
const UNAUTHORIZED = 401;
// Read important global variables from env vars
export const API_URL: string = process.env.REACT_APP_API_URL || '';
export const AUTH_USERNAME: string = process.env.REACT_APP_AUTH_USERNAME || '';
export const AUTH_PASSWORD: string = process.env.REACT_APP_AUTH_PASSWORD || '';

/**
 * Axios Instance
 *
 * This axios instance contains the Bearer token and the BASE URL
 * for the API.
 *
 * @returns AxiosInstance
 */
export const axiosInstance = axios.create({
  baseURL: API_URL,
});

const handleUnauthorizedError = () => {
  console.error('Unauthorized: incorrect admin username and password');
};

/**
 * Request interceptor
 * Adds a basic auth token to the request header
 */
axiosInstance.interceptors.request.use(
  async config => {
    // https://en.wikipedia.org/wiki/Basic_access_authentication
    const encoded = btoa(`${AUTH_USERNAME}:${AUTH_PASSWORD}`);
    config.headers['Authorization'] = `Basic ${encoded}`;
    return config;
  },
  error => Promise.reject(error),
);

/**
 * Response interceptor
 * Handles 401 errors
 */
axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    if (error.response.status === UNAUTHORIZED) {
      /**
       * if the status code is 401 Unauthorized, call handler
       */
      handleUnauthorizedError();
    }
    return error.response;
  },
);
