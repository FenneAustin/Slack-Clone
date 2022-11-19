import React, {useState} from 'react';
import { useEditor, EditorContent, Editor } from "@tiptap/react";
import CharacterCount from "@tiptap/extension-character-count";
import StarterKit from "@tiptap/starter-kit";
import MenuBar from "./MenuBar";
import "./TextEditor.css"
import { GrSend } from "react-icons/gr";

const TextEditor = () => {

        const [text, setText] = useState("");

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



    return (
      //MenuBar editor={editor}
      <div className="bundled-editor">
        <MenuBar />
        <EditorContent editor={editor} className="editor" />
        <button className="send-btn">
          <GrSend />
        </button>
      </div>
    );


};

export default TextEditor;
