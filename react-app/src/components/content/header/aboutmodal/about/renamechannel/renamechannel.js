import "./renamechannel.css"
import React, {useState, useEffect} from "react"
import { editChannel } from "../../../../../../store/channels";
import { useDispatch } from "react-redux";
import { getAllUserChannels } from "../../../../../../store/channels";


const RenameChannel = ({channel, closeModal}) => {

    const dispatch = useDispatch();
    const originalName = channel.name;
    const [name, setName] = useState(channel.name);
    const [hasErrors, setHasErrors] = useState(false);
    const [errors, setErrors] = useState([]);
    const [isAtCharacterLimit, setIsAtCharacterLimit] = useState(false);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const characterLimit = 80;


    useEffect(() => {
        setErrors('')
        setHasErrors(false);
        setHasSubmitted(false);

        if (name.replaceAll(" ", "") !== name) {
            setHasErrors(true);
            setErrors(["Channel name cannot contain spaces", ...errors])
        }
        else if (name.replaceAll(".", "") !== name) {
            setHasErrors(true);
            setErrors(["Channel name cannot contain periods", ...errors])
        }
        else if (!name.replaceAll(" ", "").length > 0) {
          setHasErrors(true);
          setErrors(["Channel name cannot be empty", ...errors]);
        }
        else if (name.toLowerCase() !== name) {
          setHasErrors(true);
          setErrors(["Channel name must be lowercase", ...errors]);
        }
        else if (name.length >= characterLimit) {
          setHasErrors(true);
          setIsAtCharacterLimit(true);
        }
        else if (name.length < characterLimit) {
          setIsAtCharacterLimit(false);
        }
        else {
        setHasErrors(false);
        setHasSubmitted(false);
        }

    }, [name]);

    const handleSave = () => {

        setHasSubmitted(true);
        if (!hasErrors && errors.length < 1) {
          const editedchannel ={
            'name': name,
            'workspace_Id': channel.workspace_id,
            'description': channel.description
          }
          dispatch(editChannel(editedchannel, channel.id));
          dispatch(getAllUserChannels(channel.workspace_id))
          closeModal();
        }
    }

    const handleCancel = () => {
        closeModal();
    }



    return (
      <div className="rename-channel-container">
        <div className="rename-channel-title">Rename this channel</div>
        <div className="channel-name-label">Channel name</div>
        {isAtCharacterLimit && (
          <div className="character-limit-error">Character limit reached</div>
        )}
        <input
          maxLength="80"
          className="channel-name-input-change"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>
        <div className="restrictions-text">
          Names must be lowercase, without spaces or periods, and can't be
          longer than 80 characters.
        </div>
        {hasErrors && hasSubmitted && (
          <div className="error-msg">
            {errors[0]}
          </div>
        )
      }

        <div className="btns-update-container">
          <div
            className="cancel-channel-update"
            onClick={() => handleCancel()}
          >
            Cancel
          </div>
          <div className="save-channel-save" onClick={() => handleSave()}>
            Save Changes
          </div>
        </div>
      </div>
    );
}


export default RenameChannel
