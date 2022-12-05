import "./renamechannel.css"
import React, {useState, useEffect} from "react"


const RenameChannel = ({channelName, closeModal}) => {

    const originalName = channelName;
    const [name, setName] = useState(channelName);
    const [hasErrors, setHasErrors] = useState(false);
    const [errors, setErrors] = useState([]);
    const [isAtCharacterLimit, setIsAtCharacterLimit] = useState(false);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const characterLimit = 80;


    useEffect(() => {
        setErrors([])
        setHasErrors(false);
        if (name.replaceAll(" ", "") !== name) {
            setHasErrors(true);
            errors.push("Channel name cannot contain spaces")
        }
        else if (name.replaceAll(".", "") !== name) {
            setHasErrors(true);
            errors.push("Channel name cannot contain periods")
        }

        else if (!name.replaceAll(" ", "").length > 0) {
          setHasErrors(true);
          errors.push("Channel name cannot be empty");
        }
        else if (name.toLowerCase() !== name) {
          setHasErrors(true);
          errors.push("Channel name must be lowercase");
        }

        else if (name.length >= characterLimit) {
          setHasErrors(true);
          setIsAtCharacterLimit(true);
        }

        else if (name.length < characterLimit) {
          setIsAtCharacterLimit(false);
        } else {
        setHasErrors(false);
        setHasSubmitted(false);
        }

    }, [name]);

    const handleSave = () => {
        setHasSubmitted(true);
        if (!hasErrors) {

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
          maxlength="80"
          className="channel-name-input-change"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>
        <div className="restrictions-text">
          Names must be lowercase, without spaces or periods, and can’t be
          longer than 80 characters.
        </div>
        {hasErrors && hasSubmitted && (
        <div>
            {errors.map((error, i) => {
                return (<div key={i} className="error-message">{error}</div>)})}
        </div>
        )}

        <div className="btns-update-container">
          <button
            className="cancel-channel-update"
            onClick={() => handleCancel()}
          >
            Cancel
          </button>
          <button className="save-channel-save" onClick={()=> handleSave()}>Save Changes</button>
        </div>
      </div>
    );
}


export default RenameChannel
