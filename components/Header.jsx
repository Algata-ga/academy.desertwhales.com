import logo from "../public/headerimg.svg"
import Image from 'next/image'
import style from "../styles/Header.module.css"
import { Container } from "react-bootstrap"
import { useState } from "react"
import { BsFillSunFill, BsFillCloudMoonFill } from "react-icons/bs"

const Header = () => {
    const [theme, setTheme] = useState(0)
    const [sub, setSub] = useState(true)
    const [nav, setNav] = useState(true)
    const themes = [<BsFillSunFill />,<BsFillCloudMoonFill />];
    return (
        <header className={style.header}>
            
                <nav className={style.nav}>
                    <div className={style.logo}>
                        <Image src={logo} className={style.imge} alt="header" height="0" />
                        <div className={style.logoname}><h6>Desert</h6>
                            <h6>Whales</h6>
                            <h6>Academy</h6>
                        </div>
                    </div>
                    <div className={style.search}>
                        <input type="search" name="" placeholder="Search, content, course, author" id="search" />
                    </div>
                    <div className={nav ? style.close : style.open}>
                        <ul>
                            <li>Explore</li>
                            <li onClick={() => {
                            setSub(!sub);
                        }}>Topics</li>
                            <ul className={sub ? style.subclose : style.subopen}>
                                <li>rewrwer</li><li>crypto</li><li>crypto</li><li>werwer</li><li>crypto</li><li>crypto</li><li>crypto</li><li>crypto</li><li>crypto</li><li>crypto</li><li>crypto</li>
                                <li>rewrwer</li><li>crypto</li><li>crypto</li><li>werwer</li><li>crypto</li><li>crypto</li><li>crypto</li><li>crypto</li><li>crypto</li><li>crypto</li><li>crypto</li>
                                <li>rewrwer</li><li>crypto</li><li>crypto</li><li>werwer</li><li>crypto</li><li>crypto</li><li>crypto</li><li>crypto</li><li>crypto</li><li>crypto</li><li>crypto</li>

                            </ul>
                            <li className={style.change} onClick={(theme) => setTheme((theme) => (theme + 1) % 2)}
                >{themes[theme]}</li>
                        </ul>
                    </div>
                    <div className={style.hamburger} onClick={() => {
                            setNav(!nav);
                        }}>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </nav>
            
        </header>
    )
}

export default Header