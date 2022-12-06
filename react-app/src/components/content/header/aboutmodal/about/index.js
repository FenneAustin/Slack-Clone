import React, {useState} from "react"
import "./index.css"
import { TbHash } from "react-icons/tb";
import RenameChannel from "./renamechannel/renamechannel.js"
import {useDispatch} from "react-redux"
import { SmallModal } from "../../../../../context/smallModal.js";
import { leaveChannel, getAllUserChannels, getAllWorkspaceChannels } from "../../../../../store/channels";
import { clearWorkspaceChannelId } from "../../../../../store/ui";
import EditDescription from "./editdescription/index.js";

const About = ({channel}) => {

    const [showModal, setShowModal] = useState(false);
    const [showDescriptionModal, setShowDescriptionModal] = useState(false);

    const openModal = () => {
        setShowModal(true);
    }

    const openDescriptionModal = () => {
        setShowDescriptionModal(true);
    }

    const dispatch = useDispatch();


    const handleLeave = async (id, workspaceId) => {
          await dispatch(leaveChannel(id));
          await dispatch(getAllUserChannels(workspaceId));
          await dispatch(getAllWorkspaceChannels(workspaceId));
          await dispatch(clearWorkspaceChannelId());
          setShowModal(false);
  };


    return (
      <div className="about-page">
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

        <div className="edit-channel-description-btn" onClick={openDescriptionModal}>
          <div className="channel-info-card">
            <div className="description-label">description</div>
            <div className="description">
              {channel.description ? channel.description : "Add a description"}
            </div>
          </div>
          <button className="blank-edit-btn">Edit</button>
        </div>

        <div className="create-by-info">
          <div className="created-by-container">
            <div className="created-by">Created by</div>
            <div> {channel.owner_info.first_name} {channel.owner_info.last_name} on {channel.created_at.slice(0,17)} </div>
          </div>
        </div>

        <div className="leave-chanel-about-page">
          <div className="leave-channel-btn-about" onClick={() => handleLeave(channel.id, channel.workspace_id)}>Leave channel</div>
        </div>

        {showModal && (
          <SmallModal onClose={() => setShowModal(false)}>
            <RenameChannel
              channel={channel}
              closeModal={() => setShowModal(false)}
            />
          </SmallModal>
        )}
        {
          showDescriptionModal && (
            <SmallModal onClose={() => setShowDescriptionModal(false)}>
              <EditDescription channel={channel} closeModal={() => setShowDescriptionModal(false)}
              />
            </SmallModal>
          )
        }
      </div>
    );
}


export default About
