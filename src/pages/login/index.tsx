import React from "react";
import useTranslation from '@/hooks/useTranslations';

const LoginPage = () => {

    const { t } = useTranslation()

    return (
        <>
            <div className="loginBox loginRow">
                <div className="container" style={{ maxWidth: "800px" }}>
                    <div className="row no-gutters m-md-5 m-sm-1 shadow-lg">
                        <div className="col-md-6 p-0 d-none d-md-block">
                            <img src="https://images.unsplash.com/photo-1566888596782-c7f41cc184c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=2134&q=80"
                                className="img-fluid"
                                style={{ minHeight: "100%;", maxHeight: "600px" }} />
                        </div>
                        <div className="col-md-6 bg-white p-5">
                            <h2 className="pb-3">Login</h2>
                            <div className="form-style">
                                <div className="form-group pb-3">
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        className="form-control"
                                        id="inputEmail" aria-describedby="emailHelp"
                                    />
                                </div>
                                <div className="form-group pb-3">
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        className="form-control"
                                        id="inputPassword"
                                    />
                                </div>
                                <div className="d-flex align-items-center justify-content-between">
                                    <div className="d-flex align-items-center">
                                        <input name="" type="checkbox" value="" />
                                        <span className="ps-2 font-weight-bold">Remember Me</span>
                                    </div>
                                    <div><a className="text-primary" href="#">Forget Password?</a></div>
                                </div>
                                <div className="pb-2">
                                    <button type="submit" className="btn btn-dark w-100 font-weight-bold mt-2">Submit</button>
                                </div>
                            </div>
                            {/* <div className="sideline">OR</div>
                            <div>
                                <button type="submit" className="btn btn-primary w-100 font-weight-bold mt-2">
                                    <i className="fa fa-facebook" aria-hidden="true"></i> Login With Facebook
                                </button>
                            </div>
                            <div className="pt-4 text-center">
                                Get Members Benefit. <a href="#">Sign Up</a>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginPage;