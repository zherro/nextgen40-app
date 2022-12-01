import React from "react";

const FormTitle = ({ children }) => {
    return (
        <>
            <h2 className="text-secondary display-6 border-bottom mb-2">{ children }</h2>
        </>
    );
}

export default FormTitle;