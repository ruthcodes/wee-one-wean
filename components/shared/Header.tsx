import React from "react";
import add from "../../assets/add.svg";
import menu from "../../assets/menu.svg";
import avatar from "../../assets/avatar.svg";
import { useDispatch } from "../../pages/_app";

type Props = {

}

const Header: React.FC<Props> = ({}) => {

  const dispatch = useDispatch();
  return (
    <div className="HeaderContainer">
      <div className="HeaderPanel">
        <div className="ButtonsContainer">
          <img 
            className="Icon" 
            src={menu} 
            onClick={() =>
              dispatch({ type: "app/TOGGLE_NAV"})
            }
          />
          <img className="Icon" src={add} />
        </div>
      </div>
      <div className="AvatarContainer">
        <div className="Avatar">
          <img src={avatar} className="AvatarIcon" />
        </div>
      </div>
    </div>
  )
}

export default Header;