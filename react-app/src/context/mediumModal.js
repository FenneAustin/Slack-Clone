import React, { useContext, useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./mediumModal.css";

const MediumModalContext = React.createContext();

export function MediumModalProvider({ children }) {
  const modalRef = useRef();
  const [value, setValue] = useState();

  useEffect(() => {
    setValue(modalRef.current);
  }, []);

  return (
    <>
      <MediumModalContext.Provider value={value}>
        {children}
      </MediumModalContext.Provider>
      <div ref={modalRef} />
    </>
  );
}

export function MediumModal({ onClose, children }) {
  const modalNode = useContext(MediumModalContext);
  if (!modalNode) return null;

  return ReactDOM.createPortal(
    <div id="medium-modal">
      <div id="medium-modal-background" onClick={onClose} />
      <div id="medium-modal-content">{children}</div>
    </div>,
    modalNode
  );
}
