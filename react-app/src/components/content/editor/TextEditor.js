import React, {useState} from 'react';
import { useEditor, EditorContent, Editor } from "@tiptap/react";
import CharacterCount from "@tiptap/extension-character-count";
import StarterKit from "@tiptap/starter-kit";
import MenuBar from "./MenuBar";
import {useDispatch, useSelector} from 'react-redux';
import "./TextEditor.css"
import { GrSend } from "react-icons/gr";
import { createNewMessage } from '../../../store/message';
import {useParams, useHistory} from 'react-router-dom'

const TextEditor = () => {
        const history = useHistory();
        const dispatch = useDispatch();
        const [text, setText] = useState("");

        const sessionUser = useSelector((state) => state.session.user);
        // get the current chat id
        const {chatId} = useParams();
        // get the current channel id
        const {channelId} = useParams();


        const editor = useEditor({
          extensions: [
            StarterKit,
            CharacterCount.configure({
              limit: 200,
            }),
          ],
          onUpdate({ editor }) {
            setText(editor.getText());
          },
        });

        // create useState to check params for channel or dm
        // if channel, create message with channel id
        // if dm, create message with dm id

        const handleSubmit = (e) => {
          //check if chatId or channelId is null
          //if chatId is null, create a message with channelId
          //if channelId is null, create a message with chatId
          e.preventDefault();
          if (chatId) {
            const message = {
            'message': text,
            'user_id': sessionUser.id,
            'chat_id': chatId,
            'channel_id': null,
          };
            dispatch(createNewMessage(message));
            editor.commands.setContent("");
          } else if (channelId) {
            const message = {
            'message': text,
            'user_id': sessionUser.id,
            'chat_id': null,
            'channel_id': channelId,
          };
            dispatch(createNewMessage(message));
            editor.commands.setContent("");
          }
        };

    return (
      <div className="bundled-editor">
        <MenuBar />
        <EditorContent editor={editor} className="editor" />
        <button className="send-btn" onClick={handleSubmit}>
          <GrSend />
        </button>
      </div>
    );


};

export default TextEditor;
