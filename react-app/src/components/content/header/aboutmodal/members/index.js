import "./index.css";
import React from "react"
import {useSelector, useDispatch} from "react-redux"


const Members = () => {

    const dispatch = useDispatch();
    const users = useSelector((state) => state.channelinfo.users)
    const sessionUser = useSelector((state) => state.session.user)
    const curChannel = useSelector((state) => state.ui.channelId)
    const channelOwner = useSelector((state) => state.channel[curChannel].owner_info.id)

    return (
        <div className="users-container">
            <button>Add people</button>
            {users.map((user) => {
                return (
                    <div className="user">
                        <div className="user-info">
                            <div className="user-avatar">
                                <img src={user.user.profile_image.url
                                } alt="user avatar" />
                            </div>
                            <div className="user-name">
                                <p className="firstname-user-list">{user.user.first_name}</p>
                                <p className="lastname-user-list">{user.user.last_name}</p>
                            </div>
                        </div>
                        <div className="user-actions">
                            {sessionUser.id === channelOwner && sessionUser.id !== user.user.id && <button >Remove</button>}
                        </div>
                    </div>
                )
            }
            )}
        </div>
    )
}

export default Members;
