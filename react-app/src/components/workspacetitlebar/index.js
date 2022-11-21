import React from "react"
import "./index.css"
import Write from "../../assets/images/Write-icon.svg"
import {useHistory} from 'react-router-dom'

const WorkspaceTitleBar = ({workspace}) =>{

  const history = useHistory();

  const handleClick = () => {
    history.push("/write")
  }


    return (
      <div className="title-container">
        <div className="title-items">
          <div className="workspace-title"> {workspace ? workspace?.name : null}</div>
          <button className="write-btn">
            <img src={Write} className="write-icon" onClick={handleClick}/>
          </button>
        </div>
      </div>
    );
}

export default WorkspaceTitleBar;
