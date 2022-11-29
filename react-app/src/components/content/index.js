import React, { useState, useEffect, useContext } from "react";
import {useParams, useLocation} from 'react-router-dom'
import TextEditor from './editor/TextEditor';
import MessageFeed from '../messagefeed';
import './index.css'
import { getAllDMMessages, getAllChannelMessages } from "../../store/message";
import { useDispatch, useSelector } from "react-redux";
import FeedHeader from "./header/index.js";


const Content = () => {

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


export default Content;
