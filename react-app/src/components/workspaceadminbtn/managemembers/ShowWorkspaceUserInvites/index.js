import React from "react"
import { useSelector } from "react-redux";

const ShowWorkspaceUserInvites = ({cancelUserInvite}) => {

    const sessionUser = useSelector((state) => state.session.user)
    const workspaceId = useSelector((state) => state.ui.workspaceId);
    const workspace = useSelector((state) => state.workspace[workspaceId]);
    const invitedUsers = useSelector((state) => state.workspaceinfo.workspaceInvites)

    return (
        <div>
          {Object.values(invitedUsers).map((user, i) => {
          return (
            <div className="user" key={i}>
              <div className="user-info">
                <div className="user-avatar">
                  <img
                    src={
                      user.user_info.profile_image.url
                        ? user.user_info.profile_image.url
                        : null
                    }
                    alt="user avatar"
                  />
                </div>
                <div className="user-name">
                  <p className="firstname-user-list">
                    {user.user_info.first_name}
                  </p>
                  <p className="lastname-user-list">
                    {user.user_info.last_name}
                  </p>
                </div>
              </div>
              <div className="user-actions">
                {sessionUser.id === workspace.owner_id &&
                  sessionUser.id !== user.user_info.id && (
                    <button
                      className="remove-user-channel-btn"
                      onClick={() => cancelUserInvite(user.id)}
                    >
                      Cancel invite
                    </button>
                  )}
              </div>
            </div>
          );
        })}
        </div>
    )

}



export default ShowWorkspaceUserInvites;
