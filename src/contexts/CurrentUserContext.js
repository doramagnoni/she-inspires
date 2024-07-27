import { createContext, useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { axiosReq, axiosRes } from "../api/axiosDefaults";
import { useNavigate } from "react-router-dom";

export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

export const useCurrentUser = () => useContext(CurrentUserContext);
export const useSetCurrentUser = () => useContext(SetCurrentUserContext);

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  const handleMount = async () => {
    try {
      const { data } = await axiosRes.get("dj-rest-auth/user/");
      setCurrentUser(data);
    } catch (err) {
      console.log("Error fetching current user on mount:", err);
    }
  };

  useEffect(() => {
    handleMount();
  }, []);

  useMemo(() => {
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
          console.log("Error refreshing token in request interceptor:", err);
          setCurrentUser(null);
          navigate("/signin");
          return Promise.reject(err);
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
          } catch (refreshErr) {
            console.log("Error refreshing token in response interceptor:", refreshErr);
            setCurrentUser(null);
            localStorage.removeItem("refreshToken");
            window.location.href = "/signin";
          }
        }
        return Promise.reject(err);
      }
    );
  }, [navigate]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <SetCurrentUserContext.Provider value={setCurrentUser}>
        {children}
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
};
