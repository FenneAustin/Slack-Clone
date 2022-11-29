import React,{useEffect, useState} from "react"
import workspaceicon from "../../assets/images/slack-default.svg";
import "./workspacebtn.css"


export default function WorkspaceBtn({ workspace, switchWorkspace, selectedWorkspace }) {
    const { id, name } = workspace;
    const [selected, setSelected] = useState(false)



    useEffect(() => {
        if (selectedWorkspace === id) {
            setSelected(true)
        } else {
            setSelected(false)
        }
    }, [selectedWorkspace])


    return (
      <div className={selected ? "selected-workspace-btn" : "workspace-btn"}>
        <button
          className="workspace-btns"
          onClick={() => switchWorkspace(workspace.id)}
        >
          <img
            src={workspaceicon}
            className={"workspace-icon"}
          />
        </button>
      </div>
    );
}
