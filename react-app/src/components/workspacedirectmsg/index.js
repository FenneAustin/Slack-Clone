import React, { useEffect, useContext, useState } from "react";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllWorkspaceChats } from "../../store/chat";
import { clearMessages, getAllDMMessages } from "../../store/message";
import { clearWorkspaceChannelId, setChatId, hideAllChannels } from "../../store/ui";
import { SocketContext } from "../../context/socket";
import {
  joinRoomThunk,
  leaveRoomThunk,
  socketRoomSelector,
} from "../../store/socketrooms";
import { AiOutlinePlus } from "react-icons/ai";
import AddPeopleBtn from "../addpeoplebtn";
import { showAllChannels } from "../../store/ui";


const WorkspaceDirectMsg = ({ workspaceId }) => {
  const socket = useContext(SocketContext);
  const dispatch = useDispatch();
  const chats = Object.values(useSelector((state) => state.chat));
  const sessionUser = useSelector((state) => state.session.user);
  const room = useSelector(socketRoomSelector);

  const [isHovered, setIsHovered] = useState(false);

  const onHover = () => {
    setIsHovered(!isHovered);
  };

  useEffect(() => {
    if (workspaceId !== null) {
      dispatch(getAllWorkspaceChats(workspaceId));
    }
  }, [workspaceId]);

  const handleChatClick = (id) => {
    dispatch(hideAllChannels());
    dispatch(clearMessages());
    dispatch(getAllDMMessages(id))
    dispatch(clearWorkspaceChannelId())
    dispatch(setChatId(id))
    if(room) {
      dispatch(leaveRoomThunk(room, socket))
    }
    const data = { 'id': id, 'roomtype': "chat" };
    dispatch(joinRoomThunk(data, socket))
  }


  const handlePlusClick = () => {
    dispatch(showAllChannels());
  };

  return (
    <div className="messages-container">
      <div
        className="messages-title-container"
        onMouseEnter={onHover}
        onMouseLeave={onHover}
      >
        <h4 className="column-title">Direct messages</h4>
        {isHovered && (
          <button className="new-msg-btn">
            <AiOutlinePlus className="add-channel-btn" onClick={() => handlePlusClick()}/>
          </button>
        )}
      </div>
      {chats.map((chat, i) => {
        const selectedUser =
          chat.user_one.email == sessionUser.email
            ? chat.user_two
            : chat.user_one;

        return (
          <div
            className="channels-list-users"
            key={i}
            onClick={() => handleChatClick(chat.id)}
          >
            <div className="user-avatar-list">
              <img
                className="profile-dm"
                src={selectedUser.profile_image.url}
                alt="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6sGddmMZFZCqb7aJFx5eV-8FGj2gJWz7abGntj8IuyYdAv7W2HEJyi5WY3xbpLLzf-Zg&usqp=CAU"
              />
            </div>
            <div className="dm-user-name">
              {selectedUser.first_name}, {selectedUser.last_name}
            </div>
          </div>
        );
      })}
      <AddPeopleBtn />
    </div>
  );
};

export default WorkspaceDirectMsg;
