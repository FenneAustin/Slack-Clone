import React from "react"
import "./index.css"
import { TbMessages } from "react-icons/tb";
import { CgPlayListSearch } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { showAllChannels } from "../../store/ui";
import { clearChatId, clearWorkspaceChannelId } from "../../store/ui";

const WorkspaceMisc = ({workspace}) => {
  const dispatch = useDispatch();

  const handleShowChannels = () => {
    dispatch(clearChatId());
    dispatch(clearWorkspaceChannelId());
    dispatch(showAllChannels());
  }

    return (
      <div className="misc-container">
        {/* <div className="dm-container-misc">
          <TbMessages className="misc-icon"/>
          <button className="Dm-btn">Direct Messages</button>
        </div> */}
        <div className="all-channels-container-misc">
          <CgPlayListSearch className="misc-icon"/>
          <button className="all-channels-btn" onClick={handleShowChannels}>All Channels</button>
        </div>
      </div>
    );
}

export default WorkspaceMisc;
