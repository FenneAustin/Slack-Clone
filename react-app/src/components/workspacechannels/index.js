import React, { useEffect, useContext, useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import "./index.css"
import { getAllWorkspaceChannels, getAllUserChannels } from "../../store/channels"
import { TbHash } from "react-icons/tb";
import { setWorkspaceChannelId, clearChatId, clearWorkspaceChannelId, showAllChannels} from "../../store/ui"
import { clearMessages, getAllChannelMessages } from "../../store/message"
import { SocketContext } from "../../context/socket"
import { joinRoomThunk, leaveRoomThunk, socketRoomSelector } from "../../store/socketrooms"
import { AiOutlinePlus } from "react-icons/ai";
import AddChannelModal from "./addChannels/index.js";
import { hideAllChannels } from "../../store/ui"
import { getChannelUsersList } from "../../store/channel"
import {Modal} from "../../context/Modal"
import AddChannelForm from "./addChannels/addChannelForm";


const WorkspaceChannels = ({workspaceId}) => {

    const socket = useContext(SocketContext)
    const dispatch = useDispatch()
    const room = useSelector(socketRoomSelector)

    const [isHovered, setIsHovered] = useState(false)
    const [showMenu, setShowMenu] = useState(false)
    const [showModal, setShowModal] = useState(false)

    const openMenu = () => {
      if (showMenu) return;
      setShowMenu(true);
    }

    const onHover = () => {
      setIsHovered(!isHovered)
    }

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);


    useEffect(async()=> {
        if(workspaceId !== null){
          await dispatch(getAllUserChannels(workspaceId));
          await dispatch(getAllWorkspaceChannels(workspaceId));
        }
    }, [workspaceId])

    const channels = useSelector((state) => state.channel.usersChannels);

    const handleChannelClick = (id) => {
        dispatch(hideAllChannels())
        dispatch(clearMessages())
        dispatch(getAllChannelMessages(id))
        dispatch(clearChatId())
        dispatch(setWorkspaceChannelId(id))
        dispatch(getChannelUsersList(id))
        if (room) {
            dispatch(leaveRoomThunk(room, socket))
        }
        const data = { 'id': id, 'roomtype': "channel" };
        dispatch(joinRoomThunk(data, socket))

    }

      const handleBrowse = async () => {
        await dispatch(clearChatId());
        await dispatch(clearWorkspaceChannelId());
        await dispatch(showAllChannels());
      };

    return (
      <div className="channels-container">
        <div
          className="channel-title-container"
          onMouseEnter={onHover}
          onMouseLeave={onHover}
        >
          <h4 className="column-title">Channels</h4>
          {isHovered && (
            <button className="add-channels-btn">
              <AiOutlinePlus className="add-channel-btn" onClick={openMenu} />
            </button>
          )}
        </div>
        {showMenu && (
          <div className="add-new-channel-parent">
          <div className="add-new-channel-plus">
            <div className="buttons-add-new-channels-container">
              <div
                className="add-channel-item"
                onClick={() => setShowModal(true)}
              >
                Create a new channel
              </div>
              <div className="add-channel-item" onClick={() => handleBrowse()}>
                Browse channels
              </div>
            </div>
          </div>
          </div>
        )}
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <AddChannelForm closeModal={() => setShowModal(false)} />
          </Modal>
        )}
        {Object.values(channels).map((channel, i) => {
          return (
            <div
              className="channels-list"
              key={i}
              onClick={() => handleChannelClick(channel.id)}
            >
              <TbHash className="channel-hash" />
              <div className="channel-name" key={i}>
                {" "}
                {channel.name}{" "}
              </div>
            </div>
          );
        })}
        <AddChannelModal />
      </div>
    );
}

export default WorkspaceChannels
