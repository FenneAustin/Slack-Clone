import "./index.css";
import React, { useEffect, useState } from "react";
import AddChannelForm from "./addChannelForm.js";
import { Modal } from "../../../context/Modal";
import { AiOutlinePlus } from "react-icons/ai";

const AddChannelModal = () => {
  const [showCreateChannelModal, setShowCreateChannelModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showModal, setShowModal] = useState(false);

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

  const handleBrowse = () => {
    
  };

  return (
    <div className="add-new-container">
      <button className="add-button" onClick={openMenu}>
        <div className="add-channels-btns">
          <AiOutlinePlus className="add-workspace-icon-add" />
          <div className="add-channels-text">Add channels</div>
        </div>
      </button>
      {showMenu && (
        <div className="add-new-channel">
          <div className="add-channel-item" onClick={() => setShowModal(true)}>
            Create a new channel
          </div>
          <div className="add-channel-item" onClick={()=> handleBrowse()}>Browse channels</div>
        </div>
      )}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <AddChannelForm closeModal={() => setShowModal(false)} />
        </Modal>
      )}
    </div>
  );
};

export default AddChannelModal;
