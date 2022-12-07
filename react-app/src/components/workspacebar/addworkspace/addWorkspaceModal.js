import "./addWorkspaceModal.css";
import React, { useEffect, useState } from "react";
import plus from "../../../assets/images/+button.svg";
import CreateWorkspaceForm from './CreateWorkspaceForm'
import {Modal} from "../../../context/Modal"
import {MediumModal} from "../../../context/mediumModal"
import { AiOutlinePlus } from "react-icons/ai";
import FindWorkspace from "../../findworkspace";

const AddWorkspaceModal = () => {

  const [showCreateWorkspaceModal, setShowCreateWorkspaceModal] = useState(false);
  const [showFindWorkspaceModal, setShowFindWorkspaceModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  }

  useEffect(() => {
    if (!showMenu) return;

      const closeMenu = () => {
        setShowMenu(false);
      };

      document.addEventListener("click", closeMenu);

      return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleCreateWorkspace = () => {
    setShowCreateWorkspaceModal(true);
    setShowMenu(false);
    setShowModal(true);
  }



  return (
    <div className="add-container">
      <button className="add-button" onClick={openMenu}>
        <AiOutlinePlus className="add-workspace-icon"/>
      </button>
      {showMenu && (
        <div className="add-menu">
          <div className="add-menu-item" onClick={() => handleCreateWorkspace()}>Create a new workspace</div>
          <div className="add-menu-item" onClick={() => setShowFindWorkspaceModal(true)}>Find a workspace</div>
        </div>)
      }
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreateWorkspaceForm closeModal={()=> setShowModal(false)}/>
        </Modal>
      )}
      {showFindWorkspaceModal && (
        <MediumModal onClose={() => setShowFindWorkspaceModal(false)}>
          <FindWorkspace closeModal={()=> setShowFindWorkspaceModal(false)}/>
        </MediumModal>

      )
        }
    </div>
  );
}

export default AddWorkspaceModal;
