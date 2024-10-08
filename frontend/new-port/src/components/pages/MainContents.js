import React from "react";
import "./MainContents.css";
import AnimatedTextSide from "./AnimatedTextSide.js";
import AnimatedDivBottom from "./AnimatedDivBottom.js";
import AnimatedDivside from "./AnimatedDivside.js";
// import Form from "./Form.js";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import { Form } from "react-router-dom";

// カードデータの配列を定義
const cardData = [
  {
    id: 1,
    title: "Image cap",
    text: "Some quick example text to build on the card title and make up the bulk of the card's content.",
    url: "http://www.w3.org/2000/svg",
  },
  {
    id: 2,
    title: "Image cap",
    text: "Some quick example text to build on the card title and make up the bulk of the card's content.",
    url: "http://www.w3.org/2000/svg",
  },
  {
    id: 3,
    title: "Image cap",
    text: "Some quick example text to build on the card title and make up the bulk of the card's content.",
    url: "http://www.w3.org/2000/svg",
  },
  {
    id: 4,
    title: "Image cap",
    text: "Some quick example text to build on the card title and make up the bulk of the card's content.",
    url: "http://www.w3.org/2000/svg",
  },
  {
    id: 5,
    title: "Image cap",
    text: "Some quick example text to build on the card title and make up the bulk of the card's content.",
    url: "http://www.w3.org/2000/svg",
  },
  {
    id: 6,
    title: "Image cap",
    text: "Some quick example text to build on the card title and make up the bulk of the card's content.",
    url: "http://www.w3.org/2000/svg",
  },
  {
    id: 7,
    title: "Image cap",
    text: "Some quick example text to build on the card title and make up the bulk of the card's content.",
    url: "http://www.w3.org/2000/svg",
  },
  {
    id: 8,
    title: "Image cap",
    text: "Some quick example text to build on the card title and make up the bulk of the card's content.",
    url: "http://www.w3.org/2000/svg",
  },
  // 必要なだけカードデータを追加
];

