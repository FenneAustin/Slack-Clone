import Ellipses from "../ellipses/index.js";
import "./index.css";

const MessageToolBar = ({message, shown, handleEdit, handleDelete, editable}) => {
    return (
      <div className={shown && !editable ? "message-toolbar" : "message-toolbar-hidden"}>
        <Ellipses message={message} handleEdit={handleEdit} handleDelete={handleDelete}/>
      </div>
    );
}


export default MessageToolBar;
