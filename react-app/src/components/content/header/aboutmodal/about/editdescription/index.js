import "./index.css"
import React, {useState, useEffect} from "react"
import {useDispatch } from "react-redux";
import { editChannelDescription } from "../../../../../../store/channels";
import { getAllUserChannels } from "../../../../../../store/channels";


const EditDescription = ({channel, closeModal}) => {

    const dispatch = useDispatch();
    const [description, setDescription] = useState(channel.description)

    const handleSave = () => {

        const editedchannel = {
            'name': channel.name,
            'workspace_Id': channel.workspace_id,
            'description': description,
        };
        dispatch(editChannelDescription(editedchannel, channel.id))
        dispatch(getAllUserChannels(channel.workspace_id));
        closeModal()
    }

    return (
      <div className="edit-channel-description-container">
        <div className="edit-channel-description-header">
          <div className="edit-channel-description-title">Edit description</div>
        </div>

        <div className="edit-channel-description-input">
          <textarea
            className="edit-channel-description-textarea"
            placeholder="Add a description"
            maxLength="250"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
        </div>

        <div className="how-to-description">Let people know what this channel is for.</div>
        <div className="error-text-description">
          {description?.length == 250 && (
            <div className="edit-channel-description-characters">
              Character limit reached
            </div>
          )}
        </div>
        <div className="btns-container-description">
          <div className="edit-channel-description-btns">
            <button
              className="cancel-description-edit"
              onClick={() => closeModal()}
            >
              Cancel
            </button>
            <button className="save-description-edit" onClick={() => handleSave()}>Save</button>
          </div>
        </div>
      </div>
    );
}


export default EditDescription