const skillSetData = [
  {
    id: 1,
    title: "HTML",
    icon: `${process.env.PUBLIC_URL}/imges/landing-page.png`,
    evaluation: `${process.env.PUBLIC_URL}/imges/landing-page.png`,
    text: "Some quick example text to build on the card title and make up the bulk of the card's content.",
  },
  {
    id: 2,
    title: "CSS",
    icon: `${process.env.PUBLIC_URL}/imges/landing-page.png`,
    evaluation: `${process.env.PUBLIC_URL}/imges/landing-page.png`,
    text: "Some quick example text to build on the card title and make up the bulk of the card's content.",
  },
  {
    id: 3,
    title: "JavaScript",
    icon: `${process.env.PUBLIC_URL}/imges/landing-page.png`,
    evaluation: `${process.env.PUBLIC_URL}/imges/landing-page.png`,
    text: "Some quick example text to build on the card title and make up the bulk of the card's content.",
  },
  {
    id: 4,
    title: "React",
    icon: `${process.env.PUBLIC_URL}/imges/landing-page.png`,
    evaluation: `${process.env.PUBLIC_URL}/imges/landing-page.png`,
    text: "Some quick example text to build on the card title and make up the bulk of the card's content.",
  },
  {
    id: 5,
    title: "C",
    icon: `${process.env.PUBLIC_URL}/imges/landing-page.png`,
    evaluation: `${process.env.PUBLIC_URL}/imges/landing-page.png`,
    text: "Some quick example text to build on the card title and make up the bulk of the card's content.",
  },
  {
    id: 6,
    title: "Go",
    icon: `${process.env.PUBLIC_URL}/imges/landing-page.png`,
    evaluation: `${process.env.PUBLIC_URL}/imges/landing-page.png`,
    text: "Some quick example text to build on the card title and make up the bulk of the card's content.",
  },
  // 必要なだけカードデータを追加
];
function MainContents() {
  return (
    <div className="content">
      <div className="my-profile" id="my-profile">
        <div className="head-line text">
          <AnimatedTextSide text={"My Profile"} />
        </div>
        <div className="profile-content">
          <AnimatedDivBottom>
            <div className="profile-content1">
              <div className="profile-main-content">
                <AnimatedDivBottom>
                  <img
                    className="profile-img"
                    src={`${process.env.PUBLIC_URL}/imges/landing-page.png`}
                    alt="profileImage"
                  />
                </AnimatedDivBottom>
                <AnimatedDivBottom>
                  <p className="profile-text">
                    texttexttexttexttexttext
                    <br />
                    texttexttexttexttexttext
                  </p>
                </AnimatedDivBottom>
              </div>
              <div className="profile-text-1 profile-text">
                <AnimatedDivBottom>
                  texttexttexttexttexttexttexttexttexttexttexttext
                  <br />
                </AnimatedDivBottom>

                <AnimatedDivBottom>
                  texttexttexttexttexttexttexttexttexttexttexttext
                  <br />
                </AnimatedDivBottom>

                <AnimatedDivBottom>
                  texttexttexttexttexttexttexttexttexttexttexttext
                  <br />
                </AnimatedDivBottom>

                <AnimatedDivBottom>
                  texttexttexttexttexttexttexttexttexttexttexttext
                  <br />
                </AnimatedDivBottom>

                <AnimatedDivBottom>
                  texttexttexttexttexttexttexttexttexttexttexttext
                  <br />
                </AnimatedDivBottom>

                <AnimatedDivBottom>
                  texttexttexttexttexttexttexttexttexttexttexttext
                  <br />
                </AnimatedDivBottom>

                <AnimatedDivBottom>
                  texttexttexttexttexttexttexttexttexttexttexttext
                  <br />
                </AnimatedDivBottom>

                <AnimatedDivBottom>
                  texttexttexttexttexttexttexttexttexttexttexttext
                  <br />
                </AnimatedDivBottom>
              </div>
            </div>
          </AnimatedDivBottom>

          <div className="profile-content2">
            <div className="contact">
              <AnimatedDivBottom>
                {" "}
                <p className="mail profile-text">myaddress@gmail.com</p>
              </AnimatedDivBottom>
              <AnimatedDivBottom>
                {" "}
                <p className="tell profile-text">+81-xxx-xxx-xxxx</p>
              </AnimatedDivBottom>
              <AnimatedDivBottom>
                {" "}
                <p className="contact-scription profile-text">
                  texttexttexttexttexttext
                </p>
              </AnimatedDivBottom>
            </div>
          </div>
        </div>
      </div>
      <div className="head-line text" id="my-skill-set">
        <AnimatedTextSide text={"My Skill Set"} />
      </div>
      <div className="my-skill-set">
        {skillSetData.map((skill) => (
          <AnimatedDivBottom>
            {" "}
            <div key={skill.id} className="skill-container">
              <div className="skill-expl">
                <div className="skill-icon-container">
                  <img className="skill-icon" src={skill.icon} alt="icon" />
                </div>
                <div className="skill-evaluation-container">
                  <img
                    className="skill-evaluation"
                    src={skill.evaluation}
                    alt="evaluation"
                  />
                </div>
              </div>
              <div className="skill-user">
                <div className="skill-title-container">
                  <p className="skill-title">{skill.title}</p>
                </div>

                <div className="skill-text-container">
                  <p className="skill-text">{skill.text}</p>
                </div>
              </div>
            </div>
          </AnimatedDivBottom>
        ))}
      </div>
      <div className="head-line text" id="my-works">
        <AnimatedTextSide text={"My Works"} />
      </div>
      <div className="main-contents-wrapper">
        {cardData.map((card) => (
          <AnimatedDivBottom key={card.id}>
            <div className="card">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="card-img-top"
                alt="..."
              >
                <rect width="100%" height="100%" fill="#868e96"></rect>
                <text
                  x="50%"
                  y="50%"
                  fill="#dee2e6"
                  dy=".3em"
                  textAnchor="middle"
                  dominantBaseline="middle"
                >
                  {card.title}
                </text>
              </svg>
              <div className="card-body">
                <p className="card-text">{card.text}</p>
              </div>
            </div>
          </AnimatedDivBottom>
        ))}
      </div>
      <div className="my-career" id="my-career">
        <div className="head-line text">
          <AnimatedTextSide text={"My Career"} />
        </div>
        <div className="section-interns">
          <AnimatedDivside>
            <div className="section-headline">インターンシップ経験</div>
          </AnimatedDivside>
          <AnimatedDivBottom></AnimatedDivBottom>
          <div className="career-caption">
            <p>
              texttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttext
              <br />
              texttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttext
              <br />
              texttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttext
              <br />
              texttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttext
              <br />
              texttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttext
              <br />
              texttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttext
              <br />
              texttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttext
              <br />
              texttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttext
              <br />
              texttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttext
              <br />
            </p>
          </div>
        </div>
        <div className="section-part-time-job">
          <AnimatedDivside>
            <div className="section-headline">アルバイト経験</div>
          </AnimatedDivside>
          <AnimatedDivBottom>
            <div className="career-caption">
              <p>
                texttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttext
                <br />
                texttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttext
                <br />
                texttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttext
                <br />
                texttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttext
                <br />
                texttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttext
                <br />
                texttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttext
                <br />
                texttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttext
                <br />
                texttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttext
                <br />
                texttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttext
                <br />
                texttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttext
                <br />
              </p>
            </div>
          </AnimatedDivBottom>
        </div>
      </div>
      {/* <div className="contact">
        <div className="head-line text">
          <AnimatedTextSide text={"Contact"} />
        </div>
        <div className="contact-form">
          <Form />
        </div>
      </div> */}
    </div>
  );
}

export default MainContents;
