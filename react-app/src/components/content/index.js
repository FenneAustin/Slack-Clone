import React, {useState} from 'react'
import {useParams} from 'react-router-dom'
import TextEditor from './editor/TextEditor';
import MessageFeed from '../messagefeed';
import './index.css'
const Content = () => {


    return (
      <div className="content-container">
            <MessageFeed />
            <TextEditor className="text-editor"/>
      </div>
    );
}


export default Content;
