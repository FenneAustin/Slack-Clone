import React, {useState} from "react";
import "./index.css"
import {useSelector, useDispatch} from "react-redux"
import {TbHash} from "react-icons/tb"
import About from "./about/index.js"
import Members from "./members/index.js"


const AboutModal = ({channelId}) => {

    const [showModal, setShowModal] = useState(false);

    const dispatch = useDispatch();
    const [curPage, setCurPage] = useState(1);

    const channelMembers = useSelector((state) => state.channelinfo.users);
    const channel = useSelector((state) => state.channel[channelId]);

    const changePages = (pageNum) => {
        setCurPage(pageNum)
    }




    return (
      <div className="about-modal-container">
        <div className="title-about-modal">
          <TbHash className="modal-hash" />
          <div className="modal-title-channel">{channel.name}</div>
        </div>
        <div className="options-feed-container">
          <div className="options-feed-btn-switches">
            <div className="all-feed-btns">
              <button
                className={curPage === 1 ? "feed-btn-selected" : "feed-btns"}
                onClick={() => changePages(1)}
              >
                About
              </button>
              <button
                className={curPage === 2 ? "feed-btn-selected" : "feed-btns"}
                onClick={() => changePages(2)}
              >
                Member
              </button>
              <button
                className={curPage === 3 ? "feed-btn-selected" : "feed-btns"}
                onClick={() => changePages(3)}
              >
                Settings
              </button>
            </div>
          </div>
          {curPage === 1 && <About channel={channel}/>}
          {curPage === 2 && <Members />}
        </div>
      </div>
    );
}

export default AboutModal;
