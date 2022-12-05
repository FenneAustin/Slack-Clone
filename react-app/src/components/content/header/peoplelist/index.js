import "./index.css";
import React, { useEffect, useState} from "react"
import {useSelector, useDispatch} from 'react-redux'
import { getChannelUsersList } from "../../../../store/channel";
import { Modal } from "./../../../../context/Modal";
import AboutModal from "../aboutmodal/index.js"


const PeopleList = ({channelId}) => {

    const [showModal, setShowModal] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getChannelUsersList(channelId))
    },[])

    const channelUsers = useSelector((state) => state.channelinfo.users);

    const openModal = () => {
        setShowModal(true);
    }

    return (
      <div className="people-list" >
        {channelUsers && (
          <button className="user-list-btn" onClick={openModal}>
            <img
              className="user-list-preview"
              src={channelUsers[0].user.profile_image.url}
              alt="user-list-preview"
            />
          </button>
        )}
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <AboutModal channelId={channelId} closeModal={() => setShowModal(false)} />
          </Modal>
        )}
      </div>
    );
}

export default PeopleList;
