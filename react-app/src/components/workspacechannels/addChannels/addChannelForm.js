import React, {useEffect, useState} from 'react'
import {createNewChannel} from "../../../store/channels"
import {useDispatch, useSelector} from "react-redux"
import "./addChannelForm.css"

const AddChannelForm = ({closeModal}) => {
    const dispatch = useDispatch();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const curWorkspace = useSelector(state => state.ui.workspaceId);
    const [errors, setErrors ] = useState([]);
    const [hasErrors, setHasErrors] = useState(true);
    const [hasSubmitted, setHasSubmitted] = useState(false)


    const handleCreateChannel = (e) => {
        if (hasErrors == true) {
            setErrors(["Please fill out all fields"])
            return
        } else {
            setErrors([])
            setHasErrors(false)
        }
        e.preventDefault();
        const channel = {
            'name': name,
            // description
            'workspace_Id': curWorkspace
        }
        dispatch(createNewChannel(channel))
        closeModal()
    }


    useEffect(
        () => {
                if (name.replaceAll(" ", "").length > 0) {
                  setHasErrors(false);
                } else  {
                  setHasErrors(true);
                }
    }, [name])


    return (
      <div>
        <div className="title-for-create-channel">Create a channel</div>
        <div className="description-for-create-channel">
          Channels are where your team communicates. They’re best when organized
          around a topic — #marketing, for example.
        </div>
        <div className="input-label-name">Name</div>
        <input
          className="name-input-create"
          placeholder="Ex: marketing"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>
        <div className="description-label-create">Description (optional)</div>
        <input
          className="description-input-create"
          placeholder="Ex: This channel is for marketing team members"
          onChange={(e) => setDescription(e.target.value)}
        ></input>
        <div className="create-btn-container">
          <button
            className={
              hasErrors
                ? "create-channel-btn-modal-empty"
                : "create-channel-btn-modal"
            }
            onClick={(e) => handleCreateChannel(e)}
          >
            Create
          </button>
        </div>
        <div className="errors-container">
            {errors && errors.map((error, ind) => <div key={ind}>{error}</div>)}
        </div>
      </div>
    );
}


export default AddChannelForm
