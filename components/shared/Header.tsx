import React from "react";
import add from "../../assets/add.svg";
import menu from "../../assets/menu.svg";

type Props = {

}

const Header: React.FC<Props> = ({}) => {
  return (
    <div className="HeaderContainer">
      <div className="HeaderPanel">
        <div className="ButtonsContainer">
          <img className="Icon" src={menu} />
          <img className="Icon" src={add} />
        </div>
      </div>
      <div className="AvatarContainer">
        <div className="Avatar"></div>
      </div>
    </div>
  )
}

export default Header;