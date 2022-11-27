import Image from "next/image";
import React from "react";

const NoticeWork = ({
    text = '', type = 'none'
}) => {
    return (
        <>
            <div className="row">
                <div className="col-12 d-flex justify-content-center flex-column align-items-center pt-5">
                    <p className="lead text-secondary">{text}</p>
                    <div style={{ maxWidth:400, width:'100%' }} className="pt-5">
                        <img src="../../../assets/prop_meme_x.png" className="img-fluid" />
                    </div>
                </div>
            </div>
        </>
    );
}

export default NoticeWork; 