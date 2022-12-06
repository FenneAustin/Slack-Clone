import "./index.css"
import React, {useState, useEffect} from "react"
import { AiOutlineUserAdd } from "react-icons/ai";
import AddPeopleForm from "./addpeopleform.js";
import {Modal} from "../../../../context/Modal.js"
import {useDispatch, useSelector} from "react-redux"
import { getListOfUsers } from "../../../../store/workspaceinfo";


const AddPeopleModal = () => {

    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);

    const workspaceId = useSelector((state) => state.ui.workspaceId);

    const openModal = () => {
        setShowModal(true);
    }




    return (
      <div className="add-people-Contianer">
        <div className="add-user-btn">
          <AiOutlineUserAdd onClick={openModal} />
        </div>
        {showModal &&
          <Modal onClose={() => setShowModal(false)}>
            <AddPeopleForm closeModal={() => setShowModal(false)}/>
          </Modal>
        }
      </div>
    );
}

export default AddPeopleModal;
