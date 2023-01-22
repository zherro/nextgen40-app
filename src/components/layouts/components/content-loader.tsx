import React from "react";

const ContentLoader = () => {

    return (
        <>
        <div style={{
                position: 'fixed',
                minWidth: '100vh',
                minHeight: 'calc(100vh - 40px)',
                top: '55px',
                left:0,
                right: 0,
                backgroundColor: 'rgb(0,0,0, 14.9%)',
            }}>
            <div id="content-loader" >
                <div className="inner rotate-one"></div>
                <div className="inner rotate-two"></div>
                <div className="inner rotate-three"></div>
            </div>
        </div>
        </>
    );
}

export default ContentLoader;