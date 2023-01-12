import React from "react"
import "./index.css"
import TextEditor from "../editor/TextEditor";
import FeedHeader from "../header";
import MessageFeed from "../../messagefeed/index";


const MessageContent = () => {


    return (
      <div className="content-container">
        <div>
          <FeedHeader />
          <MessageFeed />
        </div>
        <TextEditor className="text-editor" />
      </div>
    );
}


export default MessageContent;
