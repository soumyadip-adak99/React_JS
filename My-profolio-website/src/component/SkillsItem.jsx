import React from 'react'

const SkillsItem = ({ img, title, level }) => {
    return (
        <div className='skills-data'>
            <div className="skills-blob">
                <img src={img} alt={`${title} logo`} className='skills-img' />
            </div>
            <h3 className="skills-name">{title}</h3>
            <span className="skills-level">{level}</span>

        </div>
    )
}

export default SkillsItem