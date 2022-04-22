import React from 'react';
import Footer from './footer/footer';
import Header from './header/header';

import "./layout.css";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = (props) => {

    return(
        <>
        <Header />
        {props.children}
        <Footer />
        </>
    )

}

export default Layout;

