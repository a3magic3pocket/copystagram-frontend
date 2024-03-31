import { forwardRef, useEffect, useState } from "react";
import styles from "./modal.module.css";

const Modal = forwardRef((props: IModalProps, ref: any) => {
  const { showModal, children } = props;

  useEffect(() => {
    if (showModal) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  }, [showModal]);

  return (
    <div
      className={
        showModal ? styles["modal-overlay-wrap"] : styles["modal-hidden"]
      }
      ref={ref}
    >
      <div className={styles["modal-wrap"]} >{children}</div>
    </div>
  );
});

export default Modal;
