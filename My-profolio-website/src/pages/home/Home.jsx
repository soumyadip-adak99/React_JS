import Profile from "../../assets/IMG20240322155404-01.png"
import { Link } from 'react-router'
import { RiArrowRightLine } from "react-icons/ri";
import { RiGithubFill, RiFacebookCircleFill, RiLinkedinBoxFill, RiInstagramFill } from "react-icons/ri";
import './home.css'

const Home = () => {
    return (
        <div className="home-container grid">
            <img src={Profile} alt="" className="home-img" />

            <div className="home-content">
                <h1 className="home-title">
                    <span className="my-name">I'm Soumyadip Adak</span> <br />
                    <span className="type-effect">Software Developer</span>
                </h1>

                <p className="home-description">
                    Computer Science student passionate about building web applications and exploring software engineering.
                    Currently focusing on Java backend development while
                    expanding my skills in modern frontend frameworks to create meaningful projects that solve real problems.

                </p>

                <div className="social-icons">
                    <a href="https://github.com/soumyadip-adak99" target="_blank" rel="noopener noreferrer"><RiGithubFill /></a>
                    <a href="https://www.linkedin.com/in/soumyadip-adak-a19b03281/" target="_blank" rel="noopener noreferrer"><RiLinkedinBoxFill /></a>
                    <a href="https://www.instagram.com/soumyadip_adak8888/?hl=en" target="_blank" rel="noopener noreferrer"><RiInstagramFill /></a>
                    <a href="https://www.facebook.com/soumyadip.adak.99" target="_blank" rel="noopener noreferrer"><RiFacebookCircleFill /></a>
                </div>


                <Link to="/about" className="button">More About Me
                    <span className="button-icon">
                        <RiArrowRightLine />
                    </span>
                </Link>
            </div>

            <div className="color-block"></div>
        </div>
    )
}

export default Home
