import React, { useContext } from "react";
import "./Skills.scss";
import SoftwareSkill from "../../components/softwareSkills/SoftwareSkill";
import { skillsSection } from "../../portfolio";
import { Fade } from "react-reveal";
// import DisplayLottie from "../../components/displayLottie/DisplayLottie";
import StyleContext from "../../contexts/StyleContext";

export default function Skills() {
  const { isDark } = useContext(StyleContext);
  if (!skillsSection.display) {
    return null;
  }

  return (
    <div className={isDark ? "dark-mode main" : "main"} id="skills">
      <div className="skills-main-div">
        <Fade left duration={1000}>
          <div className="skills-text-div">
            <h1 className={isDark ? "dark-mode skills-heading" : "skills-heading"}>
              {skillsSection.title}
            </h1>
            <p className={isDark ? "dark-mode subTitle skills-text-subtitle" : "subTitle skills-text-subtitle"}>
              {skillsSection.subTitle}
            </p>
            <SoftwareSkill />
            <div>
              {skillsSection.skills.map((skills, i) => {
                return (
                  <p
                    key={i}
                    className={isDark ? "dark-mode subTitle skills-text" : "subTitle skills-text"}
                  >
                    {skills}
                  </p>
                );
              })}
            </div>
          </div>
        </Fade>
        <Fade right duration={1000}>
          <div className="skills-description-div">
            <p className="skills-description">
              {skillsSection.leftDescription}
            </p>
          </div>
        </Fade>
      </div>
      <div className="video-section">
        <video controls width="400" height="300">
          <source src={skillsSection.video} type="video/mp4" />
          Votre navigateur ne prend pas en charge la lecture de vidéos.
        </video>
      </div>
    </div>
  );
}
