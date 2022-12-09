import React, {useEffect} from 'react'
import "./index.css"
import {useSelector, useDispatch} from 'react-redux'
import  PeopleList  from './peoplelist/index.js'
import AddPeopleModal from "./addpeoplemodal/index.js"
import { getListOfUsers } from "../../../store/workspaceinfo";

const FeedHeader = () => {

    const dispatch = useDispatch();
    const chatId = useSelector((state) => state.ui.chatId);
    const channelId = useSelector((state) => state.ui.channelId);
    const channel = useSelector((state) => state.channel[channelId]);
    const chat = useSelector((state) => state.chat[chatId]);
    const sessionUser = useSelector((state) => state.session.user);
    const workspaceId = useSelector((state) => state.ui.workspaceId);

        useEffect(() => {
          dispatch(getListOfUsers(workspaceId));
        }, []);


    return (
      <div className="feed-header">
        <div className="all-channel-info-container">
          {chat && (
            <h1>
              {chat?.user_one.id === sessionUser.id
                ? chat?.user_two.first_name
                : chat?.user_one.first_name}{" "}
              {chat.user_one.id === sessionUser.id
                ? chat?.user_two.last_name
                : chat?.user_one.last_name}
            </h1>
          )}
          {channelId && <div className="channel-name-top-bar"><h2>{channel.name}</h2></div>}
          {channelId && (
            <div className="channel-add-info-container">
              <div className="channel-edit-button">
                <PeopleList channelId={channelId} />
                <div>{channel.total_members}</div>
              </div>
              <div className="add-people-btn-container">
                <AddPeopleModal className="add-people-btn" />
              </div>
            </div>
          )}
        </div>
      </div>
    );
}

export default FeedHeader;
