import React, {useState} from "react"
import "./index.css"
import { FcCheckmark } from "react-icons/fc";
import { BsDot } from "react-icons/bs";
import { TbHash } from "react-icons/tb";

const ChannelCard = ({channel, isInChannel, handleLeave, handleJoin}) => {


    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    }

    const handleMouseOut = () => {
        setIsHovered(false);
    }

    return (
      <div
        // className={isHovered ? "channel-card-hovered" : "channel-card"}
        className="channel-card"
        onMouseOver={handleMouseEnter}
        onMouseOut={handleMouseOut}
      >
        <div className="name-of-channel">
          <TbHash className="channel-list-hashtag" />
          <h4>{channel[1].name}</h4>
        </div>
        <div className="specific-info-container"></div>
        <div className="specific-info">
          <div className="channel-info-all">
            <div className="channel-info-text">
              {isInChannel(channel[1].id) ? (
                <div className="channel-info-text">
                  <FcCheckmark />
                  <p className="joined-text">Joined</p>
                  <BsDot className="dot-seperator" />
                </div>
              ) : null}

              <div>{channel[1].total_members} members</div>
              {channel[1].description ? (
                <div>
                  <BsDot className="dot-seperator" />
                  {channel[1].description.length > 88 ? (
                    <div>{channel[1].description.slice(0, 88)}</div>
                  ) : (
                    <div>{channel[1].description}</div>
                  )}
                </div>
              ) : null}
            </div>
          </div>
          {isInChannel(channel[1].id) ? (
            <div className="channel-btns-container">
              <button
                className={
                  isHovered ? "leave-channel-btn-show" : "leave-channel-btn-hidden"
                } onClick={(e) => handleLeave(channel[1].id)}
              >
                Leave
              </button>
            </div>
          ) :
          <div className="join-btns-container">
            <button className={isHovered? "join-channel-btn-show" : "join-channel-btn-hidden"} onClick={(e) => handleJoin(channel[1].id)}>
              Join
            </button>
          </div>
          }
        </div>
      </div>
    );
}


export default ChannelCard;
