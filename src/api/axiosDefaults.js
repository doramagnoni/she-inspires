import axios from "axios";

axios.defaults.baseURL = "https://sheapi-001672ab3b00.herokuapp.com/";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;

export const axiosReq = axios.create();
export const axiosRes = axios.create();

// Add interceptors for token refresh
axiosReq.interceptors.request.use(
  async (config) => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        const { data } = await axios.post("/dj-rest-auth/token/refresh/", {
          refresh: refreshToken,
        });
        config.headers.Authorization = `Bearer ${data.access}`;
      }
    } catch (err) {
      console.log(err);
      // Handle the case where token refresh fails
      // For example, you can dispatch a logout action or update the UI
    }
    return config;
  },
  (err) => Promise.reject(err)
);

axiosRes.interceptors.response.use(
  (response) => response,
  async (err) => {
    if (err.response?.status === 401) {
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (refreshToken) {
          const { data } = await axios.post("/dj-rest-auth/token/refresh/", {
            refresh: refreshToken,
          });
          err.config.headers.Authorization = `Bearer ${data.access}`;
          return axios(err.config);
        }
      } catch (err) {
        console.log(err);
        // Notify user that session has expired or token refresh failed
        // Avoid redirecting to sign-in page automatically
        // You might handle this differently based on your app's requirements
        localStorage.removeItem("refreshToken");
        // Optionally, update application state or show a notification
      }
    }
    return Promise.reject(err);
  }
);
