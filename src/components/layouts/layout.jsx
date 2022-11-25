import React from "react";

const Layout = ({getLayout, children}) => {
    return (
        <>
            { getLayout(children) }
        </>
    );
}

export default Layout;