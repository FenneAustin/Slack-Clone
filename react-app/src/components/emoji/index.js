import React, {useState} from 'react';
import Picker from 'emoji-picker-react';
import "./index.css"
import { MdOutlineAddReaction } from "react-icons/md";

const Emoji = () => {

    const [inputStr, setInputStr] = useState('');
    const [showPicker, setShowPicker] = useState(false);


    const onEmojiClick = (event, emojiObject) => {
        setInputStr(emojiObject.emoji);
        setShowPicker(false);
    }

    return (
      <div className="emoji-container">
        <MdOutlineAddReaction
          className="emoji-icon"
        //   src="https://icons.getbootstrap.com/assets/icons/emoji-smile.svg"
          onClick={() => setShowPicker((val) => !val)}
        />
        <div className="picker-container">
          {showPicker && <Picker onEmojiClick={onEmojiClick} />}
        </div>
      </div>
    );

}


export default Emoji;
