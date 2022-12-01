import React, {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux';
import { createNewWorkspace } from '../../../store/workspace';

const CreateWorkspaceForm = ({closeModal}) => {

    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [pageNum, setPageNum] = useState(1);
    const [wordCount, setWordCount] = useState(50);
    const [teamName, setTeamName] = useState("");
    const [invitedUsers, setInvitedUsers] = useState([]);
    const [userEmail, setUserEmail] = useState("");
    const [channelName, setChannelName] = useState("");

    const updateTeamName = (e) => {
        setTeamName(e.target.value);
    }

    const updateEmail = (e) => {
        setUserEmail(e.target.value);
    }

    const addUserToInvite = () => {
        setInvitedUsers([...invitedUsers, userEmail]);
        setUserEmail("");
    }

    const updateChannelName = (e) => {
        setChannelName(e.target.value);
    }

    const handleSubmit = () => {
        const workspace = {
            'name' : teamName,
            'ownerId': sessionUser.id,
        }
        dispatch(createNewWorkspace(workspace));
        closeModal();
    }

    return (
        <div>
            <span>Step {pageNum} of 3</span>
            {pageNum == 1 && (<div className="page-1">
                <h1>What's the name of your company or team?</h1>
                <h3>This will be the name of your Slack workspace - choose something that your team will recognize</h3>
                <input placeholder='Ex: Acme Marketing or Acme Co' onChange={e => updateTeamName(e)}>
                </input>
                <button onClick={() => setPageNum(2)}>Next</button>
            </div>)}
            {pageNum == 2 && (
            <div className="page-2">
                <h1>Who else is on the {teamName} ?</h1>
                <h3>Add teammate by email</h3>
                <input placeholder="Ex: austindfenne@gmail.com" value={userEmail} onChange={updateEmail}></input>
                <button onClick={addUserToInvite}>Add</button>
                <div>
                    {invitedUsers.map((user, i) => {
                        return (
                          <div key={i}>
                            <button>{user}</button>
                          </div>
                        );
                    })}
                </div>
                <button onClick={() => setPageNum(3)}>Next</button>
            </div>)}
            {pageNum == 3 && (
            <div>
                <h1>What's your team working on right now?</h1>
                <h3>This could be anything: a project, campaign, event, or the deal you're trying to close.</h3>
                <input placeholder='Ex: London deals' value={channelName} onChange={e => updateChannelName(e)}></input>
                <button onClick={() => handleSubmit()}>Next</button>
            </div>)}
        </div>
    )
}


export default CreateWorkspaceForm;
