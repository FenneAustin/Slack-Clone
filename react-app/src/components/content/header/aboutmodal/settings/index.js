import React,{useState} from "react"
import { TbHash } from "react-icons/tb";
import "./index.css"
import {useSelector} from "react-redux"
import { SmallModal } from "../../../../../context/smallModal";
import RenameChannel from "../about/renamechannel/renamechannel";
import { BsTrash } from "react-icons/bs";
import DeleteConfirmation from "./deleteconfirmation";

const Settings = () => {
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const channel = useSelector((state) => state.channel[state.ui.channelId]);


    const openModal = () => {
        setShowModal(true);
    }

    const openDeleteModal = () => {
        setShowDeleteModal(true);
    }



    return (
      <div className="settings-page-container">
        <div className="edit-channel-name-btn" onClick={openModal}>
          <div className="channel-info-card">
            <div className=""> Channel name</div>
            <div className="cur-channel-name">
              <TbHash />
              <div>{channel.name}</div>
            </div>
          </div>
          <button className="blank-edit-btn">Edit</button>
        </div>

        <div className="delete-channel-page-container" onClick={openDeleteModal}>
          <div className="trash-icon">
            <BsTrash />
          </div>
          <div className="delete-channel-btn-setting">
            Delete this channel
          </div>
        </div>
        {showModal && (
          <SmallModal onClose={() => setShowModal(false)}>
            <RenameChannel
              channel={channel}
              closeModal={() => {
                setShowModal(false);
              }}
            />
          </SmallModal>
        )}
        {showDeleteModal && (
            <SmallModal onClose={() => setShowDeleteModal(false)}>
                <DeleteConfirmation channel={channel} closeModal={() => {
                    setShowDeleteModal(false);
                }}/>
            </SmallModal>
        )}
      </div>
    );
}


export default Settings;
