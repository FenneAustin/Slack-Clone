import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { getListOfUsers, clearWorkspaceUsers } from "../../../../store/workspaceinfo";

const ShowWorkspaceUsers = ({removeUser}) => {

    const dispatch = useDispatch();
    const users = useSelector((state) => state.workspaceinfo.users)
    const sessionUser = useSelector((state) => state.session.user)
    const workspaceId = useSelector((state) => state.ui.workspaceId);
    const workspaceOwner = useSelector(
      (state) => state.workspace[workspaceId].owner_id
    );

    useEffect(async () => {
        await dispatch(getListOfUsers(workspaceId));
    }, [])

    return (
        <div className="users-container">
         {(users).map((user, i) => {
            return(
            <div className="user" key={i}>
              <div className="user-info">
                <div className="user-avatar">
                  <img
                    src={
                      user.user.profile_image.url
                        ? user.user.profile_image.url
                        : null
                    }
                    alt="user avatar"
                  />
                </div>
                <div className="user-name">
                  <p className="firstname-user-list">{user.user.first_name}</p>
                  <p className="lastname-user-list">{user.user.last_name}</p>
                </div>
              </div>
              <div className="user-actions">
                {sessionUser.id === workspaceOwner &&
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
            )
        })};
        </div>
    )
}

export default ShowWorkspaceUsers
