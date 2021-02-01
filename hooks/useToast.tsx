import { useDispatch } from "../pages/_app";

export default function useToast() {
  const dispatch = useDispatch();
  
  return () => {
    dispatch({ type: "app/SHOW_TOAST"})
    setTimeout(() => {
      dispatch({ type: "app/HIDE_TOAST" })
    }, 3000 );
  }
}