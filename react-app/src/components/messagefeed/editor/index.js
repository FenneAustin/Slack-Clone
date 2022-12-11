import React, {useState, useEffect} from "react"
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {useSelector} from "react-redux"
import "./index.css"
import CharacterCount from "@tiptap/extension-character-count";

const MessageEditor = ({messageId, text, editable, handleCancel, handleSave }) => {

    const [messageContext, setMessageContext] = useState(text);
    const [originalText, setOriginalText] = useState(text);
    const message = useSelector((state) => state.message[messageId]);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
      setOriginalText(message.text);
      setMessageContext(message.text);
      // set editor text content to message text
      if(editor) editor.commands.setContent(message.text);

    }, [message]);


    useEffect(()=> {
      if (messageContext.replaceAll(" ", "").length === 0) {
        setIsError(true);
      }
      else {
        setIsError(false);
      }
    }, [messageContext])


    const editor = useEditor({
      editable,
      content: text,
      extensions: [StarterKit,
      CharacterCount.configure({
        limit: 200,
      })
    ],
      onUpdate({ editor }) {
        setMessageContext(editor.getText());
      }
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
      <div className="message-container-text">
        {/* <input type="checkbox" id="editable" value={editable} onChange={(event) => setEditable(event.target.checked)}/> */}
        <EditorContent editor={editor} className="editor-width-set" />

          {editable ? (
            <div className="edit-btns-container-text">
              {isError && <div className="error-msg-text">
                Text cannot be empty
              </div> }
              <button
                className="cancel-text-edit-btn"
                onClick={() => {
                  handleCancel();
                  editor.commands.setContent(originalText);
                }}
              >
                Cancel
              </button>
              <button
                className={isError ?"save-text-edit-btn-err" : "save-text-edit-btn"  }
                onClick={() => handleSave(messageId, messageContext)}
              >
                Save
              </button>
            </div>
          ) : null}
        </div>
    );

}

export default MessageEditor
