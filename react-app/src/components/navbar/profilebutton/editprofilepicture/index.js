import React, {useState, useEffect} from "react"
import { AiOutlineClose } from "react-icons/ai";
import "./index.css"
import { useSelector, useDispatch } from "react-redux";
import { updateImageFile } from "../../../../store/session";

const EditProfilePicture = ({closeModal}) => {

const dispatch = useDispatch();

const sessionUser = useSelector(state => state.session.user)
const [image, setImage] = useState('')
const [hasErrors, setHasErrors] = useState(false);
const [errors, setErrors] = useState([]);
const [hasSubmitted, setHasSubmitted] = useState(false);

const updateImage = (e) => {
  const file = e.target.files[0];
  if (file) {
    setImage(file);
  }
  setHasSubmitted(true);
};

const handleSubmit = async (e) => {
  const formData = new FormData();
  formData.append("image", image);
  await dispatch(updateImageFile(formData));
  closeModal();
};


return (
  <div>
    <div className="title-prof-pic-container">
      <div>Change profile picture url</div>
      <AiOutlineClose className="close-modal" onClick={closeModal} />
    </div>
    <label htmlFor="images" className="drop-container">
      <span className="drop-title">Drop files here</span>
      or
      <input type="file" name="file" onChange={e => updateImage(e)} required />
    </label>
    <div className="change-profile-container">



      <button
        className={
          image.length < 1
            ? "send-invite-to-workspace-noinput"
            : "send-invite-to-workspace"
        }
        onClick={(e) => handleSubmit(e)}
      >
        Submit
      </button>
    </div>
  </div>
);
}

export default EditProfilePicture;
