import "./index.css";
import React, {useState} from "react"
import LandingFindWorkspace from "../findworkspace/landingpagefind";
import {Modal} from "../../context/Modal";
import CreateWorkspaceForm from "../workspacebar/addworkspace/CreateWorkspaceForm";
import { useDispatch, useSelector } from "react-redux";
import {logout} from "../../store/session"

const NoWorkspaceLandingPage = () => {

    const dispatch = useDispatch()
    const [showModal, setShowModal] = useState(false)

    const sessionUser = useSelector(state => state.session.user)

    return (
      <div className="no-workspace-landing-page">
        <div className="top-half">
          <div className="slack-logo-container">
            <img
              className="slack-logo-no-workspace"
              src="https://res.cloudinary.com/dugmjvzmx/image/upload/v1670542918/slack_jy6w8x.svg"
              alt="slack logo"
            />
          </div>
          <div className="logout-btn-no-container">
            <div className="logout-btn-no-workspace">
              Confirmed as {sessionUser.email}{" "}
              <button className="btn-homepage-logout" onClick={() => dispatch(logout())}>Change</button>
            </div>
          </div>
          <div className="boom-no-workspace">
            <div className="left-side-no-workspace">
              <div className="left-side-content-container">
                <div className="giant-create-text">
                  Create a new Slack workspace
                </div>
                <div className="subtext-boom">
                  Slack gives your team a home - a place where they can talk and
                  work together. To create a new workspace, click the button
                  below
                </div>
                <button
                  className="create-workspace-btn-no-workspace"
                  onClick={() => setShowModal(true)}
                >
                  Create a new workspace
                </button>
              </div>
            </div>
            <div className="right-side-no-workspace">
              <img
                src="https://res.cloudinary.com/dugmjvzmx/image/upload/v1670540818/peoplepicture_t5ndxh.jpg"
                alt="people"
              />
            </div>
          </div>
        </div>
        <div className="bottom-half">
          <div className="invitations-container-no-workspace">
            <LandingFindWorkspace />
          </div>
        </div>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <CreateWorkspaceForm setShowModal={setShowModal} />
          </Modal>
        )}
      </div>
    );
}

export default NoWorkspaceLandingPage
