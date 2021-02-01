import React, { ReactElement, useEffect, useState } from "react";
import Router from "next/router";
import { useStore, useDispatch } from "../../pages/_app";
import Toast from "./Toast";
import Header from "./Header";
import cancel from "../../assets/cancel.svg";
import Navigation from "./Navigation";

type Props = {
  children?: ReactElement;
  title?: string;
}

const Page: React.FC<Props> = ({ children, title }) => {
  const {
    toast,
    nav,
    modal
  } = useStore();

  const dispatch = useDispatch();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      if (nav.navOpen) {
        dispatch({ type: "app/TOGGLE_NAV"})
      }

    }

    Router.events.on('routeChangeStart', handleRouteChange)
    return () => {
      Router.events.off('routeChangeStart', handleRouteChange)
    }
  }, [nav.navOpen])

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
          className={`BodyOverlay ${nav.navOpen || modal.modalOpen ? 'Visible' : ''}`}
          onClick={() => {
            if (nav.navOpen) {
              dispatch({
                type: "app/TOGGLE_NAV"
              })
            }
            if (modal.modalOpen) {
              dispatch({
                type: "app/TOGGLE_MODAL"
              })
            }
          }}>
      </div>
      <div className={`SlidePanel ${nav.navOpen ? 'Open' : ''}`}>
        <div className="Cancel" onClick={() => dispatch({ type: "app/TOGGLE_NAV"})}>
          <img src={cancel} className="Close" alt="Cancel" />
        </div>
        <Navigation />
      </div>

      <div className={`Modal ${modal.modalOpen ? 'Open' : ''}`}>
        <div className="Cancel" onClick={() => dispatch({ type: "app/TOGGLE_MODAL"})}>
          <img src={cancel} className="Close" alt="Cancel" />
        </div>
      </div>
          
 
    </div>
      
    <Toast message={toast.toastMessage} visible={toast.toastVisible} /> 
    </>
  )
}

export default Page;