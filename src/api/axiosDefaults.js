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
        localStorage.removeItem("refreshToken");
        window.location.href = "/signin"; // Redirect to sign-in page
      }
    }
    return Promise.reject(err);
  }
);
