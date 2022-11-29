import { useEffect, useContext} from "react"
import {useDispatch, useSelector} from "react-redux"
import "./index.css"
import { getAllWorkspaceChannels } from "../../store/channels"
import { NavLink } from "react-router-dom"
import { TbHash } from "react-icons/tb";
import { setWorkspaceChannelId, clearChatId } from "../../store/ui"
import { getAllChannelMessages } from "../../store/message"
import { socket, SocketContext } from "../../context/socket"
import { joinRoomThunk, leaveRoomThunk, socketRoomSelector } from "../../store/socketrooms"

const WorkspaceChannels = ({workspaceId}) => {

    const sockcet = useContext(SocketContext)
    const dispatch = useDispatch()
    const room = useSelector(socketRoomSelector)


    useEffect(()=> {
        if(workspaceId !== null){
           dispatch(getAllWorkspaceChannels(workspaceId))
        }
    }, [workspaceId])

    const channels = Object.values(useSelector((state) => state.channel));

    const handleChannelClick = (id) => {
        dispatch(getAllChannelMessages(id))
        dispatch(clearChatId())
        dispatch(setWorkspaceChannelId(id))
        if (room) {
            dispatch(leaveRoomThunk(room, socket))
        }
        const data = { 'id': id, 'roomtype': "channel" };
        dispatch(joinRoomThunk(data, socket))

    }

    return (
        <div className="channels-container">
            <h4 className="column-title">Channels</h4>
            {channels.map((channel, i) => {
                return (
                    <div className="channels-list" key={i} onClick={() => handleChannelClick(channel.id)}>
                      <TbHash className="channel-hash" />
                      <div className="channel-name" key={i}> {channel.name} </div>
                    </div>

                );
            })}
        </div>
    )
}

export default WorkspaceChannels
