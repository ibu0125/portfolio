import React, { useState } from "react";
import "./Header.css";
import { Link as ScrollLink } from "react-scroll";

function Header({
  title,
  menuItems,
  onLinkClick,
  setActive,
  className,
  onActiveChange,
}) {
  const [isActive, setIsActive] = useState(false);
  console.log(isActive);
  const toggleClass = () => {
    const newState = !isActive;
    console.log(newState);

    onActiveChange(true); // 状態をAppに通知

    setIsActive(!newState);
    setActive(!newState);
    console.log(isActive);
  };
  return (
    <div>
      <header className="header" style={{ position: "fixed" }}>
        <div className="logo">{title}</div>

        <nav>
          <ul className="nav-links">
            {menuItems.map((item, index) => (
              <li key={index}>
                {index !== menuItems.length - 1 ? (
                  <ScrollLink
                    to={item.title}
                    smooth={true}
                    duration={500}
                    className="nav-link"
                    onClick={(e) => onLinkClick(item.name)}
                  >
                    {item.name}
                  </ScrollLink>
                ) : (
                  <div
                    className="nav-link nav-link-last"
                    onClick={(e) => onLinkClick(item.name)}
                  >
                    {item.name}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <div
        className={className ? "active-button" : "button"}
        id="back-button"
        onClick={toggleClass}
      >
        <i></i>
        <i></i>
        <i></i>
      </div>
    </div>
  );
}

export default Header;
