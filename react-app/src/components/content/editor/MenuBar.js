import React from 'react'
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import "./MenuBar.css"
import {
  AiOutlineBold,
  AiOutlineItalic,
  AiOutlineStrikethrough,
} from "react-icons/ai";

import { HiCode } from "react-icons/hi";

const MenuBar = ({editor}) => {
     if (!editor) {
       return null;
     }
    return (
      <div>
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "bold-is-active" : "bold"}
        >
          <AiOutlineBold />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "italic-is-active" : "italic"}
        >
          <AiOutlineItalic />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={editor.isActive("strike") ? "strike-is-active" : "strike"}
        >
          <AiOutlineStrikethrough />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editor.can().chain().focus().toggleCode().run()}
          className={editor.isActive("code") ? "code-is-active" : "code"}
        >
            <HiCode />
        </button>
      </div>
    );
}


export default MenuBar;
