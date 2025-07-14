import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearError } from "../services/userSlice";

export const useClearErrorOnUnmount = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);
};