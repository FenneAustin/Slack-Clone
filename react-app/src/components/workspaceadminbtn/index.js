import "./index.css";
import React,{useEffect, useState} from "react"
import { RiArrowDropDownLine } from "react-icons/ri";
import {useSelector} from "react-redux"
import { MdKeyboardArrowRight } from "react-icons/md";
import { MediumModal} from "../../context/mediumModal";
import AddPeopleForm from "../addpeoplebtn/addPeopleForm";
import { Modal} from "../../context/Modal";
import CreateChannelForm from "../workspacechannels/addChannels/addChannelForm";
import FindWorkspace from "../findworkspace";
import CreateWorkspaceForm from "../workspacebar/addworkspace/CreateWorkspaceForm"
import EditWorkspaceDetails from "./editworkspacedetails";
import ManageUsers from "./managemembers/index";
import DeleteWorkspaceConfirmation from "./deleteworkspaceconfirmation/index";
import LeaveWorkspaceConfirmation from "./leaveworkspaceconfirmation/index";

const WorkspaceAdminBtn = () => {

    const workspaces = useSelector(state => state.workspace)
    const curWorkspace = useSelector(state => state.ui.workspaceId)
    const sessionUser = useSelector(state => state.session.user)

    const [showMenu, setShowMenu] = useState(false);
    const [settingsIsHovered, setSettingsIsHovered] = useState(false);
    const [switchIsHovered, setSwitchIsHovered] = useState(false);
    const [addIsHovered, setAddIsHovered] = useState(false);

    // modals
    const [showAddUsers, setShowAddUsers] = useState(false);
    const [showCreateChannel, setShowCreateChannel] = useState(false);
    const [showCreateWorkspace, setShowCreateWorkspace] = useState(false);
    const [showFindWorkspace, setShowFindWorkspace] = useState(false);
    const [showEditWorkspace, setShowEditWorkspace] = useState(false);
    const [showManageUsers, setShowManageUsers] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showLeaveModal, setShowLeaveModal] = useState(false);

    const toggleSettingsMenu = () => {
        setSettingsIsHovered(!settingsIsHovered);
    };

    const toggleSwitchMenu = () => {
        setSwitchIsHovered(!switchIsHovered);
    };

    const toggleAddMenu = () => {
      setAddIsHovered(!addIsHovered);
    };


    const onSettingsHover = () => {
      toggleSettingsMenu();
    };

    const onAddHover = () => {
      toggleAddMenu();
      if (addIsHovered){
        setSwitchIsHovered(false);
      }
    };

    const onSwitchHover = () => {
      toggleSwitchMenu();
      if (switchIsHovered){
        setAddIsHovered(false);
      }
    };


      const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
      };


    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
          setShowMenu(false);
        };

        document.addEventListener("click", closeMenu);

        return () => document.removeEventListener("click", closeMenu);
      }, [showMenu]);


    return (
      <div className="admin-btn-container">
        <div className="workspace-admin-btn">
          <RiArrowDropDownLine
            className="dropdown-admin-btn"
            onClick={openMenu}
          />
        </div>
        {showMenu && (
          <div className="admin-panel-container">
            <div className="workspace-admin-panel">
              <button className="button-to-edit-name">
                <div className="workspaceinfo-btn">
                  {workspaces && (
                    <div className="workspace-admin-panel-name">
                      <div className="workspace-admin-image-container">
                        <img
                          src={workspaces[curWorkspace].workspace_image.url}
                          className="workspace-image"
                        />
                      </div>
                      <div className="workspace-text-name">
                        {workspaces[curWorkspace].name}
                      </div>
                    </div>
                  )}
                </div>
              </button>
            </div>

            <div className="seperator-line"> </div>

            <div className="button-container-invite-users">
              <button
                className="invite-users-to-workspace-btn"
                onClick={() => {
                  setShowAddUsers(true);
                }}
              >
                Invite people to {workspaces[curWorkspace].name}
              </button>
            </div>

            <div
              className="button-container-create-channel"
              onClick={() => setShowCreateChannel(true)}
            >
              <button
                className="create-channel-workspace-admin-panel"
                onClick={() => setShowCreateChannel(true)}
              >
                Create a channel
              </button>
            </div>

            <div className="seperator-line"> </div>

            <div
              className="settings-admin-flyout-container"
              onMouseEnter={() => onSettingsHover()}
              onMouseLeave={() => onSettingsHover()}
            >
              <button className="settings-admin-flyout-btn">
                Settings & administration
              </button>
              <div className="arrow-right-container">
                <MdKeyboardArrowRight className="arrow-right" />
              </div>
              {settingsIsHovered && (
                <div className="flyout-settings-workspace">
                  <div className="settings-title">Settings</div>
                  <div
                    className="Edit-workspace-details-container"
                    onClick={() => {setShowEditWorkspace(true)
                    setSettingsIsHovered(false)
                    }}
                  >
                    <div className="work-item">Edit workspace details</div>
                  </div>
                  <div className="seperator-line"> </div>
                  <div className="settings-title">Administration</div>
                  {workspaces[curWorkspace].owner_id === sessionUser.id && (
                    <div className="Edit-workspace-details-container" onClick={() => {
                      setShowManageUsers(true)
                      setSettingsIsHovered(false)
                    }}>
                      <div className="work-item">Manage members</div>
                    </div>
                  )}
                  {workspaces[curWorkspace].owner_id === sessionUser.id && (
                    <div className="Edit-workspace-details-container" onClick={() => {setShowDeleteModal(true)}}>
                      <div className="work-item">Delete workspace</div>
                    </div>
                  )}
                  <div className="Edit-workspace-details-container" onClick={() => {setShowLeaveModal(true)}}>
                    <div className="work-item">Leave workspace</div>
                  </div>
                </div>
              )}
            </div>

            <div className="seperator-line"> </div>

            <div className="switch-to-diff-workspaces">
              <div
                className="add-workspace-container-panel"
                onMouseEnter={() =>{
                  onAddHover()
                  setSettingsIsHovered(false)}
                }
                onMouseLeave={() => onAddHover()}
              >
                <button className="add-workspaces-btn-panel">
                  Add workspaces
                </button>
                <div className="arrow-right-container">
                  <MdKeyboardArrowRight className="arrow-right" />
                </div>
                {addIsHovered && (
                  <div className="flyout-admin">
                    <div className="button-container-admin">
                      <div
                        className="create-btn-admin-container"
                        onClick={() => {
                          setShowCreateWorkspace(true);
                          onAddHover();
                        }}
                      >
                        <div
                          className="create-workspace-admin"
                          onClick={() => {
                            setShowCreateWorkspace(true);
                            onAddHover();
                          }}
                        >
                          Create a new workspace
                        </div>
                      </div>
                      <div
                        className="find-new-admin-container"
                        onClick={() => {
                          setShowFindWorkspace(true);
                          onAddHover();
                        }}
                      >
                        <div
                          className="find-a-new-workspace-btn"
                          onClick={() => {
                            setShowFindWorkspace(true);
                            onAddHover();
                          }}
                        >
                          Find a new workspace
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* <div
                className="switch-workspaces-container-panel"
                onMouseEnter={() => onSwitchHover()}
                onMouseLeave={() => onSwitchHover()}
              >
                <button className="switch-workspaces-btn-panel">
                  Switch workspaces
                </button>
                <div className="arrow-right-container">
                  <MdKeyboardArrowRight className="arrow-right" />
                </div>
                {switchIsHovered && (
                  <div className="flyout-switch-workspace">
                    <div className="workspace-container">
                      {workspaces &&
                        <div>
                            <div>Your other workspaces</div>



                        </div>
                      }
                    </div>


                  </div>
                )}
              </div> */}
            </div>
          </div>
        )}
        {showAddUsers && (
          <MediumModal onClose={() => setShowAddUsers(false)}>
            <AddPeopleForm closeModal={() => setShowAddUsers(false)} />
          </MediumModal>
        )}
        {showCreateChannel && (
          <Modal onClose={() => setShowCreateChannel(false)}>
            <CreateChannelForm closeModal={() => setShowCreateChannel(false)} />
          </Modal>
        )}
        {showCreateWorkspace && (
          <Modal onClose={() => setShowCreateWorkspace(false)}>
            <CreateWorkspaceForm
              closeModal={() => setShowCreateWorkspace(false)}
            />
          </Modal>
        )}
        {showFindWorkspace && (
          <MediumModal onClose={() => setShowFindWorkspace(false)}>
            <FindWorkspace closeModal={() => setShowFindWorkspace(false)} />
          </MediumModal>
        )}
        {showEditWorkspace && (
          <Modal onClose={() => setShowEditWorkspace(false)}>
            <EditWorkspaceDetails
              closeModal={() => setShowEditWorkspace(false)}
              workspace={workspaces[curWorkspace]}
            />
          </Modal>
        )}
        {showManageUsers && (
          <Modal onClose={() => setShowManageUsers(false)}>
            <ManageUsers closeModal={() => setShowManageUsers(false)} />
          </Modal>
        )}
        {showDeleteModal && (
          <Modal onClose={() => setShowDeleteModal(false)}>
            <DeleteWorkspaceConfirmation
              closeModal={() => setShowDeleteModal(false)}
              workspace={workspaces[curWorkspace]}
            />
          </Modal>
        )}
        {showLeaveModal && (
          <Modal onClose={() => setShowLeaveModal(false)}>
            <LeaveWorkspaceConfirmation
              closeModal={() => setShowLeaveModal(false)}
              workspace={workspaces[curWorkspace]}
            />
          </Modal>
        )}

      </div>
    );
}

export default WorkspaceAdminBtn;
