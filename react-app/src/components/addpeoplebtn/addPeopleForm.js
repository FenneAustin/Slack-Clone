import React, {useState} from 'react'
import {useSelector, useDispatch} from "react-redux"
import { createNewInvitation } from '../../store/invitations';

const AddPeopleForm = () => {

    const dispatch = useDispatch();

    const curWorkspace = useSelector(state => state.ui.workspaceId);
    const workspaces = useSelector(state=> state.workspace)
    const [email, setEmail] = useState('')

    const handleInvite = (e) => {
        dispatch(createNewInvitation({email, workspaceId: curWorkspace}))
    }

    return (
        <div>
            <div>Invite people to {workspaces[curWorkspace].name} </div>
                <input placeholder="name@gmail.com" onChange={e => setEmail(e.target.value)}></input>
            <button onClick={(e) => handleInvite(e)}>Send Invite</button>
        </div>
    )
}

export default AddPeopleForm
