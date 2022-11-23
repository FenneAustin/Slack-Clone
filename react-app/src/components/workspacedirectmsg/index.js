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
        <h4 className="column-title">Direct messages</h4>
        {chats.map((chat,i ) => {

            const selectedUser = chat.user_one.email == sessionUser.email ? chat.user_two : chat.user_one;

            return (
              <NavLink className="channels-list" to={`/chats/${chat.id}`}>
                  <img className="profile-dm" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6sGddmMZFZCqb7aJFx5eV-8FGj2gJWz7abGntj8IuyYdAv7W2HEJyi5WY3xbpLLzf-Zg&usqp=CAU" alt="" />
                  {selectedUser.first_name}, {selectedUser.last_name}
              </NavLink>
            );
        })}
      </div>
    );
}

export default WorkspaceDirectMsg;
