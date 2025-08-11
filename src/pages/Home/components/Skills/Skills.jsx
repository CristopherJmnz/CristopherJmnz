import Section from "@commonComponents/Section/Section";
import { useState } from "react";
import { SKILLS } from "@common/constants/skills";
import "./Skills.css";

export const Skills = () => {
  const [activeSkill, setActiveSkill] = useState("frontend");

  const toggleSkills = (section) => {
    setActiveSkill(section);
  };
  const renderSkillsList = (skills, categoryId) => {
    return (
      <ul
        id={categoryId}
        className={`skills-list ${activeSkill === categoryId ? "active" : ""}`}
      >
        {skills.map((skill, index) => (
          <li key={index} className="animate">
            {skill.icon}
            {skill.name}
          </li>
        ))}
      </ul>
    );
  };
  return (
    <Section id="skills" className="skills">
      <h2>Skills</h2>
      <div className="skills-checkboxes">
        <label className="custom-checkbox-container">
          <input
            type="radio"
            className="custom-checkbox skill-checkbox"
            id="frontendCheckbox"
            name="skills"
            checked={activeSkill === "frontend"}
            onChange={() => toggleSkills("frontend")}
          />
          <span className="custom-checkbox-button"> Frontend </span>
        </label>

        <label className="custom-checkbox-container">
          <input
            type="radio"
            className="custom-checkbox skill-checkbox"
            id="backendCheckbox"
            name="skills"
            checked={activeSkill === "backend"}
            onChange={() => toggleSkills("backend")}
          />
          <span className="custom-checkbox-button"> Backend </span>
        </label>

        {/* <label className="custom-checkbox-container">
          <input
            type="radio"
            className="custom-checkbox skill-checkbox"
            id="powerplatformCheckbox"
            name="skills"
            checked={activeSkill === "powerplatform"}
            onChange={() => toggleSkills("powerplatform")}
          />
          <span className="custom-checkbox-button"> Power Platform </span>
        </label> */}
      </div>
      {renderSkillsList(SKILLS.frontend, "frontend")}
      {renderSkillsList(SKILLS.backend, "backend")}
    </Section>
  );
};
