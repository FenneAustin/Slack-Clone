import React, {useState, useEffect} from "react"
import { AiOutlineClose } from "react-icons/ai";
import "./index.css"
import { useSelector } from "react-redux";

const EditProfilePicture = ({closeModal}) => {

const sessionUser = useSelector(state => state.session.user)
const [imageUrl, setImageUrl] = useState(sessionUser.profile_image.url)
const [hasErrors, setHasErrors] = useState(false);
const [errors, setErrors] = useState([]);
const [hasSubmitted, setHasSubmitted] = useState(false);


function isValidUrl(str) {
    const regex =
      /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    return regex.test(str);
  }

useEffect(() => {
    setErrors("");
    setHasErrors(false);
    setHasSubmitted(false);

    if (isValidUrl(imageUrl) == false) {
      setHasErrors(true);
      setErrors(["Please enter a valid image url", ...errors]);
    }

  })

const handleImageChange = (e) => {
    setImageUrl(e.target.value)
}


return (
  <div>
    <div className="title-prof-pic-container">
      <div>Change profile picture url</div>
      <AiOutlineClose className="close-modal" onClick={closeModal} />
    </div>
    <div className="url-tag">Url:</div>
    <input className="user-pic-link"></input>
    <div className="change-profile-container">
      <button
        className={
          imageUrl.length < 1
            ? "send-invite-to-workspace-noinput"
            : "send-invite-to-workspace"
        }
        
      >
        Change profile picture
      </button>
    </div>
  </div>
);
}

export default EditProfilePicture;
