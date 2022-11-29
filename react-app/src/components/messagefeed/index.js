import React,{useEffect, useState, useContext} from "react";
import {useLocation, useParams} from 'react-router-dom'
import { getAllDMMessages, getAllChannelMessages } from "../../store/message";
import {useDispatch, useSelector} from 'react-redux'
import MessageEditor from "./editor/index.js"
import './index.css';
import {SocketContext} from '../../context/socket'

const MessageFeed = () => {

  const dispatch = useDispatch();
  const Messages = Object.values(useSelector((state) => state.message));
  const socket = useContext(SocketContext);


  useEffect(() => {
    socket.on("UPDATE_CHAT_MESSAGES", async (data) => {
      await dispatch(getAllDMMessages(data.id));
    });

    socket.on("UPDATE_CHANNEL_MESSAGES", async (data) => {
      await dispatch(getAllChannelMessages(data.id));
    })

}, [])


  return (
    <div className="message-feed">
      {Messages.map((message, i) => {
        return (
          <div className="message-container" key={i}>
            <div className="msg-header">
            <img
              className="text-profile-pic"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6sGddmMZFZCqb7aJFx5eV-8FGj2gJWz7abGntj8IuyYdAv7W2HEJyi5WY3xbpLLzf-Zg&usqp=CAU"
              alt=""
            />
            <div>
              {message.user.first_name} {message.user.last_name}
            </div>
            </div>
            <MessageEditor messageId={message.id} text={message.text} />
          </div>
        );
      })}
    </div>
  );
}


export default MessageFeed;
