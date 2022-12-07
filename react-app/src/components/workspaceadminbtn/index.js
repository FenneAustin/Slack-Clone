import "./index.css";
import React,{useEffect, useState} from "react"
import { RiArrowDropDownLine } from "react-icons/ri";
import {useSelector} from "react-redux"
import { MdKeyboardArrowRight } from "react-icons/md";
import { MediumModal} from "../../context/mediumModal";
import AddPeopleForm from "../addpeoplebtn/addPeopleForm";
import { Modal} from "../../context/Modal";
import CreateChannelForm from "../workspacechannels/addChannels/addChannelForm";


const WorkspaceAdminBtn = () => {

    const workspaces = useSelector(state => state.workspace)
    const curWorkspace = useSelector(state => state.ui.workspaceId)

    const [showMenu, setShowMenu] = useState(false);
    const [settingsIsHovered, setSettingsIsHovered] = useState(false);
    const [switchIsHovered, setSwitchIsHovered] = useState(false);
    const [addIsHovered, setAddIsHovered] = useState(false);

    // modals
    const [showAddUsers, setShowAddUsers] = useState(false);
    const [showCreateChannel, setShowCreateChannel] = useState(false);

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
                <div className="flyout-settings-workspace">hello</div>
              )}
            </div>

            <div className="seperator-line"> </div>

            <div className="switch-to-diff-workspaces">
              <div
                className="add-workspace-container-panel"
                onMouseEnter={() => onAddHover()}
                onMouseLeave={() => onAddHover()}
              >
                <button className="add-workspaces-btn-panel">
                  Add workspaces
                </button>
                <div className="arrow-right-container">
                  <MdKeyboardArrowRight className="arrow-right" />
                </div>
                {addIsHovered && <div className="flyout-admin">hello</div>}
              </div>

              <div
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
                  <div className="flyout-switch-workspace">hello</div>
                )}
              </div>
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
      </div>
    );
}

export default WorkspaceAdminBtn;
