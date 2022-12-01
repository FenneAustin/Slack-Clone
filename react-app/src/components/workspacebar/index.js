import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUserWorkspaces,  } from "../../store/workspace";
import "./index.css"
import workspaceicon from "../../assets/images/slack-default.svg"
import ProfileButton from "../navbar/profilebutton";
import WorkspaceBtn from "./workspacebtn";
import AddWorkspaceModal from "./addworkspace/addWorkspaceModal";

const WorkspaceBar = ({switchWorkspace, user, selectedWorkspace }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUserWorkspaces());
  }, [dispatch]);

  const workspaces = Object.values(useSelector((state) => state.workspace));

  return (
    <div className="workspace-bar">
      <div className="workspace-btn-container">
        {workspaces.map((workspace, i) => {

          return (
            // <button key={i} className="workspace-btns" onClick={() => switchWorkspace(workspace.id)}>
            //   <img src={workspaceicon} className="workspace-icon" />
            // </button>
            <WorkspaceBtn key={i} workspace={workspace} switchWorkspace={switchWorkspace}  selectedWorkspace={selectedWorkspace}/>
          );
        })}
        <AddWorkspaceModal />
      </div>
    </div>
  );
};

export default WorkspaceBar;
