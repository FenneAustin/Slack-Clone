import "./index.css";
import {
  FaReact,
  FaJsSquare,
  FaFlask,
  FaPython,
  FaMortarPestle,
  FaGithub,
} from "react-icons/fa";
import {useHistory} from 'react-router-dom'
import { IoMdArrowBack } from "react-icons/io";

function AboutUs() {
  const history = useHistory()
  const aboutUs = [
    {
      name: "Austin Fenne",
      pic: "https://res.cloudinary.com/dymmlu1dw/image/upload/v1667513682/MediumClone/Headshot_3_hm00nd.png",
      blurb:
        "I love coding and will dive down the rabbit hole whenever I find code that interests me.",
      github: "https://github.com/FenneAustin",
      linkedIn: "https://www.linkedin.com/in/austin-fenne",
    },

  ];

  const icons = [
    { "tech-icon": <FaReact className="fa-5x" />, name: "React" },
    { "tech-icon": <FaJsSquare className="fa-5x" />, name: "Javascript" },
    { "tech-icon": <FaFlask className="fa-5x" />, name: "Flask" },
    { "tech-icon": <FaPython className="fa-5x" />, name: "Python" },
    { "tech-icon": <FaMortarPestle className="fa-5x" />, name: "SQLAlchemy" },
    { "tech-icon": <FaGithub className="fa-5x" />, name: "GIT" },
  ];

  return (
    <>
    <div>
        <IoMdArrowBack className="back-btn-about" onClick={() => history.push('/')}>Back to Home</IoMdArrowBack>
    </div>
      <div className="about-us-div">
        <div className="all-people-div">
          {aboutUs.map((person) => {
            return (
              <div className="about-person-div">
                <div
                  className="about-person-pic"
                  style={{ backgroundImage: `url('${person.pic}')` }}
                ></div>
                <div className="about-person-text">
                  <div className="person-name">{person.name}</div>
                  <div className="person-blurb">{person.blurb}</div>
                  <div className="person-links">
                    <a href={person.github} className="person-github">
                      GitHub
                    </a>
                    <a href={person.linkedIn} className="person-linkedin">
                      LinkedIn
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="technologies-side-bar">
          {icons.map((icon) => {
            return (
              <div className="one-tech-div">
                <div className="icon-div">{icon["tech-icon"]}</div>
                <div className="icon-name-div">{icon["name"]}</div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default AboutUs;
