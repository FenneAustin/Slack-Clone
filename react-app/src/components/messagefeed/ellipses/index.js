import React, { useState, useEffect } from "react";
import { HiEllipsisVertical } from "react-icons/hi2";
import "./index.css";

const Ellipse = ({ message, handleEdit, handleDelete }) => {


  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  return (
    <div className="ellipse-container">
      <HiEllipsisVertical className="edit-ellipse" onClick={openMenu} />
      {showMenu && (
        <ul className="ellipse-dropdown">
          <li>
            <button className="edit-message-btn" onClick={() => handleEdit()}>
              edit
            </button>
          </li>
          <li>
            <button className="delete-message-btn" onClick={() => handleDelete(message.id)}>
              delete
            </button>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Ellipse;
