import React, {useState, useContext} from 'react';
import { useEditor, EditorContent, Editor } from "@tiptap/react";
import CharacterCount from "@tiptap/extension-character-count";
import StarterKit from "@tiptap/starter-kit";
import MenuBar from "./MenuBar";
import {useDispatch, useSelector} from 'react-redux';
import "./TextEditor.css"
import { GrSend } from "react-icons/gr";
import { createNewMessage } from '../../../store/message';
import { SocketContext } from "../../../context/socket";

const TextEditor = () => {
        const socket = useContext(SocketContext);
        const dispatch = useDispatch();
        const [text, setText] = useState("");

        const sessionUser = useSelector((state) => state.session.user);
        // get the current chat id
        const chatId = useSelector((state) => state.ui.chatId);
        // get the current channel id
        const channelId = useSelector((state) => state.ui.channelId);


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


        const handleSubmit = (e) => {

          if (chatId) {
            const message = {
            'message': text,
            'user_id': sessionUser.id,
            'chat_id': chatId,
            'channel_id': null,
          };
            dispatch(createNewMessage(message));
            const data = { 'id' : chatId, 'roomtype': 'chat'}
            socket.emit("UPDATE_CHAT_MESSAGES", data);
            editor.commands.setContent("");
          } else if (channelId) {
            const message = {
            'message': text,
            'user_id': sessionUser.id,
            'chat_id': null,
            'channel_id': channelId,
          };
            dispatch(createNewMessage(message));
            const data = { 'id' : channelId, 'roomtype': 'channel'}
            socket.emit("UPDATE_CHANNEL_MESSAGES", data);
            editor.commands.setContent("");
          }
        };

    return (
      <div className="bundled-editor">
        <MenuBar editor={editor}/>
        <EditorContent editor={editor} className="editor" />
        <button className="send-btn" onClick={() => handleSubmit()}>
          <GrSend />
        </button>
      </div>
    );


};

export default TextEditor;
