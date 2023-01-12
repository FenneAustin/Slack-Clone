import Ellipses from "../ellipses/index.js";
import "./index.css";
import Emoji from "../../emoji/index.js";

const MessageToolBar = ({message, shown, handleEdit, handleDelete, editable}) => {
    return (
      <div
        className={
          shown && !editable ? "message-toolbar" : "message-toolbar-hidden"
        }
      >
        <div className="tool-bar-container">
          <Emoji />
          <Ellipses
            message={message}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </div>
      </div>
    );
}


export default MessageToolBar;
