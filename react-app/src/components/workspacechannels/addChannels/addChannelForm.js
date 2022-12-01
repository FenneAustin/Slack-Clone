import React, {useState} from 'react'
import {createNewChannel} from "../../../store/channels"
import {useDispatch, useSelector} from "react-redux"

const AddChannelForm = ({closeModal}) => {
    const dispatch = useDispatch();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const curWorkspace = useSelector(state => state.ui.workspaceId);

    const handleCreateChannel = (e) => {
        e.preventDefault();
        const channel = {
            'name': name,
            // description
            'workspace_Id': curWorkspace
        }
        dispatch(createNewChannel(channel))
        closeModal()
    }

    return (
        <div>
             <div>Create a channel</div>
             <div>Channels are where your team communicates. They’re best when organized around a topic — #marketing, for example.</div>
             <div>Name</div>
                <input placeholder="Ex: marketing" onChange={e => setName(e.target.value)}></input>
            <div>Description</div>
                <input placeholder="Ex: This channel is for marketing team members" onChange={e => setDescription(e.target.value)}></input>
            <button onClick={(e) => handleCreateChannel(e)}>Create</button>
        </div>
    )
}


export default AddChannelForm
