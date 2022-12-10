import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux';
import { createNewWorkspace } from '../../../store/workspace';
import "./CreateWorkspaceForm.css"
import { AiOutlineClose } from "react-icons/ai";
import { setWorkspace, clearChatId, clearWorkspaceChannelId, hideAllChannels } from '../../../store/ui';
import { createNewInvitation } from '../../../store/invitations';
import { createNewChannel } from '../../../store/channels';

const CreateWorkspaceForm = ({closeModal}) => {

    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [pageNum, setPageNum] = useState(1);
    const [teamName, setTeamName] = useState("");
    const [email, setEmail] = useState("");
    const [channelName, setChannelName] = useState("");
    const [errors, setErrors] = useState([]);
    const [success, setSuccess] = useState(false);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const curWorkspace = useSelector(state => state.ui.workspaceId);
    const [hasErrors, setHasErrors] = useState(false);
    const [firstPageSubmit, setFirstPageSubmit] = useState(false);
    const characterLimit = 50;
    const [isAtCharacterLimit, setIsAtCharacterLimit] = useState(false);
    const [thirdPageSubmit, setThirdPageSubmit] = useState(false);

    useEffect(() => {
        setErrors([]);
        setHasErrors(false);
        setFirstPageSubmit(false);

        if (teamName.replaceAll(".", "") !== teamName) {
          setHasErrors(true);
          setErrors(["Workspace name cannot contain periods"]);
        } else if (teamName.replaceAll(" ", "").length == 0) {
          setHasErrors(true);
          setErrors(["Workspace name cannot be empty"]);
        }
        // else if (hasSpaceBeforeFirstLetter(teamName) === true) {
        //   setHasErrors(true);
        //   setErrors(["Workspace name cannot start with a space"]);
        // }
        else if (teamName.length == characterLimit) {
          setHasErrors(true);
          setIsAtCharacterLimit(true);
        } else if (teamName.length < characterLimit) {
          setIsAtCharacterLimit(false);
        } else {
          setHasErrors(false);
          setFirstPageSubmit(false);
        }
      }, [teamName]);


  useEffect(() => {
        setErrors([]);
        setHasErrors(false);
        setThirdPageSubmit(false);

        if (channelName.replaceAll(".", "") !== channelName) {
          setHasErrors(true);
          setErrors(["Channel name cannot contain periods"]);
        } else if (channelName.replaceAll(" ", "").length == 0) {
          setHasErrors(true);
          setErrors(["Channel name cannot be empty"]);
        }
        // else if (hasSpaceBeforeFirstLetter(teamName) === true) {
        //   setHasErrors(true);
        //   setErrors(["Workspace name cannot start with a space"]);
        // }
        else if (channelName.length == 25) {
          setHasErrors(true);
          setIsAtCharacterLimit(true);
        } else if (channelName.length < 25) {
          setIsAtCharacterLimit(false);
        } else {
          setHasErrors(false);
          setThirdPageSubmit(false);
        }
  }, [channelName]);

  // function hasSpaceBeforeFirstLetter(str) {
  //     const trimmed = str.trimLeft();
  //     return /[a-zA-Z]/.test(trimmed.charAt(0));
  // }

   useEffect(() => {
          if (email.length > 0) {
            setErrors([]);
            setHasSubmitted(false);
            setSuccess(false);
          }
  }, [email]);


    const validateEmail = (email) => {
      const re = /\S+@\S+\.\S+/;
      return re.test(email);
    };

    const updateTeamName = (e) => {
        setTeamName(e.target.value);
    }

    const updateEmail = (e) => {
        setEmail(e.target.value);
    }



    const updateChannelName = (e) => {
        setChannelName(e.target.value);
    }

    const handleSubmit = async () => {
        if (channelName.length > 0 && hasErrors === false && errors.length < 1) {
            const channel = {
                'name': channelName,
                'workspace_Id': curWorkspace,
            }
            await dispatch(createNewChannel(channel));
            closeModal();
        } else {
            return
        }
    }

    const handleFirstPageButton = async () => {
        if (teamName.length > 0 && hasErrors === false && errors.length < 1) {

            const workspace = {
                name: teamName,
                ownerId: sessionUser.id,
            };
            const id = await dispatch(createNewWorkspace(workspace));
            if (id){
            await dispatch(setWorkspace(id));
            }
            await dispatch(clearChatId());
            await dispatch(clearWorkspaceChannelId());
            await dispatch(hideAllChannels());
            setPageNum(2);
        }
        else {
            setFirstPageSubmit(true);
        }

    }

    const addUserToInvite = async () => {
         if (email === sessionUser.email) {
           setErrors(["You cannot invite owner to workspace"]);
           setHasSubmitted(true);
           return;
         }
         if (validateEmail(email) === true) {
           const data = await dispatch(
             createNewInvitation(email, curWorkspace)
           );

           if (data) {
             setErrors(data);
             setHasSubmitted(true);
           } else {
             setSuccess(true);
             setEmail("");
           }
         } else {
           setErrors(["Please enter a valid email address"]);
           setHasSubmitted(true);
         }
    }


    return (
      <div>
        <div className="create-workspace-header-items">
          <div className="step-number"> Step {pageNum} of 3</div>
          <AiOutlineClose className="close-modal-btn" onClick={closeModal} />
        </div>
        {pageNum == 1 && (
          <div className="page-1">
            <div className="large-title-workspace-create">
              What's the name of your company or team?
            </div>
            <div className="smaller-text-title">
              This will be the name of your Slack workspace - choose something
              that your team will recognize
            </div>
            <div className="error-div-creating-workspace">
              {isAtCharacterLimit && (
                <div className="max-char">Max character limit reached</div>
              )}
            </div>
            <input
              placeholder="Ex: Acme Marketing or Acme Co"
              onChange={(e) => updateTeamName(e)}
              className="workspace-name-input"
              maxLength="50"
            ></input>
            <button
              className="first-page-next"
              onClick={() => handleFirstPageButton()}
            >
              Next
            </button>
            {firstPageSubmit && (
              <div className="error-handling-div">
                {hasErrors && (
                  <div className="error-handling-div">
                    {errors.map((error) => (
                      <div>{error}</div>
                    ))}
                    </div>
                )}
                </div>
            )}
          </div>
        )}
        {pageNum == 2 && (
          <div className="page-2">
            <div className="large-title-workspace-create">
              {" "}
              Who else is on the{" "}
              {teamName.length > 20
                ? teamName.slice(0, 20) + ".."
                : teamName}{" "}
              team?{" "}
            </div>
            <div className="add-team-subtext">Add teammate by email</div>
            <input
              placeholder="Ex: austindfenne@gmail.com"
              value={email}
              onChange={updateEmail}
              className="workspace-name-input"
            ></input>
            <div className="error-handling-div">
              {hasSubmitted && errors.map((error) => <div>{error}</div>)}
              {success && (
                <div className="success-invite">Successfully invited</div>
              )}
            </div>
            <div className="add-users-btn-workspace-create">
              <button
                onClick={addUserToInvite}
                className={
                  email.length > 0 ? "add-btn-create-workspace" : "grey-add-btn"
                }
              >
                Add
              </button>
            </div>
            <button className="first-page-next" onClick={() => setPageNum(3)}>
              Next
            </button>
          </div>
        )}
        {pageNum == 3 && (
          <div className="page-2">
            <div className="large-title-workspace-create">
              What's your team working on right now?
            </div>
            <div className="smaller-text-title">
              This could be anything: a project, campaign, event, or the deal
              you're trying to close.
            </div>
            <input
              placeholder="Ex: London deals, Q1 planning"
              value={channelName}
              onChange={(e) => updateChannelName(e)}
              className="workspace-name-input"
              maxLength="25"
            ></input>
            <div className="error-div-creating-workspace">
              {channelName.length == 25 && (
                <div className="max-char">Max character limit reached</div>
              )}
            </div>
            {hasErrors && (
              <div className="error-handling-div">
                {errors.map((error) => (
                  <div>{error}</div>
                ))}
              </div>
            )}
            <button
              className={
                channelName.length > 0
                  ? "final-next-btn" : "no-input-final-next"
                  
              }
              onClick={() => handleSubmit()}
            >
              Next
            </button>
          </div>
        )}
      </div>
    );
}


export default CreateWorkspaceForm;
