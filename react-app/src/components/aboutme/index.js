import "./index.css";
import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

const AboutMe = () => {


    const history = useHistory();

    const handleClick = () => {
        history.push("/about");
    }


    return (
        <div className="aboutme">
            <div onClick={ () => handleClick()} className="about-me-text">About Me</div>
        </div>

    )

}

export default AboutMe;
