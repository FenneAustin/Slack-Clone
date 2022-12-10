import React, {useState, useContext, useEffect} from 'react';
import { useEditor, EditorContent, Editor } from "@tiptap/react";
import CharacterCount from "@tiptap/extension-character-count";
import StarterKit from "@tiptap/starter-kit";
import MenuBar from "./MenuBar";
import {useDispatch, useSelector} from 'react-redux';
import "./TextEditor.css"
import { GrSend } from "react-icons/gr";
import { IoMdSend } from "react-icons/io";
import { createNewMessage } from '../../../store/message';
import { SocketContext } from "../../../context/socket";

const TextEditor = () => {
        const socket = useContext(SocketContext);
        const dispatch = useDispatch();
        const [text, setText] = useState("");
        const [blankMsg, setBlankMsg] = useState(true);

        const sessionUser = useSelector((state) => state.session.user);
        // get the current chat id
        const chatId = useSelector((state) => state.ui.chatId);
        // get the current channel id
        const channelId = useSelector((state) => state.ui.channelId);


        useEffect(() => {
          if(text.replaceAll(" ", "").length == 0){
            setBlankMsg(true);
          } else if (text.length == 0) {
            setBlankMsg(true);
          }
          else {
            setBlankMsg(false);
          }
        },[text])

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

          if (!text.replaceAll(" ", "").length == 0 ) {

          if (chatId) {
            const message = {
            'message': text,
            'user_id': sessionUser.id,
            'chat_id': chatId,
            'channel_id': null,
          };
            dispatch(createNewMessage(message));
            const data = { 'id': chatId, 'roomtype': 'chat'}
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
          setBlankMsg(true);
          setText('');
        }
      };

    return (
      <div className="bundled-editor">
        <MenuBar editor={editor}/>
        <EditorContent editor={editor} className="editor" />
        <button className="send-btn" onClick={() => handleSubmit()}>
          {/* <GrSend className={ blankMsg ?  "blank-msg" : "btn-send" }/> */}
          <IoMdSend className={blankMsg ? "blank-msg" : "btn-send"}/>
        </button>
      </div>
    );


};

export default TextEditor;
