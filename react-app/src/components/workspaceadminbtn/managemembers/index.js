import React, {useEffect, useState} from "react"
import {useSelector, useDispatch} from "react-redux"
import {getListOfUsers, removeUserFromWorkspace} from "../../../store/workspaceinfo"
import { AiOutlineUserAdd, AiOutlineClose } from "react-icons/ai";
import "./index.css"
import { getAllPendingWorkspaceInvitations } from "../../../store/workspaceinfo";
import { clearWorkspaceUsers, clearWorkspaceInvitations } from "../../../store/workspaceinfo";
import ShowWorkspaceUsers from "./ShowWorkspaceUsers";
import ShowWorkspaceUserInvites from "./ShowWorkspaceUserInvites";
import { removePendingWorkspaceInvitation } from "../../../store/workspaceinfo";
import { getChannelUsersList } from "../../../store/channel";
import AddPeopleForm from "../../addpeoplebtn/addPeopleForm";
import {MediumModal} from "../../../context/mediumModal";

const ManageMembers = ({closeModal}) => {
    const dispatch = useDispatch()
    const workspaceId = useSelector((state) => state.ui.workspaceId)
    const workspace = useSelector((state) => state.workspace[workspaceId])
    const users = useSelector((state) => state.workspaceinfo.users)
    const sessionUser = useSelector((state) => state.session.user)
    const workspaceOwner = useSelector((state) => state.workspace[workspaceId].owner_id)
    const [curPage, setCurPage] = useState(1)
    const invitedUsers = useSelector((state) => state.workspaceinfo.workspaceInvites);
    const curChannel = useSelector((state) => state.ui.channelId);

    // modal useState
    const [showAddPeopleModal, setShowAddPeopleModal] = useState(false);

    useEffect( () => {
        dispatch(clearWorkspaceInvitations())
        dispatch(getListOfUsers(workspaceId));
        dispatch(getAllPendingWorkspaceInvitations(workspaceId));

    }, []);


    const removeUser = async (id) => {
        await dispatch(removeUserFromWorkspace(workspaceId, id));
        if (curChannel) {
          await dispatch(getChannelUsersList(curChannel))
        }
    };

    const cancelUserInvite = async (id) => {
        await dispatch(removePendingWorkspaceInvitation(id));
    };

    return (
      <div className="users-container">
        <div className="manage-users-title">
            <div className="manage-users-title-text">Manage Members</div>
            <AiOutlineClose className="close-modal-icon" onClick={closeModal} />
        </div>
        <div className="add-users-button-contianer">
          <div className="modal-add-container" onClick={() => setShowAddPeopleModal(true)}>
            <AiOutlineUserAdd className="add-user-workspace-icon-btn" />
          </div>
          <div>Add Teammates</div>
        </div>
        <div className="top-bar-page-select">
          <div className={curPage ==1 ? "Show-users-btn" : "Show-users-btn-notselected"} onClick={() => setCurPage(1)}>Users</div>
          {workspaceOwner ==sessionUser.id && ( <div className={curPage ==2 ? "Show-invites-btn" :"Show-invites-btn-notselected"} onClick={() => setCurPage(2)}>Invites</div>)}
        </div>

        {curPage ==1 && <ShowWorkspaceUsers removeUser={removeUser}/>}
        {curPage ==2 && <ShowWorkspaceUserInvites cancelUserInvite={cancelUserInvite}/> }

        {showAddPeopleModal && (
          <MediumModal onClose={() => setShowAddPeopleModal(false)}>
            <AddPeopleForm closeModal={() => setShowAddPeopleModal(false)} />
          </MediumModal>
        )}
      </div>
    );
}


export default ManageMembers
