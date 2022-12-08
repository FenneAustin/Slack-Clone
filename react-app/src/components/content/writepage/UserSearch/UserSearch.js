import React, {useState} from "react";
import "./UserSearch.css";
import { useSelector, useDispatch } from "react-redux";
import { setChatId } from "../../../../store/ui";

const UserSearch = ({ users }) => {


  const sessionUser = useSelector((state) => state.session.user);
  const chats = Object.values(useSelector((state) => state.chat));
  const dispatch = useDispatch();

  const [searchQuery, setSearchQuery] = useState(""); // The search query
  const [selectedUser, setSelectedUser] = useState(null); // The selected user
  const [filteredUsers, setFilteredUsers] = useState(users); // The list of filtered users
  const [inputFocused, setInputFocused] = useState(false); // Whether the input is focused or not



  const handleSearchChange = (event) => {

    const searchQuery = event.target.value;

    const filteredUsers = users.filter((user) => {
      const userName = `${user.user.first_name} ${user.user.last_name}`;
      const myUserName = `${sessionUser.first_name} ${sessionUser.last_name}`;
       //filter out the current user from the list of users));
      return userName.toLowerCase().includes(searchQuery.toLowerCase()) && userName !== myUserName;


    });


    setSearchQuery(searchQuery);
    setFilteredUsers(filteredUsers);
  };



  const checkIfChatExists = (selectedUser) => {
    for (let i = 0; i < chats.length; i++) {
      if (chats[i].user_one.id === selectedUser.id || chats[i].user_two.id === selectedUser.id) {
        return chats[i].id;
      }
    }
    return false;
  };


  const handleUserSelect = (user) => {
    console.log("hello")
    setSelectedUser(user);
    const chatId = checkIfChatExists(user);
    if (chatId !== false){
      dispatch(setChatId(chatId));
    }

  };

  const handleInputFocus = () => {
    setInputFocused(true);
  };

  const handleInputBlur = () => {
    setInputFocused(false);
  };

  return (
    <div>
      <div className="title-top-message">New message</div>
      <input
        type="text"
        placeholder="To: Search for users..."
        className="input-user-search"
        value={searchQuery}
        onChange={handleSearchChange}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
      />

      {inputFocused && (
        <div className="dropdown-container-user-search" >
          {filteredUsers.length === 0 && inputFocused && (
            <div className="no-users-found">
              <span>No users found</span>
            </div>
          )}
          {filteredUsers.map((user) => {

            const userName = `${user.user.first_name} ${user.user.last_name}`;
            const profileImageUrl = user.user.profile_image.url;
            const myUserName = `${sessionUser.first_name} ${sessionUser.last_name}`;

            // return null if the user is the current user
            if (userName === myUserName) return null;
            return (
              <div
                className="user-select"
                key={user.id}
                onMouseDown={() => handleUserSelect(user)}
              >
                <div className="image-container-dropdown-search">
                  <img
                    className="image-search-dropdown"
                    src={profileImageUrl}
                    alt={userName}
                  />
                </div>
                <div>{userName}</div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default UserSearch;
