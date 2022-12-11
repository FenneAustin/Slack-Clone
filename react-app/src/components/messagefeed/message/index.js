import React, {useState, useContext} from "react"
import MessageToolBar from "../messagetoolbar/index.js";
import MessageEditor from "../editor/index.js";
import "./index.css";
import { updateExistingMessage, deleteExistingMessage } from "../../../store/message.js";
import { useDispatch, useSelector } from "react-redux";
import {SocketContext} from "../../../context/socket";

const Message = ({message, user}) => {
  const dispatch = useDispatch();

  const socket = useContext(SocketContext);

  // get the current chat id
  const chatId = useSelector((state) => state.ui.chatId);
  // get the current channel id
  const channelId = useSelector((state) => state.ui.channelId);

  const [showToolbar, setShowToolbar] = useState(false);
  const [editable, setEditable] = useState(false);

  const handleMouseOver = () => {
    setShowToolbar(true);
  };

  const handleMouseOut = () => {
    setShowToolbar(false);
  };

  const handleEdit = () => {
    setEditable(true);
  };

  const handleSave = (messageId, messageInfo) => {

    if (messageInfo.replaceAll(" ", "").length === 0) {
      return
    }

    if (chatId) {
      const message = {
            'message': messageInfo,
            'user_id': user.id,
            'chat_id': chatId,
            'channel_id': null,
      };
      dispatch(updateExistingMessage(messageId, message));
      const data = { id: chatId, roomtype: "chat" };
      socket.emit("UPDATE_CHAT_MESSAGES", data);
    }
    else if (channelId) {
      const message = {
        'message': messageInfo,
        'user_id': user.id,
        'chat_id': null,
        'channel_id': channelId,
      };
      dispatch(updateExistingMessage(messageId, message));
      const data = { id: channelId, roomtype: "channel" };
      socket.emit("UPDATE_CHANNEL_MESSAGES", data);

    }
    setEditable(false);

  };

  const handleDelete = (messageId) => {
    if(chatId){
    dispatch(deleteExistingMessage(messageId));
    const data = { id: chatId, roomtype: "chat" };
    socket.emit("UPDATE_CHAT_MESSAGES", data);
    }
    else if (channelId) {
      dispatch(deleteExistingMessage(messageId));
      const data = { id: channelId, roomtype: "channel" };
      socket.emit("UPDATE_CHANNEL_MESSAGES", data);
    }
  }

  const handleCancel = () => {
    setEditable(false);
  };

  return message ? (
    <div
      className={editable ? "message-container-editing" : "message-container"}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <div className="msg-header">
        <div className="user-info">
          <div className="message-image-container">
            <img
              className="text-profile-pic"
              src={
                message.user.profile_image.url
                  ? message.user.profile_image.url
                  : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6sGddmMZFZCqb7aJFx5eV-8FGj2gJWz7abGntj8IuyYdAv7W2HEJyi5WY3xbpLLzf-Zg&usqp=CAU"
              }
              alt="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6sGddmMZFZCqb7aJFx5eV-8FGj2gJWz7abGntj8IuyYdAv7W2HEJyi5WY3xbpLLzf-Zg&usqp=CAU"
            />
          </div>
          <div className="sending-user-name">
            {message?.user.first_name} {message?.user.last_name}
          </div>
        </div>

        {user.id == message.user.id ? (
          <MessageToolBar
            message={message}
            shown={showToolbar}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            editable={editable}
          />
        ) : null}
      </div>
      <MessageEditor
        messageId={message.id}
        text={message.text}
        editable={editable}
        handleCancel={handleCancel}
        handleSave={handleSave}
      />
    </div>
  ) : null;
}


export default Message;
