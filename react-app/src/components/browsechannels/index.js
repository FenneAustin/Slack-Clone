import "./index.css"
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllUserChannels, getAllWorkspaceChannels } from "../../store/channels";
import { TbHash } from "react-icons/tb";
import { leaveChannel, joinChannel } from "../../store/channels";
import ChannelCard from "./channelcard";
import AddChannelForm from "../workspacechannels/addChannels/addChannelForm";
import { Modal } from "../../context/Modal";

const BrowseChannels = () => {

    const channels = Object.entries(useSelector((state) => state.channel)).filter(([key, value]) => key != "usersChannels");
    const myChannels = useSelector((state) => state.channel.usersChannels);
    const dispatch = useDispatch();
    const curWorkspace = useSelector((state) => state.ui.workspaceId);
    const [showModal, setShowModal] = useState(false);

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

    const handleLeave = async (id) => {
      await dispatch(leaveChannel(id));
      await dispatch(getAllUserChannels(curWorkspace))
      await dispatch(getAllWorkspaceChannels(curWorkspace));
    }

    const handleJoin = async (id) => {
      await dispatch(joinChannel(id));
      await dispatch(getAllUserChannels(curWorkspace))
      await dispatch(getAllWorkspaceChannels(curWorkspace));
    }

    return (
      <div>
        <div className="all-channels-page-title">
          <div className="title-text-all-channels">All Channels</div>
          <button className="all-channels-title-create-btn" onClick={() => setShowModal(true)}>Create Channel</button>
        </div>
        <div className="channels-count-total"><div className="channel-count-text">{Object.values(channels).length} results</div></div>
        {channels.map((channel, i) => {
          return (
                  <ChannelCard channel={channel} isInChannel={isInChannel} key={i} handleLeave={handleLeave} handleJoin={handleJoin}/>
          );
        })}
        <div className="all-channels-create-btn-bot">
            <button className="create-channel-all" onClick={() => setShowModal(true)}> Create Channel</button>
        </div>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <AddChannelForm closeModal={() => setShowModal(false)} />
          </Modal>
        )}
      </div>
    );
}


export default BrowseChannels;
