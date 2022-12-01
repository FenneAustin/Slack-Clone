import React from "react";
import './index.css'
import {  useSelector } from "react-redux";
import BrowseChannels from "../browsechannels/index.js";
import MessageContent from "./messageContent/index.js";

const Content = () => {

  const channelsui = useSelector((state) => state.ui.showAllChannels);
  const showChannelMessages = useSelector((state) => state.ui.channelId);
  const showDirectMessages = useSelector((state) => state.ui.chatId);

   return (
     <div className="content-container">
       {channelsui ? <BrowseChannels />  : null}
       { showChannelMessages ? <MessageContent /> : null }
       { showDirectMessages ? <MessageContent /> : null }

     </div>
   );


  }

export default Content;
