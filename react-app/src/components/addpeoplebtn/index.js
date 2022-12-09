import React,{ useEffect, useState} from 'react'
import "./index.css"
import {MediumModal} from "../../context/mediumModal";
import {AiOutlinePlus} from "react-icons/ai"
import AddPeopleForm from "./addPeopleForm"

const AddPeopleBtn = () => {

    const [showModal, setShowModal] = useState(false);


    return (
      <div className="add-new-teammate-container" onClick={()=> setShowModal}>
        <button className="add-people-button" onClick={() => setShowModal(true)}>
          <div className="add-people-btns">
            <AiOutlinePlus className="add-teammate-icon-add" />
            <div className="add-teammate-text">Add teammate</div>
          </div>
        </button>
        {showModal && (
          <MediumModal onClose={() => setShowModal(false)}>
            <AddPeopleForm closeModal={() => setShowModal(false)} />
          </MediumModal>
        )}
      </div>
    );

}


export default AddPeopleBtn
