import React, { useEffect } from "react"
import "./index.css"
import {useDispatch, useSelector} from 'react-redux'
import { getAllWorkspaceChats } from "../../store/chat"
import { NavLink } from 'react-router-dom'

const WorkspaceDirectMsg = ({workspaceId}) => {

    const dispatch = useDispatch()

    useEffect(() => {
        if(workspaceId !== null) {
            dispatch(getAllWorkspaceChats(workspaceId))
        }
    }, [workspaceId])

    const chats = Object.values(useSelector((state) => state.chat))
    const sessionUser = useSelector((state) => state.session.user)

    return (
      <div className="messages-container">
        <h4>messages</h4>
        {chats.map((chat,i ) => {

            const selectedUser = chat.user_one.email == sessionUser.email ? chat.user_two : chat.user_one;

            return (
              <NavLink to={`/chats/${chat.id}`}>
                <div>
                    {selectedUser.first_name}, {selectedUser.last_name}
                </div>
              </NavLink>
            );
        })}
      </div>
    );
}

export default WorkspaceDirectMsg;
