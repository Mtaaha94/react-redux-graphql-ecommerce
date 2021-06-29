import React from "react";
import "./styles.scss";
import Logo from "./../../assets/shop-love_10308-24.jpg";

const Header = (props) => {
  return (
    <header className="Header">
      <div className="wrap">
        <div className="logo"></div>
        <img src={Logo} alt="simple logo" />
      </div>
    </header>
  );
};

export default Header;
