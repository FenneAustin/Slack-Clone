import React from "react";
import './index.css'
import {  useSelector } from "react-redux";
import BrowseChannels from "../browsechannels/index.js";
import MessageContent from "./messageContent/index.js";
import WritePage from "./writepage/index.js";

const Content = () => {

  const channelsui = useSelector((state) => state.ui.showAllChannels);
  const showChannelMessages = useSelector((state) => state.ui.channelId);
  const showDirectMessages = useSelector((state) => state.ui.chatId);
  const showWritePage = useSelector((state) => state.ui.showWritepage);

   return (
       <div className="content-container">
         {channelsui ? <BrowseChannels /> : null}
         {showChannelMessages ? <MessageContent /> : null}
         {showDirectMessages ? <MessageContent /> : null}
         {showWritePage ? <WritePage /> : null}
       </div>
   );


  }

export default Content;
