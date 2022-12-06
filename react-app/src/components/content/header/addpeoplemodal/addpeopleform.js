import "./addpeopleform.css";
import React, { useState, useEffect } from "react";
import {useSelector, useDispatch} from 'react-redux';
import { TbHash } from "react-icons/tb";
import { addChannelUserToChannel } from "../../../../store/channel";


const AddPeopleForm = () => {

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

    const keys = Object.keys(channelUsers);

    const isInChannel = (user) => {
      if(channelUsers[user.id]){
        return false;
      }
      else
        return true;
    }

    const handleAddUser = (user) => {
      dispatch(addChannelUserToChannel(curChannel, user.id));

    }





    return (
      <div>
        <div className="add-people-header">Add People</div>
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
          {Object.values(users)
            .filter((user) => {
              const name = user.user.first_name + " " + user.user.last_name;
              return name.includes(searchInput);
            })
            .filter((user) => {
              return isInChannel(user);
            })
            .map((user) => (
              <div className="list-users-containers">

                <div className="image-name">
                  <div className="profil-img-container">
                  <img
                  className="users-image"
                  src={
                  user.user.profile_image.url
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

                <button className="add-channeluser-btn" onClick={() => handleAddUser(user)}>Add</button>

              </div>
            ))}
        </div>
      </div>
    );
}


export default AddPeopleForm;
