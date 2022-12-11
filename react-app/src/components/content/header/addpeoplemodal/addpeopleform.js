import "./addpeopleform.css";
import React, { useState, useEffect } from "react";
import {useSelector, useDispatch} from 'react-redux';
import { TbHash } from "react-icons/tb";
import { addChannelUserToChannel } from "../../../../store/channel";
import { AiOutlineClose } from "react-icons/ai";
import { getAllWorkspaceChannels } from "../../../../store/channels";
import { getChannelUsersList } from "../../../../store/channel";

const AddPeopleForm = ({closeModal}) => {

    const [searchInput, setSearchInput] = useState("");
    const dispatch = useDispatch();
    const users = useSelector((state) => state.workspaceinfo.users);
    const channelUsers = useSelector((state) => state.channelinfo.users);
    const curChannel = useSelector((state) => state.ui.channelId);
    const channel = useSelector((state) => state.channel[curChannel])
    const handleChange = (e) => {
      e.preventDefault();
      setSearchInput(e.target.value);
    };
    const curWorkspace = useSelector((state) => state.ui.workspaceId);



    const isInChannel = (curuser) => {
      if ((Object.values(channelUsers).filter(user => user.user.id == curuser.user_id)).length > 0){
        return false;
      }
      // if(channelUsers[user.user_id]){
      //   return false;
      // }
      else
        return true;
    }

    const handleAddUser = async (user) => {
      await dispatch(addChannelUserToChannel(curChannel, user.id));
      await dispatch(getChannelUsersList(curChannel));
      await dispatch(getAllWorkspaceChannels(curWorkspace));
    }







    return (
      <div>
        <div className="top-items-close-icon">
          <div className="add-people-header">Add People</div>
          <AiOutlineClose
            className="close-icon-page"
            onClick={() => closeModal()}
          />
        </div>
        <div className="add-people-subheader">
          <TbHash className="add-people-subheader-icon" />
          {channel.name}
        </div>
        <input
          type="text"
          placeholder="Search here"
          className="search-input-names"
          maxLength="10"
          onChange={handleChange}
          value={searchInput}
        />
        <div className="all-users-list-container">
          {(users)
            .filter((user) => {
              const name = user.user.first_name + " " + user.user.last_name;
              return name.includes(searchInput);
            })
            .filter((user) => {
              return isInChannel(user);
            })
            .map((user, i) => (
              <div className="list-users-containers" key={i}>
                <div className="image-name">
                  <div className="profil-img-container">
                    <img
                      className="users-image"
                      src={
                        user?.user.profile_image.url
                          ? user.user.profile_image.url
                          : "https://i.imgur.com/6Cm8KmE.png"
                      }
                      alt="profile"
                    />
                  </div>
                  <div>
                    {user.user.first_name} {user.user.last_name}
                  </div>
                </div>

                <button
                  className="add-channeluser-btn"
                  onClick={() => handleAddUser(user)}
                >
                  Add
                </button>
              </div>
            ))}
          {Object.values(users)
            .filter((user) => {
              const name = user.user.first_name + " " + user.user.last_name;
              return name.includes(searchInput);
            })
            .filter((user) => {
              return isInChannel(user);
            }).length  === 0 ? <div className="no-users-found">No users found</div> : null}
        </div>
      </div>
    );
}


export default AddPeopleForm;
