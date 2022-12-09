import SplashPageNavBar from '../../components/navbar/splash/SplashPageNav'
import React, {useEffect, useState} from "react"
import {useSelector} from "react-redux"
import {useHistory} from "react-router-dom"
import "./SplashPage.css"
import { Modal } from '../../context/Modal'
import SignUpForm from '../../components/auth/SignUpForm'

const SplashPage = () => {
    const history = useHistory()
    const sessionUser = useSelector((state) => state.session.user);
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        if(sessionUser){
            history.push('/home')
        }
    },[sessionUser])

    return (
      <div className="splashpage-container">
        <SplashPageNavBar />
        <div className="page-content-splash">
          <div className="boom-no-workspace">
            <div className="left-side-no-workspace">
              <div className="left-side-content-container">
                <div className="giant-create-text">
                  Great teamwork starts with a <span>digital HQ</span>
                </div>
                <div className="subtext-boom">
                  With all your people, tools and communication in one place,
                  you can work faster and more flexibly than ever before.
                </div>
                <button className="create-workspace-btn-no-workspace" onClick={() => setShowModal(true)}>
                  TRY FOR FREE
                </button>
              </div>
            </div>
            <div className="right-side-no-workspace">
              <img
                src="https://res.cloudinary.com/dugmjvzmx/image/upload/v1670575067/homepage_image_csqbfc.jpg"
                alt="people"
              />
            </div>
          </div>
        </div>
        {showModal && (
            <Modal onClose={() => setShowModal(false)}>
                <SignUpForm />
            </Modal>
        )}
    
      </div>
    );

}


export default SplashPage;
