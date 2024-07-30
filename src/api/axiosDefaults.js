import axios from 'axios';

axios.defaults.baseURL = 'https://sheapi-001672ab3b00.herokuapp.com/';
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
axios.defaults.withCredentials = true;

export const axiosReq = axios.create();
export const axiosRes = axios.create();

async function refreshToken() {
    try {
      const response = await axios.post('/dj-rest-auth/token/refresh/', {
        refresh_token: localStorage.getItem('refreshToken')
      });
      return response.data.access_token; // Adjust according to your response structure
    } catch (error) {
      console.error('Failed to refresh token:', error);
      throw error;
    }
  }

axiosReq.interceptors.request.use(
  (config) => {
    const storedAccessToken = localStorage.getItem('accessToken');
    if (storedAccessToken) {
      config.headers.Authorization = `Bearer ${storedAccessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosReq.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newAccessToken = await refreshToken();
        localStorage.setItem('accessToken', newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosReq(originalRequest);
      } catch (err) {
        console.error('Failed to refresh token:', err);
        // Handle refresh token failure (e.g., logout user)
        // Example: window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);
