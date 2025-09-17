import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar'
import HeroSection from './components/Sections/HeroSection';
import SkillsSection from './components/Sections/SkillsSection';
import ProjectsSection from './components/Sections/ProjectsSection';

const App = () => {


    return (
        <ThemeProvider >
            <div className='pb-[100vh]'>
                <Navbar />
                <HeroSection />
                <SkillsSection />
                <ProjectsSection />
            </div>
        </ThemeProvider>

    )
}

export default App
