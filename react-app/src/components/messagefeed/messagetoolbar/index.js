import Ellipses from "../ellipses/index.js";
import "./index.css";

const MessageToolBar = ({message, shown, handleEdit, handleDelete}) => {
    return (
      <div className={shown ? "message-toolbar" : "message-toolbar-hidden"}>
        <Ellipses message={message} handleEdit={handleEdit} handleDelete={handleDelete}/>
      </div>
    );
}


export default MessageToolBar;
