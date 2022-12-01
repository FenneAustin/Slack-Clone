import React, {useState, useEffect} from "react"
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {useSelector} from "react-redux"

import "./index.css"

const MessageEditor = ({messageId, text, editable }) => {
    // const [editable, setEditable] = useState(false)



    const editor = useEditor({
      editable,
      content: text,
      extensions: [StarterKit],
    });

    useEffect(() => {
        if(!editor){
            return undefined
        }

        editor.setEditable(editable)
    }, [editor, editable])

    if(!editor) {
        return null
    }


    return (
      <div className="message-container-text" >
          {/* <input type="checkbox" id="editable" value={editable} onChange={(event) => setEditable(event.target.checked)}/> */}
        <EditorContent editor={editor} />
      </div>
    );

}

export default MessageEditor
