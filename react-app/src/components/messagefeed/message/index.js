import React, {useState} from "react"
import MessageToolBar from "../messagetoolbar/index.js";
import MessageEditor from "../editor/index.js";
import "./index.css";

const Message = ({message, user}) => {

    const [showToolbar, setShowToolbar] = useState(false);
    const [editable,  setEditable] = useState(false);

    const handleMouseOver = () => {
        setShowToolbar(true);
      };

    const handleMouseOut = () => {
        setShowToolbar(false);
      };

    const handleEdit = () => {
        setEditable(true);
    }



    return (
      <div
        className="message-container"
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        <div className="msg-header">
          <div className="user-info">
            <img
              className="text-profile-pic"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6sGddmMZFZCqb7aJFx5eV-8FGj2gJWz7abGntj8IuyYdAv7W2HEJyi5WY3xbpLLzf-Zg&usqp=CAU"
              alt=""
            />
            <div>
              {message.user.first_name} {message.user.last_name}
            </div>
          </div>
          {user.id == message.user.id ? <MessageToolBar message={message} shown={showToolbar} handleEdit={handleEdit}/> : null}
        </div>
        <MessageEditor messageId={message.id} text={message.text} editable={editable}/>
      </div>
    );
}


export default Message;
