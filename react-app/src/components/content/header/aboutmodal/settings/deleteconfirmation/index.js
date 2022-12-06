import React,{useState} from "react"
import { AiOutlineClose } from "react-icons/ai";
import "./index.css"
import {useDispatch} from "react-redux"
import { removeChannel } from "../../../../../../store/channels";
import { clearWorkspaceChannelId, hideAllChannels } from "../../../../../../store/ui";
import { getAllUserChannels, getAllWorkspaceChannels} from "../../../../../../store/channels";

const DeleteConfirmation = ({closeModal, channel}) => {

    const [checked, setChecked] = useState(false)
    const dispatch = useDispatch()
    const handleCheck = () => {
        setChecked(!checked)
    }

    const handleChannelDeletion = async () => {
        if (checked) {
           closeModal();
           await dispatch(hideAllChannels());
           await dispatch(clearWorkspaceChannelId());
           await dispatch(removeChannel(channel.id))
           await dispatch(getAllUserChannels(channel.workspace_id));
           await dispatch(getAllWorkspaceChannels(channel.workspace_id));

        }
    }

    return (
      <div className="dlt-confirmation-container">
        <div className="top-dlt-confirm">
          <div className="delete-channel-title">Delete this Channel?</div>
          <AiOutlineClose className="close-modal-x" onClick={() => {closeModal()}}/>
        </div>
        <div className="delete-channel-info">
          When you delete a channel, all messages from this channel will be
          removed from Slack immediately. <strong>This can't be undone.</strong>
        </div>
        <div className="keep-in-mind-info">Keep in mind that:</div>
        <li className="list-of-info">
          Any messages in this channel will be deleted
        </li>
        <div className="bottom-info">
          <div className="checkbox-div">
            <input type="checkbox" onClick={() => handleCheck()} />
            <div>Yes, permanently delete the channel</div>
          </div>
          <div className="delete-channel-btns">
            <button className="cancel-deletion-btn" onClick={closeModal}>Cancel</button>
            <button className={checked ? "delete-channel-btn" : "delete-btn-unchecked"} onClick={() => handleChannelDeletion()}>Delete Channel</button>
          </div>
        </div>
      </div>
    );
}


export default DeleteConfirmation
