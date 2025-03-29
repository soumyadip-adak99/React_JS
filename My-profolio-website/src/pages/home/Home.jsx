import Profile from "../../assets/IMG20240322155404-01.png"
import { Link } from 'react-router'
import { RiArrowRightLine } from "react-icons/ri";
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
