import React from "react";
import "./Footer.css";
// import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";

function Footer({ title, menuItems = [], onLinkClick, onActiveChange }) {
  const handleClick = (linkName) => {
    if (linkName === "Contact") {
      onActiveChange(true); // 状態をAppに通知
      console.log(onActiveChange);
    } else {
      onActiveChange(false); // 状態をAppに通知
    }
    onLinkClick(linkName);
  };
  return (
    <footer className="footer">
      <div className="footer-rayout">
        <div className="footer-rayout1">
          <nav>
            <ul className="footer-nav-links">
              {menuItems.length > 0 ? (
                menuItems.map((item, index) => (
                  <li key={index}>
                    {index !== menuItems.length - 1 ? (
                      <ScrollLink
                        to={item.title}
                        smooth={true}
                        duration={500}
                        className="footer-nav-link"
                        onClick={(e) => {
                          onLinkClick(item.name);
                        }}
                      >
                        {item.name}
                      </ScrollLink>
                    ) : (
                      <div
                        className="footer-nav-link"
                        onClick={() => handleClick(item.name)}
                      >
                        {item.name}
                      </div>
                    )}
                  </li>
                ))
              ) : (
                <li>メニュー項目がありません</li>
              )}
            </ul>
          </nav>
        </div>
        <div className="footer-rayout2"></div>
        <div className="footer-rayout3">
          <div className="quick-links">
            <ScrollLink to="hello-world" smooth={true} duration={500}>
              トップに戻る
            </ScrollLink>{" "}
            |<ScrollLink to="/projects">プロジェクト一覧</ScrollLink>
          </div>
          <div className="footer-contact-wrapper">
            <div className="contact-info">
              <p>
                Email:{" "}
                <a href="mailto:youremail@example.com">youremail@example.com</a>
              </p>
            </div>
            <div className="social-media-links">
              <a
                href="https://github.com/username"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="/icons/github.svg" alt="GitHub" />
              </a>
              <a
                href="https://linkedin.com/in/username"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="/icons/linkedin.svg" alt="LinkedIn" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="copy-right-wrapper">
        <p className="copy-right">&copy; 2024 higano</p>
      </div>
    </footer>
  );
}

export default Footer;
