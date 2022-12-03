import "./index.css"
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllWorkspaceChannels } from "../../store/channels";
import { TbHash } from "react-icons/tb";
import { leaveChannel, joinChannel } from "../../store/channels";
import ChannelCard from "./channelcard";

const BrowseChannels = () => {

    const channels = Object.entries(useSelector((state) => state.channel)).filter(([key, value]) => key != "usersChannels");
    const myChannels = useSelector((state) => state.channel.usersChannels);
    const dispatch = useDispatch();
    const curWorkspace = useSelector((state) => state.ui.workspaceId);

    useEffect(() => {
        dispatch(getAllWorkspaceChannels(curWorkspace));
    },[]);


    // check if a given channel id is in the channels object
    const isInChannel = (channelId) => {
        if (myChannels[channelId]) {
            return true;
        }
        return false;
    }

    const handleLeave = (id) => {
      dispatch(leaveChannel(id));
    }

    const handleJoin = (id) => {
      dispatch(joinChannel(id));
    }

    return (
      <div>
        <div className="all-channels-page-title">
          <div className="title-text-all-channels">All Channels</div>
          <button className="all-channels-title-create-btn">Create Channel</button>
        </div>
        <div className="channels-count-total"><div className="channel-count-text">{Object.values(channels).length} results</div></div>
        {channels.map((channel, i) => {
          return (
                  <ChannelCard channel={channel} isInChannel={isInChannel} key={i} handleLeave={handleLeave} handleJoin={handleJoin}/>
          );
        })}
        <div className="all-channels-create-btn-bot">
            <button className="create-channel-all"> Create Channel</button>
        </div>
      </div>
    );
}


export default BrowseChannels;
