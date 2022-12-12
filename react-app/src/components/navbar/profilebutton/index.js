import React, { useState, useEffect } from "react";
import "./index.css";
import LogoutButton from "../../auth/LogoutButton";
import { MediumModal } from "../../../context/mediumModal.js";
import EditProfilePicture from "./editprofilepicture";

function ProfileButton({ user }) {

  const [showMenu, setShowMenu] = useState(false);
  const [showModal, setShowModal] = useState(false);

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

  let profilePic;

  if (!user.profile_image.url) {
    profilePic =
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6sGddmMZFZCqb7aJFx5eV-8FGj2gJWz7abGntj8IuyYdAv7W2HEJyi5WY3xbpLLzf-Zg&usqp=CAU";
  } else {
    profilePic = user.profile_image.url;
  }

  return (
    <div className="flyout-container">
      <button className="flyout" onClick={openMenu}>
        <div
          style={{ backgroundImage: `url('${profilePic}')` }}
          alt=""
          className="user-pic"
        ></div>
      </button>
      {showMenu && (
        <div className="profile-dropdown">
          <div className="user-info-container">
            <div
              style={{ backgroundImage: `url('${profilePic}')` }}
              alt=""
              className="user-pic"
            ></div>
            <div className="users-full-name-and-email">
              <div className="users-name">
                {user.first_name} {user.last_name}{" "}
              </div>
              <div className="user-email">{user.email}</div>
            </div>
          </div>

          <div className="seperator-line"></div>

          {/* <div className="change-profile-pic" onClick={() => setShowModal(true)}>
            <div className="change-profile-pic-text">Change Profile Picture</div>
          </div>

          <div className="seperator-line"></div> */}
          <div className="logout-btn">
            <LogoutButton />
          </div>
        </div>
      )}
    {showModal && (
      <MediumModal onClose={() => setShowModal(false)}>
        <EditProfilePicture closeModal={() => setShowModal(false)} />
      </MediumModal>
    )}
    </div>
  );
}

export default ProfileButton;
