import React, {useState, useContext, useEffect} from 'react';
import { useEditor, EditorContent, Editor } from "@tiptap/react";
import CharacterCount from "@tiptap/extension-character-count";
import StarterKit from "@tiptap/starter-kit";
import MenuBar from "./MenuBar";
import {useDispatch, useSelector} from 'react-redux';
import Placeholder from "@tiptap/extension-placeholder";
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
        const chatId = useSelector((state) => state.ui.chatId);
        const channelId = useSelector((state) => state.ui.channelId);
        const channelName= useSelector((state) => state.channel[channelId]?.name);
        const chat = useSelector((state) => state.chat[chatId]);
        const [chatName, setChatName] = useState(null);
        const [roomType, setRoomType] = useState(null);

        useEffect(() => {
          if (chatId) {
            setRoomType('chat')
            // check if user_one or user_two is the current user and assign the other user's name to chatName
            if (chat.user_one.id == sessionUser.id) {
              setChatName(chat.user_two.first_name)
            }
            else {
              setChatName(chat.user_one.first_name)
            }
          }
          else if (channelId) {
            setRoomType('channel')
          }
        },[chatId, channelId, chat])


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
            Placeholder.configure({
              placeholder: 'write something...'
            
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
          }
          else if (channelId) {
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
