import React, { useCallback } from "react";
import { useDispatch } from "../../pages/_app";
import { CSSTransition } from "react-transition-group";
import cancel from "../../assets/cancel.svg";

type Props = {
  message: string;
  visible: boolean;
}

const Toast: React.FC<Props> = ({ message, visible }) => {
  const dispatch = useDispatch();
  
  const acknowledge = useCallback(() => dispatch({ type: "app/HIDE_TOAST"}), [
    dispatch
  ])
  return (
    <CSSTransition
      in={message !== null}
      unmountOnExit
      timeout={200}
    >
      <div className={`Toast ${visible ? 'Show' : ''}`}>
        <div className="ToastContent">
          <div className="ToastMessage">{message}</div>
          <img src={cancel} onClick={acknowledge} alt="Close popup" />
        </div>
      </div>
    </CSSTransition>
    
  )
}

export default Toast;