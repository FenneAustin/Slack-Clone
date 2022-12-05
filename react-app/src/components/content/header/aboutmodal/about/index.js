import React, {useState} from "react"
import "./index.css"
import { TbHash } from "react-icons/tb";
import RenameChannel from "./renamechannel/renamechannel.js"
import { SmallModal } from "../../../../../context/smallModal.js";

const About = ({channel}) => {

    const [showModal, setShowModal] = useState(false);

    const openModal = () => {
        setShowModal(true);
    }


    return (
      <div className="about-page">
        <button className="edit-channel-name-btn" onClick={openModal}>

          <div className="channel-info-card">
            <div className=""> Channel name</div>
            <div className="cur-channel-name">
              <TbHash />
              <div>{channel.name}</div>
            </div>
          </div>

          <button className="blank-edit-btn">edit</button>
        </button>
        {showModal && (
            <SmallModal onClose={() => setShowModal(false)}>
                <RenameChannel channelName={channel.name} closeModal={() => setShowModal(false)}/>
            </SmallModal>
        )}
      </div>
    );
}


export default About
