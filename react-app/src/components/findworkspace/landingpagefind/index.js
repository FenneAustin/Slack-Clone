import "./index.css";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineClose } from "react-icons/ai";
import React, { useEffect } from "react";
import {
  getAllInvitations,
  acceptAnInvitation,
  deleteInvitationById,
} from "../../../store/invitations";
import { getAllUserWorkspaces } from "../../../store/workspace";

const LandingFindWorkspace = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const invitations = useSelector((state) => state.invitations);

  useEffect(() => {
    dispatch(getAllInvitations());
  }, []);

  const handleAcceptInv = async (id) => {
    await dispatch(acceptAnInvitation(id));
    await dispatch(getAllUserWorkspaces());
  };

  const handleDeclineInv = async (id) => {
    await dispatch(deleteInvitationById(id));
  };

  return (
    <div className="invitations-container">
      <div className="invitations-header">
        <div className="pending-inv-title">Pending Invitations</div>
        {/* <AiOutlineClose className="close-invitations" onClick={closeModal} /> */}
      </div>
      <div className="name-of-user">Invitations for {sessionUser.email}</div>
      <div className="seperator-line"> </div>
      <div className="invitations-list">
        {Object.values(invitations).map((invitation, i) => (
          <div className="invitation" key={i}>
            <div className="left-side-invitation">
              <div className="image-container-pending-invite">
                <img
                  className="invitation-image"
                  src={invitation.workspace_info.workspace_image.url}
                  alt="workspace"
                />
              </div>
              <div className="invitation-name">
                {invitation.workspace_info.name}
              </div>
            </div>
            <div>
              <button
                className="decline-invite-btn"
                onClick={() => handleDeclineInv(invitation.id)}
              >
                Decline
              </button>
              <button
                className="accept-invite-btn"
                onClick={() => handleAcceptInv(invitation.id)}
              >
                Join
              </button>
            </div>
          </div>
        ))}
        {Object.values(invitations).length === 0 && (
          <div className="no-invitations">No pending invitations</div>
        )}
      </div>
    </div>
  );
};

export default LandingFindWorkspace;
