import React from "react"
import "./index.css"
import Write from "../../assets/images/Write-icon.svg"

const WorkspaceTitleBar = ({workspace}) =>{



    return (
      <div className="title-container">
        <div className="title-items">
          <div className="workspace-title"> {workspace ? workspace?.name : null}</div>
          <button className="write-btn">
            <img src={Write} className="write-icon" />
          </button>
        </div>
      </div>
    );
}

export default WorkspaceTitleBar;
