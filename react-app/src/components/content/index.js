import React, {useState} from 'react'
import {useParams} from 'react-router-dom'
import TextEditor from './editor/TextEditor';

const Content = () => {


    return (
      <div className="content-container">
            <TextEditor />
      </div>
    );
}


export default Content;
