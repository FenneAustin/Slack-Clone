import SplashPageNavBar from '../../components/navbar/splash/SplashPageNav'
import React, {useEffect} from "react"
import {useSelector} from "react-redux"
import {useHistory} from "react-router-dom"

const SplashPage = () => {
    const history = useHistory()
    const sessionUser = useSelector((state) => state.session.user);

    useEffect(() => {
        if(sessionUser){
            history.push('/home')
        }
    },[sessionUser])

    return (
        <div className="splashpage-container">
            <SplashPageNavBar />
            <div className="left-heading">
                <div className="left-info">
                    <h1>Great teamwork starts with a <span>digital HQ</span></h1>
                    <h3>With all your people, tools and communication in one place, you can work faster and more flexibly than ever before.</h3>
                    <button>TRY FOR FREE</button>
                </div>
            </div>
            <div className="right-heading">

            </div>
        </div>
    )

}


export default SplashPage;
