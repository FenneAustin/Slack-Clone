import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { AiOutlineClose } from "react-icons/ai";
import "./index.css";
import {editWorkspace, getAllUserWorkspaces} from '../../../store/workspace'

const EditWorkspaceDetails = ({ workspace, closeModal }) => {
  const dispatch = useDispatch();
  const originalName = workspace.name;
  const [name, setName] = useState(workspace.name);
  const [hasErrors, setHasErrors] = useState(false);
  const [errors, setErrors] = useState([]);
  const [isAtCharacterLimit, setIsAtCharacterLimit] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [imgUrl, setImgUrl] = useState(workspace.workspace_image.url);
  const characterLimit = 50;
  const [isAtCharacterLimitUrl, setIsAtCharacterLimitUrl] = useState(false);
  const urlCharacterLimit = 250;
  function isValidUrl(str) {
    const regex =
      /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    return regex.test(str);
  }

  useEffect(() => {
    setErrors("");
    setHasErrors(false);
    setHasSubmitted(false);

    if (name.replaceAll(".", "") !== name) {
      setHasErrors(true);
      setErrors(["Channel name cannot contain periods", ...errors]);
    } else if (!name.replaceAll(" ", "").length > 0) {
      setHasErrors(true);
      setErrors(["Channel name cannot be empty", ...errors]);
    } else if (name.length >= characterLimit) {
      setHasErrors(true);
      setIsAtCharacterLimit(true);
    } else if (name.length < characterLimit) {
      setIsAtCharacterLimit(false);
    } else {
      setHasErrors(false);
      setHasSubmitted(false);
    }
    if (isValidUrl(imgUrl) == false) {
      setHasErrors(true);
      setErrors(["Please enter a valid image url", ...errors]);
    }
    if (imgUrl.length >= urlCharacterLimit) {
      setIsAtCharacterLimitUrl(true);
    } else {
      setIsAtCharacterLimitUrl(false);
    }
  }, [name, imgUrl]);



  const handleSave = async () => {
    setHasSubmitted(true);
    if (!hasErrors && errors.length < 1) {

      let editedWorkspace = {
        name: name,
      };

      if (imgUrl !== workspace.workspace_image.url) {
        editedWorkspace = {
          ...editedWorkspace,
          image: imgUrl,
        };
      }

      await dispatch(editWorkspace(editedWorkspace, workspace.id));
      await dispatch(getAllUserWorkspaces());
      closeModal();
    }
  };

  const handleCancel = () => {
    closeModal();
  };



  return (
    <div className="rename-workspace-container-edit">
      <div className="rename-workspace-header">
        <div className="rename-workspace-title-admin">
          Edit workspace details
        </div>
        <AiOutlineClose className="close-icon-test" onClick={closeModal} />
      </div>
      <div className="edit-workspace-name-subtext">
        Add a name to represent your company or organization. This name will
        also be shown to other organizations that you work with using Slack.
      </div>

      <div className="channel-name-label">Workspace name</div>
      {isAtCharacterLimit && (
        <div className="character-limit-error">Character limit reached</div>
      )}
      <input
        maxLength="50"
        className="channel-name-input-change"
        value={name}
        onChange={(e) => setName(e.target.value)}
      ></input>
      <div className="restrictions-text">
        Names can't be longer than 50 characters.
      </div>
      <div className="channel-name-label">Workspace image url</div>
      <input
        className="channel-name-input-change"
        value={imgUrl}
        onChange={(e) => setImgUrl(e.target.value)}
      ></input>
      {isAtCharacterLimitUrl && (
        <div className="character-limit-error">Character limit reached for urls</div>
      )}

      {hasErrors && hasSubmitted && (
        <div className="error-msg">{errors[0]}</div>
      )}

      <div className="btns-update-container">
        <div className="cancel-channel-update" onClick={() => handleCancel()}>
          Cancel
        </div>
        <div className="save-channel-save" onClick={() => handleSave()}>
          Save Changes
        </div>
      </div>
    </div>
  );
};

export default EditWorkspaceDetails;
