import logo from "../public/headerimg.svg"
import Image from 'next/image'
import style from "../styles/Header.module.css"
import { Container } from "react-bootstrap"

const Header = () => {
    return (
        <header className={style.header}>
            <Container>
                <nav className={style.nav}>
                    <div className={style.logo}>
                        <Image src={logo} className={style.imge} alt="header" height="0" />
                        <div><h6>Desert</h6>
                            <h6>Whales</h6>
                            <h6>Academy</h6></div>
                    </div>
                </nav>
            </Container>
        </header>
    )
}

export default Header