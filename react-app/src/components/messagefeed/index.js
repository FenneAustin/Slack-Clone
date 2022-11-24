import React,{useEffect, useState} from "react";
import {useLocation, useParams} from 'react-router-dom'
import { getAllDMMessages, getAllChannelMessages } from "../../store/message";
import {useDispatch, useSelector} from 'react-redux'
import MessageEditor from "./editor/index.js"
import './index.css';


const MessageFeed = () => {

    const dispatch = useDispatch()
    const [roomType, setRoomType] = useState();
    const { chatId } = useParams();
    const { channelId } = useParams();
    const location = useLocation();
    const type = location.pathname;

    const Messages = Object.values(useSelector((state) => state.message))

    useEffect(() => {
        if (location.pathname.slice(0,8) == '/channel'){
            setRoomType("Channel")
            dispatch(getAllChannelMessages(channelId))
        }
        if (location.pathname.slice(0, 6) == "/chats") {
            setRoomType('dm')
            dispatch(getAllDMMessages(chatId))
        }

    },[location.pathname])

    return (
        <div className="message-feed">
            {Messages.map((message,i) => {
               return (
                 <div className="message-container">
                   <img
                     className="text-profile-pic"
                     src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6sGddmMZFZCqb7aJFx5eV-8FGj2gJWz7abGntj8IuyYdAv7W2HEJyi5WY3xbpLLzf-Zg&usqp=CAU"
                     alt=""
                   />
                   <div>{message.user.first_name} {message.user.last_name}</div>
                   <MessageEditor messageId={message.id} text={message.text} />
                 </div>
               );
            })}
        </div>
    )
}


export default MessageFeed;
