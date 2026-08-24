"use client";

import { ToastContainer, Bounce } from "react-toastify";

export default function ToastContainerComp() {
  return (
    <ToastContainer
      position="top-right"
      autoClose={2000}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
      transition={Bounce}
    />
  );
}
