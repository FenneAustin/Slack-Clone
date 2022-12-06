import "./index.css";
import React from "react"
import {useSelector, useDispatch} from "react-redux"
import AddPeopleModal from "../../addpeoplemodal";
import { removeChannelUserFromChannel,getChannelUsersList } from "../../../../../store/channel";
import { getAllWorkspaceChannels } from "../../../../../store/channels";


const Members = () => {

    const dispatch = useDispatch();
    const users = useSelector((state) => state.channelinfo.users)
    const sessionUser = useSelector((state) => state.session.user)
    const curChannel = useSelector((state) => state.ui.channelId)
    const channelOwner = useSelector((state) => state.channel[curChannel].owner_info.id)
    const curWorkspace = useSelector((state) => state.ui.workspaceId)

    const removeUser = async (id) => {
      await dispatch(removeChannelUserFromChannel(curChannel, id))
      await dispatch(getChannelUsersList(curChannel))
      await dispatch(getAllWorkspaceChannels(curWorkspace))
    }

    return (
      <div className="users-container">
        <div className="add-users-button-contianer">
          <div className="modal-add-container">
            <AddPeopleModal />
          </div>
          <div>Add People</div>
        </div>
        {users.map((user, i) => {
          return (
            <div className="user" key={i}>
              <div className="user-info">
                <div className="user-avatar">
                  <img src={user.user.profile_image.url ? user.user.profile_image.url : null} alt="user avatar" />
                </div>
                <div className="user-name">
                  <p className="firstname-user-list">{user.user.first_name}</p>
                  <p className="lastname-user-list">{user.user.last_name}</p>
                </div>
              </div>
              <div className="user-actions">
                {sessionUser.id === channelOwner &&
                  sessionUser.id !== user.user.id && (
                    <button
                      className="remove-user-channel-btn"
                      onClick={() => removeUser(user.user.id)}
                    >
                      Remove
                    </button>
                  )}
              </div>
            </div>
          );
        })}
      </div>
    );
}

export default Members;
