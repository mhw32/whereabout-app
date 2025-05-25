import axios from "axios";
import auth from "@react-native-firebase/auth";
import { API_URL } from "./constants";
import { getIdToken } from "./utils";

// Status code constants for readability
const UNAUTHORIZED = 401;

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

/**
 * Fetches the access token from local storage for firebase authentication
 * @returns string
 */
const getFirebaseToken = async (): Promise<string | null> => {
  const token = await getIdToken();
  return token;
};

/**
 * Handle case when token is invalid or missing
 */
const handleUnauthorizedError = async () => {
  // We ask firebase to sign out
  await auth().signOut();
};

/**
 * Request interceptor 
 * Adds a bearer token to the request header
 */
axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await getFirebaseToken();
    config.headers["Authorization"] = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error),
);

/**
 * Response interceptor
 * Handles 401 errors
 */
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === UNAUTHORIZED) {
      /**
       * if the status code is 401 Unauthorized is a token expired,
       * we try to refresh the token and if we got an error delete
       * all the values on the local storage and reload the page.
       */
      await handleUnauthorizedError();
    }
    console.error(error);  // cast to stdout (optional)
    return error.response;
  }
);