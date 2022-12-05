import "./index.css";
import React,{useEffect, useState} from "react"
import { RiArrowDropDownLine } from "react-icons/ri";
import {useSelector} from "react-redux"


const WorkspaceAdminBtn = () => {

    const workspaces = useSelector(state => state.workspace)
    const curWorkspace = useSelector(state => state.ui.workspaceId)

    const [showMenu, setShowMenu] = useState(false);

      const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
      };


    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
          setShowMenu(false);
        };

        document.addEventListener("click", closeMenu);

        return () => document.removeEventListener("click", closeMenu);
      }, [showMenu]);


    return (
      <div className="admin-btn-container">
        <div className="workspace-admin-btn">
          <RiArrowDropDownLine className="dropdown-admin-btn" onClick={openMenu}/>
        </div>
        {showMenu && (
            <div className="admin-panel-container">
                <button>
                    <div className="workspaceinfo-btn">
                        {workspaces && (<div> {workspaces[curWorkspace].name}</div>)}
                    </div>
                </button>
            </div>
        )}
      </div>
    );
}

export default WorkspaceAdminBtn;
