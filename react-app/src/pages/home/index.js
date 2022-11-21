import React, { useEffect, useState} from "react";
import {useSelector} from 'react-redux'
import "./index.css"
import WorkspaceBar from "../../components/workspacebar"
import WorkspaceTitleBar from "../../components/workspacetitlebar"
import WorkspaceChannels from "../../components/workspacechannels"
import WorkspaceDirectMsg from "../../components/workspacedirectmsg"
import Content from "../../components/content"
import {useHistory} from "react-router-dom"

const Home = () => {

    const history = useHistory();
    const [selectedWorkspace, setSelectedWorkspace] = useState(1)
    const sessionUser = useSelector(state => state.session.user);

    function handleWorkspaceSwitch(id){
        setSelectedWorkspace(id)
        history.push("/");
    }

    const workspace = useSelector(state => state.workspace)

    return (
      <div className="home-page">
        <WorkspaceBar className="workspace-bar" switchWorkspace={handleWorkspaceSwitch} user={sessionUser}/>
        <WorkspaceTitleBar className="title-container" workspace={workspace[selectedWorkspace]}/>
        <WorkspaceChannels className="channels-container" workspaceId={selectedWorkspace}/>
        <WorkspaceDirectMsg className="messages-container" workspaceId={selectedWorkspace} />
        <Content className="content-container" />
      </div>
    );
}


export default Home
