import Footer from "./Footer.jsx";
import Header from "./Header.jsx";
import { useEffect } from "react";

const Layout = ({ children }) => {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    );
};

export default Layout;
