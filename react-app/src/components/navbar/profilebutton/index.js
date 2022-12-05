import React, { useState, useEffect } from "react";
import "./index.css";
import LogoutButton from "../../auth/LogoutButton";

function ProfileButton({ user }) {

  const [showMenu, setShowMenu] = useState(false);

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
          <div>
            <span>
              {user.first_name} {user.last_name}
            </span>
          </div>
          <div>
            <span>{user.email}</span>
          </div>
          <div className="logout-btn">
            <LogoutButton />
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileButton;
