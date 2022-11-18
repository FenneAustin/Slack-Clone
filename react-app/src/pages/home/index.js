import React, { useEffect, useState} from "react";
import {useSelector} from 'react-redux'
import "./index.css"
import WorkspaceBar from "../../components/workspacebar"
import WorkspaceTitleBar from "../../components/workspacetitlebar"
import WorkspaceChannels from "../../components/workspacechannels"
import WorkspaceDirectMsg from "../../components/workspacedirectmsg"
import Content from "../../components/content"

const Home = () => {

    const [selectedWorkspace, setSelectedWorkspace] = useState(0)

    const sessionUser = useSelector(state => state.session.user);

    function handleWorkspaceSwitch(id){
        setSelectedWorkspace(id)
    }


    return (
      <div className="home-page">
        <WorkspaceBar className="workspace-bar" switchWorkspace={handleWorkspaceSwitch} user={sessionUser}/>
        <WorkspaceTitleBar className="title-container" workspaceId={selectedWorkspace}/>
        <WorkspaceChannels className="channels-container" workspaceId={selectedWorkspace}/>
        <WorkspaceDirectMsg className="messages-container" />
        <Content className="content-container" />
      </div>
    );
}


export default Home
