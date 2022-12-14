import React from "react"
import "./index.css"
import Write from "../../assets/images/Write-icon.svg"
import {useHistory} from 'react-router-dom'
import WorkspaceAdminBtn from "../workspaceadminbtn"
import { showWritePage } from "../../store/ui"
import {useDispatch} from 'react-redux'

const WorkspaceTitleBar = ({workspace}) =>{

  const history = useHistory();
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(showWritePage())
  }


    return (
      <div className="title-container">
        <div className="title-items">
          <div className="name-container-title">
            <div className="workspace-title">
              {" "}
              {workspace ? workspace?.name : null}
            </div>
            <WorkspaceAdminBtn />
          </div>
          <button className="write-btn">
            <img src={Write} className="write-icon" onClick={handleClick} />
          </button>
        </div>
      </div>
    );
}

export default WorkspaceTitleBar;
