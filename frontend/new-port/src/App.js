import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import Canvas from "./components/pages/AnimationPoints.js";
import Home from "./components/pages/Home.js";
import Header from "./components/pages/Header.js";
import MainContents from "./components/pages/MainContents.js";
import "./assets/styles/App.css";
import Form from "./components/pages/Form.js";
import Footer from "./components/pages/Footer.js";

function App() {
  const [isActive, setIsActive] = useState(false);

  const [showContent, setShowContent] = useState(true); // コンテンツの表示管理
  const headerTitle = "OtterWave";

  const [contents, setContents] = useState({
    headLine: "Hello　World!",
    links: [
      {
        name: "View Projects",
      },
      {
        name: "Contact Me",
        link: "form",
      },
    ],
  });

  const handleLinkClick = (linkName) => {
    setShowContent(false); // コンテンツをフェードアウト
    const timeoutDuration = linkName === "Home" ? 0 : 1200;

    setTimeout(() => {
      console.log(linkName);
      if (linkName === "View Projects") {
        setContents((prevContent) => ({
          ...prevContent,
          headLine: "My Works",
          links: [],
          style: { backgroundcolor: "rgba(25,25,112,1)" },
        }));
      } else if (linkName === "Home") {
        setContents((prevContent) => ({
          ...prevContent,
          headLine: "hello world!",
          links: [
            {
              name: "View Projects",
            },
            {
              name: "Contact Me",
              link: "form",
            },
          ],
        }));
      }
      setShowContent(true); // コンテンツをフェードインさせる
    }, timeoutDuration); // トランジションの時間に合わせて設定

    setShowContent(false);

    setTimeout(() => {
      if (linkName === "Contact") {
        setIsActive(true); // 背景を暗くする
      } else {
        setIsActive(false); // 他のリンクでは背景を元に戻す
      }
      setShowContent(true);
    }, 0);
  };
  const handleFooterActiveChange = (active) => {
    // Footerの状態が変わったらAppのisActiveを更新
    setIsActive(active);
  };
  return (
    <div className="App">
      <div className={isActive ? "active-all-container" : "all-container"}>
        <Form />
      </div>

      <Header
        setActive={setIsActive}
        className={isActive ? "active-header" : null}
        title={headerTitle}
        menuItems={[
          { name: "Home", link: "/", title: "hello-world" },
          { name: "Profile", link: "/", title: "my-profile" },
          { name: "Skill", link: "/", title: "my-skill-set" },
          { name: "Works", link: "/", title: "my-works" },
          { name: "Career", link: "/", title: "my-career" },
          { name: "Contact", link: "/form", title: "form" },
        ]}
        onLinkClick={(linkName) => handleLinkClick(linkName)}
        onActiveChange={handleFooterActiveChange}
      />
      <Home
        headLine={contents.headLine}
        links={contents.links}
        onLinkClick={(linkName) => handleLinkClick(linkName)}
      />
      <CSSTransition
        in={showContent}
        timeout={1200}
        classNames="content"
        unmountOnExit
      >
        <MainContents links={contents.links} />
      </CSSTransition>
      <div className="background-wrapper">
        <CSSTransition
          // in={showBackground}
          timeout={1200}
          classNames="background"
          unmountOnExit
        >
          {/* <div
            className="background"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          /> */}
        </CSSTransition>
        <Canvas />
      </div>
      <Footer
        // title={headerTitle}
        menuItems={[
          { name: "Home", title: "hello-world", link: "/" },
          { name: "Profile", title: "my-profile", link: "/" },
          { name: "Skill", title: "my-skill-set", link: "/" },
          { name: "Works", title: "my-works", link: "/" },
          { name: "Career", title: "my-career", link: "/" },
          { name: "Contact", title: "form", link: "/form" },
        ]}
        onLinkClick={(linkName) => handleLinkClick(linkName)}
        onActiveChange={handleFooterActiveChange}
      />
    </div>
  );
}

export default App;
