import React,{useEffect, useState} from "react";
import {useLocation, useParams} from 'react-router-dom'
import { getAllDMMessages } from "../../store/message";
import {useDispatch, useSelector} from 'react-redux'


const MessageFeed = () => {

    const dispatch = useDispatch()
    const [roomType, setRoomType] = useState();
    const { chatId } = useParams();
    const { channelId } = useParams();
    const location = useLocation();
    const type = location.pathname;

    useEffect(() => {
        console.log(location.pathname)

        if (location.pathname.slice(0,8) == '/channel'){
            console.log(channelId)
        }
        if (location.pathname.slice(0, 6) == "/chats") {
            setRoomType('dm')
            console.log(typeof chatId)
            dispatch(getAllDMMessages(chatId))
        }

    },[location.pathname])

    return (
        <div>
            hello
        </div>
    )
}


export default MessageFeed;
