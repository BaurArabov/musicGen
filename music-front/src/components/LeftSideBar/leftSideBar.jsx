import React from "react";
import "./leftSideBar.css";
import foto from "../../assets/profile-foto.png";

function LeftSideBar() {
  return (
    <div className="left-sidebar">
      <div className="profile-info">
        <img src={foto} alt="profile" />
        <p>@username</p>
      </div>
      <nav className="navigation">
        <ul>
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">Liked songs</a>
          </li>
          <li>
            <a href="#">Album</a>
          </li>
          <li>
            <a href="#">Artist</a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default LeftSideBar;
