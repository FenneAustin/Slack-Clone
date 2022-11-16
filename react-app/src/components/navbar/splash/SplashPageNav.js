import React, {useState} from "react";
import { NavLink } from "react-router-dom";
import "./SplashPageNav.css";
import hamburger from "../../../assets/images/hamburger-icon.svg";
import slacklogo from "../../../assets/images/Slack-icon.svg";
import close from "../../../assets/images/Close-Navigation.svg"
import darkslack from "../../../assets/images/Slack-icon-dark.svg"
import LoginFormModal from "../../signinmodal/index";
import SignupFormModal from "../../signupmodal/index";
import DemoAccount from "../../auth/demoaccount";

const SplashPageNavBar = () => {

    const [isClicked, setIsClicked] = useState(false)

    const updateMenu = () => {
        setIsClicked(!isClicked)
    }

  return (
    <nav className="NavbarItems">
      <div className="slack-logo">
        <img className="slack-img" src={slacklogo} alt="" />
      </div>
      <div className="hamburger-menu" onClick={updateMenu}>
        <img
          className="hamburger-img"
          src={isClicked ? close : hamburger}
          alt=""
        />
      </div>

      <div className={isClicked ? "nav-menu active" : "nav-menu"}>
        <div className="slack-logo flyout-slack">
          <img className="slack-img" src={darkslack} alt="" />
        </div>
        <ul className="nav-link-ul">
          <li className="nav-links"><LoginFormModal /></li>
          <li className="nav-links"><SignupFormModal /></li>
          <li className="nav-links"><DemoAccount /></li>
        </ul>
      </div>
    </nav>
  );
};

export default SplashPageNavBar;
