import React from "react"
import "./index.css"
import { TbMessages } from "react-icons/tb";
import { CgPlayListSearch } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { showAllChannels } from "../../store/ui";

const WorkspaceMisc = ({workspace}) => {
  const dispatch = useDispatch();

  const handleShowChannels = () => {
    dispatch(showAllChannels());
  }

    return (
      <div className="misc-container">
        <div>
          <TbMessages />
          <button className="Dm-btn">Direct Messages</button>
        </div>
        <div>
          <CgPlayListSearch />
          <button className="all-channels-btn" onClick={handleShowChannels}>All Channels</button>
        </div>
      </div>
    );
}

export default WorkspaceMisc;
