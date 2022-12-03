import React, { useEffect, useContext } from "react";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllWorkspaceChats } from "../../store/chat";
import { NavLink } from "react-router-dom";
import { clearMessages, getAllDMMessages } from "../../store/message";
import { clearWorkspaceChannelId, setChatId, hideAllChannels } from "../../store/ui";
import { socket, SocketContext } from "../../context/socket";
import {
  joinRoomThunk,
  leaveRoomThunk,
  socketRoomSelector,
} from "../../store/socketrooms";
import { AiOutlinePlus } from "react-icons/ai";
import AddPeopleBtn from "../addpeoplebtn";


const WorkspaceDirectMsg = ({ workspaceId }) => {
  const socket = useContext(SocketContext);
  const dispatch = useDispatch();
  const chats = Object.values(useSelector((state) => state.chat));
  const sessionUser = useSelector((state) => state.session.user);
  const room = useSelector(socketRoomSelector);

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

  return (
    <div className="messages-container">
      <div className="messages-title-container">
        <h4 className="column-title">Direct messages</h4>
        <button className="new-msg-btn">
          <AiOutlinePlus />
        </button>
      </div>
      {chats.map((chat, i) => {
        const selectedUser =
          chat.user_one.email == sessionUser.email
            ? chat.user_two
            : chat.user_one;

        return (
          <div className="channels-list" key={i} onClick={() => handleChatClick(chat.id)}>
              <img
              className="profile-dm"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6sGddmMZFZCqb7aJFx5eV-8FGj2gJWz7abGntj8IuyYdAv7W2HEJyi5WY3xbpLLzf-Zg&usqp=CAU"
              alt=""
            />
            {selectedUser.first_name}, {selectedUser.last_name}
            </div>

        );
      })}
      <AddPeopleBtn />
    </div>
  );
};

export default WorkspaceDirectMsg;
