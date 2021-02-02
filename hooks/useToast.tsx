import { useEffect } from "react";
import { useDispatch } from "../pages/_app";

export default function useToast() {
  const dispatch = useDispatch();
  let timeout: ReturnType<typeof setTimeout>;
  
  useEffect(() => {
    return () => clearTimeout(timeout);
  },[])
  
  return () => {
    dispatch({ type: "app/SHOW_TOAST"})
    timeout = setTimeout(() => {
      dispatch({ type: "app/HIDE_TOAST" })
    }, 3000 );
  }
}