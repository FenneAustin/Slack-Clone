import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import "./index.css";
import { useDispatch } from "react-redux";
import { leaveAWorkspace } from "../../../store/workspace";
import {
  clearWorkspace,
  hideAllChannels,
  clearChatId,
  clearWorkspaceChannelId,
} from "../../../store/ui";

const LeaveWorkspaceConfirmation = ({ closeModal, workspace }) => {
  const [checked, setChecked] = useState(false);
  const dispatch = useDispatch();
  const handleCheck = () => {
    setChecked(!checked);
  };

  const handleWorkspaceDeletion = async () => {
    if (checked) {
      closeModal();
      await dispatch(hideAllChannels());
      await dispatch(clearWorkspace());
      await dispatch(clearChatId());
      await dispatch(clearWorkspaceChannelId());
      await dispatch(leaveAWorkspace(workspace.id));
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
        When you leave a workspace, anything you saved in the workspace will be deleted and you cannot get back into the workspace unless invited. <strong>This can't be undone.</strong>
      </div>
      <div className="keep-in-mind-info">Keep in mind that:</div>
      <li className="list-of-info">
        Everything in this workspace will be deleted
      </li>
      <div className="bottom-info">
        <div className="checkbox-div">
          <input type="checkbox" onClick={() => handleCheck()} />
          <div>Yes, leave the workspace</div>
        </div>
        <div className="delete-channel-btns">
          <button className="cancel-deletion-btn" onClick={closeModal}>
            Cancel
          </button>
          <button
            className={checked ? "delete-channel-btn" : "delete-btn-unchecked"}
            onClick={() => handleWorkspaceDeletion()}
          >
            Leave Workspace
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeaveWorkspaceConfirmation;
