import React, { ReactElement, useEffect, useState } from "react";
import { useStore, useDispatch } from "../../pages/_app";
import Toast from "./Toast";
import Header from "./Header";

type Props = {
  children?: ReactElement;
  title?: string;
}

const Page: React.FC<Props> = ({ children, title }) => {
  const {
    toast,
    nav
  } = useStore();

  const dispatch = useDispatch();


  return (
    <>
    <div className="Page">
      <Header />
      <main className="Main">
        {
          title && <h1>{title}</h1>
        }
        {children}
      </main>

      <div
          className={`BodyOverlay ${nav.navOpen ? 'Visible' : ''}`}
          onClick={() => {
            if (nav.navOpen) {
              dispatch({
                type: "app/TOGGLE_NAV"
              })
            }
          }}>
      </div>
      <div className={`SlidePanel ${nav.navOpen ? 'Open' : ''}`}>

      </div>
          
 
    </div>
      
    {/*<Toast message={toast.toastMessage} visible={toast.toastVisible} />  */}
    </>
  )
}

export default Page;