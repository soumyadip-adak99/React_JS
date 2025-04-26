import Info from "../../component/Info"
import CV from '../../pdf/Cv.pdf'
import { RiDownload2Line } from "react-icons/ri";
import Stats from "../../component/Stats";
import { skill } from "../../Data";
import SkillsItem from "../../component/SkillsItem";
import { resume } from "../../Data";
import ResumeItem from "../../component/ResumeItem";
import './about.css'

const About = () => {
    return (
        <div>
            <main className="section container">
                <section className="about">
                    <h2 className="section-title">
                        About <span>me</span>
                    </h2>

                    <div className="about-container grid">
                        <div className="about-info">
                            <h3 className="section-subtitle">Personal Infos</h3>

                            <ul className="info-list grid">
                                <Info />
                            </ul>

                            <a href='' download='' className="button">Download Cv
                                <span className="button-icon"><RiDownload2Line /></span>
                            </a>
                        </div>

                        <div className="stats grid">
                            <Stats />
                        </div>
                    </div>
                </section>

                <div className="separator"></div>

                <section className="skills">
                    <h3 className="section-subtitle subtitle-center">My Skills</h3>

                    <div className="skills-container grid">

                        <div className="skills-group">
                            <h3 className="skills-title">Frontend Development</h3>
                            <div className="skills-items grid">
                                {skill.map((val) => {
                                    if (val.category === 'developer') {
                                        return <SkillsItem key={val.id} {...val} />
                                    }
                                })}
                            </div>

                        </div>

                        <div className="skills-group">
                            <h3 className="skills-title">Backend Development</h3>
                            <div className="skills-items grid">
                                {skill.map((val) => {
                                    if (val.category === 'backend') {
                                        return <SkillsItem key={val.id} {...val} />
                                    }
                                })}
                            </div>

                        </div>
                    </div>
                </section>

                <div className="separator"></div>

                <section className="resume">
                    <h3 className="section-subtitle subtitle-center">Education & Experience</h3>

                    <div className="resume-container grid">
                        <div className="resume-group grid">
                            {resume.map((val) => {
                                if (val.category == 'experience') {
                                    return <ResumeItem key={val.id} {...val} />
                                }
                            })}
                        </div>

                        <div className="resume-group grid">
                            {resume.map((val) => {
                                if (val.category == 'education') {
                                    return <ResumeItem key={val.id} {...val} />
                                }
                            })}
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}

export default About
