import React, { useEffect, useState, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./index.css";
import WorkspaceBar from "../../components/workspacebar";
import WorkspaceTitleBar from "../../components/workspacetitlebar";
import WorkspaceChannels from "../../components/workspacechannels";
import WorkspaceDirectMsg from "../../components/workspacedirectmsg";
import Content from "../../components/content";
import { setWorkspace,clearChatId,clearWorkspaceChannelId } from "../../store/ui";
import {clearMessages} from "../../store/message"
import { hideAllChannels } from "../../store/ui";
import WorkspaceMisc from "../../components/workspacemisc/index.js";
import { getAllUserChannels } from "../../store/channels";
import TopNav from "../../components/topnav";

const Home = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const curWorkspace = useSelector((state) => state.ui.workspaceId);
  const workspace = useSelector((state) => state.workspace);

  useEffect(() => {

    if (curWorkspace == null && Object.keys(workspace).length > 0) {
      dispatch(setWorkspace(Object.values(workspace)[0].id));
    }
  }, [workspace, curWorkspace, dispatch]);

  function handleWorkspaceSwitch(id) {
    dispatch( hideAllChannels());
    dispatch(clearMessages())
    dispatch(setWorkspace(id));
    dispatch(clearChatId());
    dispatch(clearWorkspaceChannelId());
  }

  return (
    <div className="home-page">
      <TopNav
        className="topnav"
        user={sessionUser}
      />
      <WorkspaceBar
        className="workspace-bar"
        switchWorkspace={handleWorkspaceSwitch}
        user={sessionUser}
        selectedWorkspace={curWorkspace}
      />
      <WorkspaceTitleBar
        className="title-container"
        workspace={workspace[curWorkspace]}
      />
      <WorkspaceMisc
        className="misc-container"
        workspace={workspace[curWorkspace]}
      />
      <WorkspaceChannels
        className="channels-container"
        workspaceId={curWorkspace}
      />
      <WorkspaceDirectMsg
        className="messages-container"
        workspaceId={curWorkspace}
      />
      <Content className="content-container" />
    </div>
  );
};

export default Home;
