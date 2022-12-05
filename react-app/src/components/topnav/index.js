import "./index.css"
import ProfileButton from "../navbar/profilebutton";

const TopNav = ({user}) => {

  

    return (
      <div className="topnav">
        <div className="profile-btn-topnav">
          <ProfileButton user={user} />
        </div>
      </div>
    );
    }

export default TopNav;
