import React,{useEffect, useState, useContext} from "react";
import { getAllDMMessages, getAllChannelMessages } from "../../store/message";
import {useDispatch, useSelector} from 'react-redux'
import './index.css';
import {SocketContext} from '../../context/socket'
import Message from "./message/index.js";

const MessageFeed = () => {

  const dispatch = useDispatch();
  const Messages = Object.values(useSelector(state => state.message));
  const socket = useContext(SocketContext);
  const sessionUser = useSelector((state) => state.session.user);



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
      {(Messages).map((message, i) => {
        return (
          <Message message={message} key={i} user={sessionUser} />
        );
      })}
    </div>
  );
}


export default MessageFeed;
