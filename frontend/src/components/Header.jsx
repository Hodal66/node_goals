import { FaUserNinja } from "react-icons/fa";
import { RiLoginCircleFill, RiLogoutCircleFill } from "react-icons/ri";

import { Link } from "react-router-dom";
function Header() {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">GoalSetter</Link>
      </div>
      <ul>
        <li>
          <Link to="/login">
            <RiLoginCircleFill />
            login
          </Link>
        </li>
        <li>
          <Link to="/logout">
            <RiLogoutCircleFill />
            logout
          </Link>
        </li>
        <li>
          <Link to="/register">
            <FaUserNinja />
            register
          </Link>
        </li>
      </ul>
    </header>
  );
}

export default Header;
