import React, { ReactElement, useEffect, useState } from "react";
import { useStore, useDispatch } from "../../pages/_app";
import Toast from "./Toast";

type Props = {
  children?: ReactElement;
  title?: string;
}

const Page: React.FC<Props> = ({ children, title }) => {
  const {
    toastVisible,
    toastMessage
  } = useStore();

  return (
    <>
      <main>
        {
          title && <h1>{title}</h1>
        }
        {children}
      </main>
      <Toast message={toastMessage} visible={toastVisible} />
    </>
  )
}

export default Page;