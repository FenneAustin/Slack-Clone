import "./index.css"
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllWorkspaceChannels } from "../../store/channels";
import { TbHash } from "react-icons/tb";

const BrowseChannels = () => {

    const channels = Object.values(useSelector((state) => state.channel));
    const dispatch = useDispatch();
    const curWorkspace = useSelector((state) => state.ui.workspaceId);

    useEffect(() => {
        dispatch(getAllWorkspaceChannels(curWorkspace));
    },[])

    return (
      <div>
        <div className="all-channels-page-title">
          <div>All Channels</div>
          <button className="all-channels-title-create-btn">Create Channel</button>
        </div>
        <div className="channels-count-total">{channels.length} channels</div>
        {channels.map((channel, i) => {
          return (
            <div key={i}>
              <div>
                <TbHash />
                <h3>{channel.name}</h3>
              </div>
            </div>
          );
        })}
        <div className="all-channels-create-btn-bot">
            <button className="create-channel-all"> Create Channel</button>
        </div>
      </div>
    );
}


export default BrowseChannels;
