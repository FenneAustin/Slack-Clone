import React, {useEffect, useState} from 'react'
import {useSelector, useDispatch} from "react-redux"
import { createNewInvitation } from '../../store/invitations';
import { AiOutlineClose } from "react-icons/ai";
import "./addPeopleForm.css"
import { getAllPendingWorkspaceInvitations } from '../../store/workspaceinfo';

const AddPeopleForm = ({closeModal}) => {

    const dispatch = useDispatch();

    const curWorkspace = useSelector(state => state.ui.workspaceId);
    const workspaces = useSelector(state=> state.workspace)
    const [email, setEmail] = useState('')
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const [errors, setErrors] = useState([])
    const sessionUser = useSelector(state => state.session.user)
    const [success, setSuccess] = useState(false)

    const validateEmail = (email) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    const handleInvite = async (e) => {
        if (email === sessionUser.email) {
            setErrors(['You cannot invite owner to workspace'])
            setHasSubmitted(true)
            return
        }
        if (validateEmail(email) === true) {
            const data = await dispatch(createNewInvitation(email, curWorkspace))

            if (data) {
                setErrors(data);
                setHasSubmitted(true)
            } else {
                setSuccess(true)
                setEmail('')
            }
            await dispatch(getAllPendingWorkspaceInvitations(curWorkspace))

        } else {
            setErrors(['Please enter a valid email address'])
            setHasSubmitted(true)
        }
    }

    useEffect(() =>{
        if (email.length > 0) {
            setErrors([])
            setHasSubmitted(false)
            setSuccess(false)
        }
    },[email])

    return (
      <div>
        <div className="header-invite-to-workspace">
          <div className="header-workspace-name">
            Invite people to {workspaces[curWorkspace].name}{" "}
          </div>
          <AiOutlineClose
            className="close-icon-workspace"
            onClick={closeModal}
          />
        </div>
        <div className="input-to">To:</div>
        <input
          className="input-email-user-invite"
          placeholder="name@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <div className="error-messages-invite">
          {hasSubmitted && errors.map((error) => <div>{error}</div>)}
          {success && (
            <div className="success-invite">Successfully invited</div>
          )}
        </div>

        <div className="send-user-invite-container">
          <button
            className={
              email.length < 1
                ? "send-invite-to-workspace-noinput"
                : "send-invite-to-workspace"
            }
            onClick={(e) => handleInvite(e)}
          >
            Send Invite
          </button>
        </div>
      </div>
    );
}

export default AddPeopleForm
