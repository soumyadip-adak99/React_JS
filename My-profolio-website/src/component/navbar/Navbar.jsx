import { links } from '../../Data'
import { NavLink } from 'react-router-dom';
import { RiCloseLine } from "react-icons/ri"
import { RiMenuLine } from "react-icons/ri"
import { useState } from 'react'
import './navbar.css'

const Navbar = () => {
    const [showmenu, setShowMenu] = useState(false);

    return (
        <nav className="nav">
            <div className={`${showmenu ? 'nav-menu show-menu' : 'nav-menu'}`}>
                <ul className="nav-list grid">
                    {links.map(({ name, icon, path }, index) => {
                        return (
                            <li className='nav-items' key={index}>
                                <NavLink to={path} className={({ isActive }) =>
                                    isActive ? 'nav-link active-nav' : 'nav-link'}
                                    onClick={() => setShowMenu(!showmenu)}
                                >
                                    {icon}

                                    <h3 className='nav-name'>{name}</h3>
                                </NavLink>
                            </li>
                        )
                    })}
                </ul>

                <RiCloseLine className='nav-close' onClick={() => setShowMenu(!showmenu)} />
            </div>

            <div className="nav-toggle" onClick={() => setShowMenu(!showmenu)}>
                <RiMenuLine />
            </div>
        </nav>
    )
}

export default Navbar
