import React from 'react'
import "./index.css"
import {useSelector} from 'react-redux'
import  PeopleList  from './peoplelist/index.js'

const FeedHeader = () => {

    const chatId = useSelector((state) => state.ui.chatId);
    const channelId = useSelector((state) => state.ui.channelId);
    const channel = useSelector((state) => state.channel[channelId]);
    const chat = useSelector((state) => state.chat[chatId]);
    const sessionUser = useSelector((state) => state.session.user);


    return (
      <div className="feed-header">
        {chatId && (
          <h1>
            {chat.user_one.id === sessionUser.id
              ? chat.user_two.first_name
              : chat.user_one.first_name}
              {" "}
            {chat.user_one.id === sessionUser.id
              ? chat.user_two.last_name
              : chat.user_one.last_name}
          </h1>
        )}
        {channelId && <h1>{channel.name}</h1>}
        {channelId && <PeopleList channelId={channelId}/>}
      </div>
    );
}

export default FeedHeader;
