import { useEffect } from "react"
import {useDispatch, useSelector} from "react-redux"
import "./index.css"
import { getAllWorkspaceChannels } from "../../store/channels"
import { NavLink } from "react-router-dom"


const WorkspaceChannels = ({workspaceId}) => {

    const dispatch = useDispatch()

    useEffect(()=> {
        if(workspaceId !== null){
           dispatch(getAllWorkspaceChannels(workspaceId))
        }
    }, [workspaceId])

    const channels = Object.values(useSelector((state) => state.channel));

    return (
        <div className="channels-container">
            <h4>Channels</h4>
            {channels.map((channel, i) => {
                return (
                  <NavLink to ="/">
                    <div key={i}>{channel.name}</div>
                  </NavLink>
                );
            })}
        </div>
    )
}

export default WorkspaceChannels
