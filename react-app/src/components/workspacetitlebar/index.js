import React from "react"
import "./index.css"
import Write from "../../assets/images/Write-icon.svg"
import {useHistory} from 'react-router-dom'
import WorkspaceAdminBtn from "../workspaceadminbtn"

const WorkspaceTitleBar = ({workspace}) =>{

  const history = useHistory();

  const handleClick = () => {

  }


    return (
      <div className="title-container">
        <div className="title-items">
          <div className="workspace-title"> {workspace ? workspace?.name : null}</div>
          <WorkspaceAdminBtn />
          <button className="write-btn">
            <img src={Write} className="write-icon" onClick={handleClick}/>
          </button>
        </div>
      </div>
    );
}

export default WorkspaceTitleBar;
