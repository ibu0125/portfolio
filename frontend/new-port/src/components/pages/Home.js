import React from "react";
import "./Home.css";
import AnimatedTextSide from "./AnimatedTextSide.js";
function Home({ headLine, links, onLinkClick }) {
  return (
    <div className="home" id="hello-world">
      <div className="main-contents">
        <div className="headLine">
          <AnimatedTextSide text={headLine} />
        </div>
      </div>
    </div>
  );
}

export default Home;
