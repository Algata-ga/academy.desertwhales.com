import logo from "../public/headerimg.svg";
import Image from "next/image";
import style from "../styles/Header.module.css";
import { useState, useEffect } from "react";
import { BsFillSunFill, BsFillCloudMoonFill } from "react-icons/bs";

const setGlobalTheme = (theme_id) => {
    if (window === undefined) return;
    const themes = ["light", "dark"];
    document.documentElement.classList.add("theme-transition");
    document.documentElement.setAttribute("data-theme", themes[theme_id]);
    window.setTimeout(
        () => document.documentElement.classList.remove("theme-transition"),
        1000
    );
    localStorage.setItem("theme_id", theme_id);
};

const Header = () => {
    const [theme, setTheme] = useState(0);

    useEffect(() => {
        console.log("fuck me");
        setGlobalTheme(theme);
    }, [theme]);

    const [sub, setSub] = useState(true);
    const [nav, setNav] = useState(true);
    const themes = [<BsFillSunFill />, <BsFillCloudMoonFill />];
    return (
        <header className={style.header}>
            <nav className={style.nav}>
                <div className={style.logo}>
                    <Image
                        src={logo}
                        className={style.imge}
                        alt="header"
                        height="0"
                    />
                    <div className={style.logoname}>
                        <h6>Desert</h6>
                        <h6>Whales</h6>
                        <h6>Academy</h6>
                    </div>
                </div>
                <div className={style.search}>
                    <input
                        type="search"
                        name=""
                        placeholder="Search, content, course, author"
                        id="search"
                    />
                </div>
                <div className={nav ? style.close : style.open}>
                    <ul>
                        <li>Explore</li>
                        <li
                            onClick={() => {
                                setSub(!sub);
                            }}
                        >
                            Topics
                        </li>
                        <ul className={sub ? style.subclose : style.subopen}>
                            <li>rewrwer</li>
                            <li>crypto</li>
                            <li>crypto</li>
                            <li>werwer</li>
                            <li>crypto</li>
                            <li>crypto</li>
                            <li>crypto</li>
                            <li>crypto</li>
                            <li>crypto</li>
                            <li>crypto</li>
                            <li>crypto</li>
                            <li>rewrwer</li>
                            <li>crypto</li>
                            <li>crypto</li>
                            <li>werwer</li>
                            <li>crypto</li>
                            <li>crypto</li>
                            <li>crypto</li>
                            <li>crypto</li>
                            <li>crypto</li>
                            <li>crypto</li>
                            <li>crypto</li>
                            <li>rewrwer</li>
                            <li>crypto</li>
                            <li>crypto</li>
                            <li>werwer</li>
                            <li>crypto</li>
                            <li>crypto</li>
                            <li>crypto</li>
                            <li>crypto</li>
                            <li>crypto</li>
                            <li>crypto</li>
                            <li>crypto</li>
                        </ul>
                        <li
                            className={style.change}
                            onClick={(theme) =>
                                setTheme((theme) => (theme + 1) % 2)
                            }
                        >
                            {themes[theme]}
                        </li>
                    </ul>
                </div>
                <div
                    className={style.hamburger}
                    onClick={() => {
                        setNav(!nav);
                    }}
                >
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
    );
};

export default Header;

