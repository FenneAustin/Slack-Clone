import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUserWorkspaces } from "../../store/workspace";
import "./index.css"
import workspaceicon from "../../assets/images/slack-default.svg"

const WorkspaceBar = () => {

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
            <button className="workspace-btns">
              <img src={workspaceicon} className="workspace-icon" />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default WorkspaceBar;
