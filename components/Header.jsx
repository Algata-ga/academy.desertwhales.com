import logo from "../public/headerimg.svg";
import Image from "next/image";
import style from "../styles/Header.module.css";
import { useState, useEffect } from "react";
import { BsFillSunFill, BsFillCloudMoonFill } from "react-icons/bs";
import tag_color from "../utils/tag_color";
import Link from "next/link";
import { useRouter } from "next/router";
import { BiDownArrow, BiUpArrow } from "react-icons/bs";

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

// getInitialProps for this
const tags = [
    { name: "Altcoin" },
    { name: "Binance" },
    { name: "Bitcoin" },
    { name: "Blockchain" },
    { name: "Consensus" },
    { name: "Cryptocurrency" },
    { name: "Cryptography" },
    { name: "DeFu" },
    { name: "Economics" },
    { name: "Essentials" },
    { name: "Ethereum" },
    { name: "History" },
    { name: "Metaverse" },
    { name: "Mining" },
    { name: "NFT" },
    { name: "Privacy" },
    { name: "Security" },
    { name: "Technology" },
    { name: "Trading" },
    { name: "Staking" },
    { name: "Tutorials" },
    { name: "Desertwhales" },
];
const Header = () => {
    const [theme, setTheme] = useState(null);
    const router = useRouter();

    useEffect(() => {
        if (theme !== null) setGlobalTheme(theme);
    }, [theme]);
    useEffect(() => {
        if (typeof window === undefined) return;
        let _theme = localStorage.getItem("theme_id");
        if (_theme === "null") {
            _theme = window.matchMedia("(prefers-color-scheme: dark)").matches
                ? 1
                : 0;
        }
        setTheme(_theme);
    }, []);
    const [sub, setSub] = useState(true);
    const [nav, setNav] = useState(true);
    const themes = [
        <BsFillSunFill key={"sun"} />,
        <BsFillCloudMoonFill key={"cloud"} />,
    ];
    return (
        <header className={style.header}>
            <nav className={style.nav}>
                <Link href="/">
                    <a>
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
                    </a>
                </Link>
                <div className={style.search}>
                    <input
                        type="search"
                        name=""
                        placeholder="Search articles here"
                        id="search"
                        onKeyPress={(e) => {
                            if (e.key === "Enter") {
                                console.log(e.target.value);
                                router.push(`/search?title=${e.target.value}`);
                            }
                        }}
                    />
                </div>
                <div className={nav ? style.close : style.open}>
                    <ul>
                        <Link href="/search">
                            <a>
                                <li className="">Explore</li>
                            </a>
                        </Link>
                        <li
                            onClick={() => {
                                setSub(!sub);
                            }}
                        >
                            Topics {sub ? "▾" : "▴"}
                        </li>
                        <ul
                            className={sub ? style.subclose : style.subopen}
                            onMouseLeave={() =>
                                setTimeout(
                                    () => sub === false && setSub(true),
                                    1000
                                )
                            }
                        >
                            {tags.map((x) => (
                                <Link
                                    href={`/search?tag=${x.name}`}
                                    key={x.name}
                                >
                                    <li
                                        style={{ color: tag_color(x.name) }}
                                        onClick={() => setSub(true)}
                                    >
                                        {x.name}
                                    </li>
                                </Link>
                            ))}
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
