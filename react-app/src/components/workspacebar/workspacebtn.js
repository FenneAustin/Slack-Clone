import React,{useEffect, useState} from "react"
import defaultworkspaceicon from "../../assets/images/slack-default.svg";
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

    let workspaceIcon;

    if (!workspace.workspace_image?.url) {
        workspaceIcon =
          "https://res.cloudinary.com/dugmjvzmx/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1670103746/default-slack_mwzbtf.png";
    } else {
        workspaceIcon = workspace.workspace_image.url;
  }


    return (
        <div className={selected ? "selected-workspace-btn" : "workspace-btn"}>
          <img
            src={workspaceIcon}
            className={"workspace-icon"}
            onClick={() => switchWorkspace(workspace.id)}
          />
        </div>
    );
}
