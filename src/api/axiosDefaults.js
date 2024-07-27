import axios from "axios";

// Function to get CSRF token from cookies
function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

const csrftoken = getCookie('csrftoken');

axios.defaults.baseURL = "https://sheapi-001672ab3b00.herokuapp.com/";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;
axios.defaults.headers.common['X-CSRFToken'] = csrftoken;

export const axiosReq = axios.create();
export const axiosRes = axios.create();

// Add request interceptor to axiosReq and axiosRes to refresh token if needed
const addRequestInterceptor = (axiosInstance) => {
  axiosInstance.interceptors.request.use(
    async (config) => {
      try {
        await axios.post('/dj-rest-auth/token/refresh/', {}, {
          withCredentials: true,
        });
      } catch (error) {
        console.error('Token refresh failed:', error);
        window.location.href = '/signin'; // Redirect to login page
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
};

addRequestInterceptor(axiosReq);
addRequestInterceptor(axiosRes);
