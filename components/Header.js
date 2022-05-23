import logo from "../public/headerimg.svg"
import Image from 'next/image'
import style from "../styles/Header.module.css"
import { Container } from "react-bootstrap"
import { useState } from "react"
import { BsFillSunFill, BsFillCloudMoonFill } from "react-icons/bs"

const Header = () => {
    const [theme, setTheme] = useState(0)
    const themes = [<BsFillSunFill />,<BsFillCloudMoonFill />];
    return (
        <header className={style.header}>
            
                <nav className={style.nav}>
                    <div className={style.logo}>
                        <Image src={logo} className={style.imge} alt="header" height="0" />
                        <div><h6>Desert</h6>
                            <h6>Whales</h6>
                            <h6>Academy</h6>
                        </div>
                    </div>
                    <div className={style.search}>
                        <input type="search" name="" placeholder="Search, content, course, author" id="search" />
                    </div>
                    <div className={style.navlinks}>
                        <ul>
                            <li>Explore</li>
                            <li>Topics</li>
                            <li onClick={(theme) => setTheme((theme) => (theme + 1) % 2)}
                >{themes[theme]}</li>
                        </ul>
                    </div>
                </nav>
            
        </header>
    )
}

export default Header