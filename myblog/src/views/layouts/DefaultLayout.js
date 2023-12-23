import React from "react";
import Nav from "./../../components/Nav";
import Header from "./../../components/Header";
import Footer from "./../../components/Footer";

const DefaultLayout = ({ children, title, subTitle }) => {
    return (
        <>
            <Nav />
            <Header title={title} subTitle={subTitle}/>

            <div className="container px-4 px-lg-5">
                <div className="row gx-4 gx-lg-5 justify-content-center">
                    {children}
                </div>
            </div>
            
            <Footer />
        </>
    );
}

export default DefaultLayout;