import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIsAuthenticated,
  selectAccessToken,
  setAccessToken,
  setAuthenticated,
} from "@/store/features/authSlice";

export const useAuth = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const accessToken = useSelector(selectAccessToken);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuth = () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        dispatch(setAuthenticated(true));
      } else {
        dispatch(setAuthenticated(false));
        dispatch(setAccessToken(null));
      }
    } catch {
      dispatch(setAuthenticated(false));
      dispatch(setAccessToken(null));
    }
    setIsLoading(false);
  };

  const setAuth = (accessToken: string, refreshToken: string) => {
    dispatch(setAccessToken(accessToken));
    dispatch(setAuthenticated(true));

    localStorage.setItem("refreshToken", refreshToken);
  };

  const setAccess = (accessToken: string) => {
    dispatch(setAccessToken(accessToken));
    dispatch(setAuthenticated(true));
  };

  const logout = () => {
    setIsLoading(true);
    dispatch(setAuthenticated(false));
    dispatch(setAccessToken(null));
    localStorage.removeItem("refreshToken");
    setIsLoading(false);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return {
    isAuthenticated,
    accessToken,
    setAuth,
    logout,
    checkAuth,
    isLoading,
    setAccess,
  };
};
