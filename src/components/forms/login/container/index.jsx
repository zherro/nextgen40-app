import React, { useState } from "react";
import useTranslation from '@/hooks/useTranslations';
import { Formik } from 'formik';
import * as yup from 'yup';

const LoginContainer = ({
    fetch,
    feedbackError,
    setFeedbackError,
}) => {
    const { t } = useTranslation();
    const [submitted, setSubmited] = useState(false);

    const validationSchema = yup.object().shape({
        username: yup.string().trim().required(t.usernameIsRequeired),
        password: yup.string().trim().required(t.passwordIsRequired),
    });

    const initialValues = {
        username: '',
        password: '',
    }

    const LoginForm = ({
        handleSubmit,
        submitForm,
        values,
        handleChange,
        errors,
        setValues,
        isSubmitting,
        resetForm,
        feedbackError,
        setFeedbackError,
    }) => {
        const handleBtnSubmit = (e) => {
            e.preventDefault();
            // setValues({
            //     ...values,
            //     referenceMonth: values.reference.split('/')[0],
            //     referenceYear: values.reference.split('/')[1],
            // });
            setSubmited(true);
            submitForm();
        };

        return (
            <form onSubmit={handleSubmit} >
                <div className="form-group pb-3">
                    <input
                        type="text"
                        placeholder=""
                        className="form-control"
                        id="username"
                        name="username"
                        value={values?.username}
                        onChange={handleChange}
                    />
                    {submitted && errors.username && (
                        <div className="text-danger">{errors.username}</div>
                    )}
                </div>
                <div className="form-group pb-3">
                    <input
                        type="password"
                        placeholder=""
                        className="form-control"
                        id="password"
                        name="password"
                        value={values?.password}
                        onChange={handleChange}
                    />
                    {submitted && errors.password && (
                        <div className="text-danger">{errors.password}</div>
                    )}
                </div>
                <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                        <input name="" type="checkbox" value="" />
                        <span className="ps-2 font-weight-bold">{t.rememberMe}</span>
                    </div>
                    <div><a className="text-primary" href="#">{t.forgetPassword}</a></div>
                </div>
                <div className="pb-2">
                    <button
                        onClick={handleBtnSubmit}
                        disabled={isSubmitting}
                        className="btn btn-dark w-100 font-weight-bold mt-2"
                    >
                        {t.loginBtn}
                    </button>
                    {isSubmitting && (
                        <span>Realizando login</span>
                    )}
                </div>
            </form>
        );
    }

    const LoginFormik = ({
        fetch,
        feedbackError,
        setFeedbackError,
    }) => {

        const submit = async (values, { setSubmitting, resetForm }) => {
            console.log('iniciando')
            await fetch(values);
        };

        return (
            <Formik
                validationSchema={validationSchema}
                initialValues={initialValues}
                enableReinitialize
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    submit(values, { setSubmitting, resetForm });
                }}
            >
                {(props) => (
                    <LoginForm
                        {...props}
                        feedbackError={feedbackError}
                        setFeedbackError={setFeedbackError}
                    />
                )}
            </Formik>
        );
    }

    return (
        <>
            <div className="loginBox loginRow">
                <div className="container" style={{ maxWidth: "900px" }}>
                    <div className="row no-gutters m-md-5 m-2 shadow-lg">
                        <div className="col-md-6 p-0 d-none d-md-block">
                            <img src="https://images.unsplash.com/photo-1566888596782-c7f41cc184c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=2134&q=80"
                                className="img-fluid"
                                style={{ minHeight: "100%", maxHeight: "600px" }} />
                        </div>
                        <div className="col-md-6 bg-white p-5">
                            <h2 className="pb-3">{t.siginTitle}</h2>
                            { feedbackError && ( <span className="text-danger">{ feedbackError.message }</span>) }
                            <div className="form-style">
                                <LoginFormik
                                    fetch={fetch}
                                    feedbackError={feedbackError}
                                    setFeedbackError={setFeedbackError}
                                />
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

export default LoginContainer;