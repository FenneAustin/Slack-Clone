import React,{useState} from "react"
import "./index.css"
import WorkspaceBar from "../../components/workspacebar"
import WorkspaceTitleBar from "../../components/workspacetitlebar"
import WorkspaceChannels from "../../components/workspacechannels"

const Home = () => {

    const [isLoaded, setIsLoaded] = useState(false);
    const [selectedWorskpace, setSelectedWorkspace] = useState(null)

    function handleWorkspaceSwitch(id){
        setSelectedWorkspace(id)
    }

    return (
      <div className="home-page">
        <WorkspaceBar
          className="workspace-bar"
          switchWorkspace={handleWorkspaceSwitch}
        />
        <WorkspaceTitleBar className="title-container" />
        <WorkspaceChannels className="channels-container" />
      </div>
    );
}


export default Home
