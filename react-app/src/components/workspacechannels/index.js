import { useEffect, useContext} from "react"
import {useDispatch, useSelector} from "react-redux"
import "./index.css"
import { getAllWorkspaceChannels, getAllUserChannels } from "../../store/channels"
import { NavLink } from "react-router-dom"
import { TbHash } from "react-icons/tb";
import { setWorkspaceChannelId, clearChatId } from "../../store/ui"
import { clearMessages, getAllChannelMessages } from "../../store/message"
import { socket, SocketContext } from "../../context/socket"
import { joinRoomThunk, leaveRoomThunk, socketRoomSelector } from "../../store/socketrooms"
import { AiOutlinePlus } from "react-icons/ai";
import AddChannelModal from "./addChannels/index.js";
import { hideAllChannels } from "../../store/ui"
import { getChannelUsersList } from "../../store/channel"

const WorkspaceChannels = ({workspaceId}) => {

    const socket = useContext(SocketContext)
    const dispatch = useDispatch()
    const room = useSelector(socketRoomSelector)


    useEffect(async()=> {
        if(workspaceId !== null){
          await dispatch(getAllUserChannels(workspaceId));
          await dispatch(getAllWorkspaceChannels(workspaceId));
        }
    }, [workspaceId])

    const channels = useSelector((state) => state.channel.usersChannels);

    const handleChannelClick = (id) => {
        dispatch(hideAllChannels())
        dispatch(clearMessages())
        dispatch(getAllChannelMessages(id))
        dispatch(clearChatId())
        dispatch(setWorkspaceChannelId(id))
        dispatch(getChannelUsersList(id))
        if (room) {
            dispatch(leaveRoomThunk(room, socket))
        }
        const data = { 'id': id, 'roomtype': "channel" };
        dispatch(joinRoomThunk(data, socket))

    }

    return (
      <div className="channels-container">
        <div className="channel-title-container">
          <h4 className="column-title">Channels</h4>
          <button className="add-channels-btn"><AiOutlinePlus /></button>
        </div>
        {Object.values(channels).map((channel, i) => {
          return (
            <div
              className="channels-list"
              key={i}
              onClick={() => handleChannelClick(channel.id)}
            >
              <TbHash className="channel-hash" />
              <div className="channel-name" key={i}>
                {" "}
                {channel.name}{" "}
              </div>
            </div>
          );
        })}
        <AddChannelModal />
      </div>
    );
}

export default WorkspaceChannels
