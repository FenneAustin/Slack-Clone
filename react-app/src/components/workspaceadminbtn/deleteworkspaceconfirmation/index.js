import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import "./index.css";
import { useDispatch } from "react-redux";
import { deleteAWorkspace } from "../../../store/workspace";
import { clearWorkspace, hideAllChannels, clearChatId, clearWorkspaceChannelId  } from "../../../store/ui";


const DeleteWorkspaceConfirmation = ({ closeModal, workspace }) => {
  const [checked, setChecked] = useState(false);
  const dispatch = useDispatch();
  const handleCheck = () => {
    setChecked(!checked);
  };

  const handleWorkspaceDeletion = async () => {
    if (checked) {
      closeModal();
      await dispatch(hideAllChannels());
      await dispatch(clearWorkspace())
      await dispatch(clearChatId())
      await dispatch(clearWorkspaceChannelId());
      await dispatch(deleteAWorkspace(workspace.id))
    }
  };

  return (
    <div className="dlt-confirmation-container">
      <div className="top-dlt-confirm">
        <div className="delete-channel-title">Delete this Workspace?</div>
        <AiOutlineClose
          className="close-modal-x"
          onClick={() => {
            closeModal();
          }}
        />
      </div>
      <div className="delete-channel-info">
        When you delete a workspace, all messages from this workspace will be
        removed from Slack immediately as well as all channels and saved information. <strong>This can't be undone.</strong>
      </div>
      <div className="keep-in-mind-info">Keep in mind that:</div>
      <li className="list-of-info">
        Everything in this workspace will be deleted
      </li>
      <div className="bottom-info">
        <div className="checkbox-div">
          <input type="checkbox" onClick={() => handleCheck()} />
          <div>Yes, permanently delete the workspace</div>
        </div>
        <div className="delete-channel-btns">
          <button className="cancel-deletion-btn" onClick={closeModal}>
            Cancel
          </button>
          <button
            className={checked ? "delete-channel-btn" : "delete-btn-unchecked"}
            onClick={() => handleWorkspaceDeletion()}
          >
            Delete Workspace
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteWorkspaceConfirmation;
